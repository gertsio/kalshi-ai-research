from app.contracts.workflow import WorkflowRequest, WorkflowResponse
from app.core.errors import ErrorCode, WorkflowError
from app.fixtures.demo_response import build_demo_response


class WorkflowService:
    async def analyze(self, request: WorkflowRequest) -> WorkflowResponse:
        if request.demo_mode is False:
            raise WorkflowError(
                ErrorCode.WORKFLOW_UNAVAILABLE, "Live AG2 workflow is not available yet.", status_code=503
            )

        return build_demo_response()


def get_workflow_service() -> WorkflowService:
    return WorkflowService()
