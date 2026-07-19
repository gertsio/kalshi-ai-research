from collections.abc import Awaitable, Callable

from fastapi import FastAPI, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import router
from app.core.config import get_settings
from app.core.errors import ErrorCode, ErrorResponse, WorkflowError
from app.core.logging import configure_logging, new_request_id


def create_app() -> FastAPI:
    configure_logging()
    settings = get_settings()
    app = FastAPI(title=settings.app_name)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_allow_origins,
        allow_origin_regex=settings.cors_allow_origin_regex,
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def attach_request_id(request: Request, call_next: Callable[[Request], Awaitable[Response]]) -> Response:
        request.state.request_id = request.headers.get("x-request-id", new_request_id())
        response = await call_next(request)
        response.headers["x-request-id"] = request.state.request_id
        return response

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
        request_id = getattr(request.state, "request_id", new_request_id())
        error = ErrorResponse(
            code=ErrorCode.INVALID_INPUT, message="Invalid workflow request input.", request_id=request_id
        )
        return JSONResponse(status_code=422, content={**error.model_dump(mode="json"), "details": exc.errors()})

    @app.exception_handler(WorkflowError)
    async def workflow_exception_handler(request: Request, exc: WorkflowError) -> JSONResponse:
        request_id = getattr(request.state, "request_id", new_request_id())
        error = ErrorResponse(code=exc.code, message=exc.message, request_id=request_id)
        return JSONResponse(status_code=exc.status_code, content=error.model_dump(mode="json"))

    app.include_router(router)
    return app


app = create_app()
