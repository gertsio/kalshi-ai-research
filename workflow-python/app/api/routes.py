from typing import Annotated

from fastapi import APIRouter, Depends

from app.contracts.workflow import WorkflowRequest, WorkflowResponse
from app.orchestrator.service import WorkflowService, get_workflow_service

router = APIRouter()


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/analyze", response_model=WorkflowResponse, response_model_by_alias=True)
async def analyze(
    workflow_request: WorkflowRequest,
    service: Annotated[WorkflowService, Depends(get_workflow_service)],
) -> WorkflowResponse:
    return await service.analyze(workflow_request)
