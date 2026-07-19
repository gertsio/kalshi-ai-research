from collections.abc import AsyncIterator
from typing import Annotated

from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse

from app.contracts.workflow import WorkflowRequest, WorkflowResponse
from app.engine.pipeline import AnalysisEngine, get_analysis_engine

router = APIRouter()

SSE_HEADERS = {
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "X-Accel-Buffering": "no",
}


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/analyze", response_model=WorkflowResponse, response_model_by_alias=True)
async def analyze(
    workflow_request: WorkflowRequest,
    engine: Annotated[AnalysisEngine, Depends(get_analysis_engine)],
) -> WorkflowResponse:
    return await engine.analyze(workflow_request)


@router.get("/analyze/stream")
async def analyze_stream(
    engine: Annotated[AnalysisEngine, Depends(get_analysis_engine)],
    event_input: Annotated[str, Query(alias="input", min_length=1)],
    demo: bool | None = None,
) -> StreamingResponse:
    workflow_request = WorkflowRequest(market_input=event_input, demo_mode=demo)

    async def sse() -> AsyncIterator[str]:
        async for event in engine.stream(workflow_request):
            yield f"event: {event.type}\ndata: {event.model_dump_json(by_alias=True)}\n\n"

    return StreamingResponse(sse(), media_type="text/event-stream", headers=SSE_HEADERS)
