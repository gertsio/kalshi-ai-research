from enum import StrEnum

from pydantic import BaseModel


class ErrorCode(StrEnum):
    INVALID_INPUT = "invalid_input"
    WORKFLOW_UNAVAILABLE = "workflow_unavailable"
    MALFORMED_WORKFLOW_OUTPUT = "malformed_workflow_output"
    MARKET_DATA_UNAVAILABLE = "market_data_unavailable"
    SEARCH_FAILURE = "search_failure"
    MODEL_FAILURE = "model_failure"


class ErrorResponse(BaseModel):
    code: ErrorCode
    message: str
    request_id: str


class WorkflowError(Exception):
    def __init__(self, code: ErrorCode, message: str, status_code: int = 500) -> None:
        self.code = code
        self.message = message
        self.status_code = status_code
