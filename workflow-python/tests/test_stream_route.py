import json

from fastapi.testclient import TestClient

from app.contracts.workflow import WorkflowResponse
from app.engine.pipeline import AnalysisEngine, get_analysis_engine
from app.main import create_app


def _client_with_instant_demo() -> TestClient:
    app = create_app()
    app.dependency_overrides[get_analysis_engine] = lambda: AnalysisEngine(demo_pace_seconds=0.0)
    return TestClient(app)


def _parse_sse(body: str) -> list[tuple[str, dict[str, object]]]:
    events = []
    for block in body.strip().split("\n\n"):
        lines = dict(line.split(": ", 1) for line in block.splitlines())
        events.append((lines["event"], json.loads(lines["data"])))
    return events


def test_stream_route_emits_typed_sse_events_ending_with_final() -> None:
    client = _client_with_instant_demo()

    with client.stream(
        "GET", "/analyze/stream", params={"input": "KXEXAMPLE-26MAY03-DEMO", "demo": "true"}
    ) as response:
        assert response.status_code == 200
        assert response.headers["content-type"].startswith("text/event-stream")
        body = response.read().decode()

    events = _parse_sse(body)
    event_types = [event_type for event_type, _ in events]

    assert event_types[0] == "stage_started"
    assert "market_resolved" in event_types
    assert "source_found" in event_types
    assert "estimate_updated" in event_types
    assert event_types[-1] == "final"

    final_payload = events[-1][1]
    WorkflowResponse.model_validate(final_payload["response"])


def test_stream_route_rejects_empty_input() -> None:
    client = _client_with_instant_demo()

    response = client.get("/analyze/stream", params={"input": ""})

    assert response.status_code == 422
