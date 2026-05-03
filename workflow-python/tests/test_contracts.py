import copy
from typing import Any, cast

import pytest
from pydantic import ValidationError

from app.contracts.workflow import WorkflowResponse
from app.fixtures.demo_response import DEMO_WORKFLOW_RESPONSE


def test_demo_fixture_validates_against_response_contract() -> None:
    response = WorkflowResponse.model_validate(DEMO_WORKFLOW_RESPONSE)

    assert response.schema_version == "1.0"


def test_response_contract_rejects_probability_out_of_bounds() -> None:
    payload = copy.deepcopy(DEMO_WORKFLOW_RESPONSE)
    payload["agentEstimate"]["probability"] = 1.2  # type: ignore[index]

    with pytest.raises(ValidationError):
        WorkflowResponse.model_validate(payload)


def test_response_contract_rejects_missing_agent_trace_role() -> None:
    payload = copy.deepcopy(DEMO_WORKFLOW_RESPONSE)
    agent_trace = cast(list[dict[str, Any]], payload["agentTrace"])
    payload["agentTrace"] = [entry for entry in agent_trace if entry["role"] != "skeptic"]

    with pytest.raises(ValidationError, match="skeptic"):
        WorkflowResponse.model_validate(payload)


def test_response_contract_rejects_inconsistent_delta() -> None:
    payload = copy.deepcopy(DEMO_WORKFLOW_RESPONSE)
    payload["delta"]["probabilityPoints"] = 0.01  # type: ignore[index]

    with pytest.raises(ValidationError, match="Delta must equal"):
        WorkflowResponse.model_validate(payload)


def test_response_contract_allows_in_line_direction_for_tiny_delta() -> None:
    payload = copy.deepcopy(DEMO_WORKFLOW_RESPONSE)
    payload["agentEstimate"]["probability"] = 0.4200005  # type: ignore[index]
    payload["delta"]["probabilityPoints"] = 0  # type: ignore[index]
    payload["delta"]["direction"] = "in_line"  # type: ignore[index]

    response = WorkflowResponse.model_validate(payload)

    assert response.delta.direction == "in_line"


def test_response_contract_requires_research_disclaimer() -> None:
    payload = copy.deepcopy(DEMO_WORKFLOW_RESPONSE)
    payload["disclaimer"] = "Informational output."

    with pytest.raises(ValidationError, match="Disclaimer"):
        WorkflowResponse.model_validate(payload)


def test_response_contract_rejects_trading_advice_disclaimer() -> None:
    payload = copy.deepcopy(DEMO_WORKFLOW_RESPONSE)
    payload["disclaimer"] = "This research is trading advice and a recommendation to place a trade."

    with pytest.raises(ValidationError, match="Disclaimer"):
        WorkflowResponse.model_validate(payload)
