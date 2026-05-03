from fastapi.testclient import TestClient

from app.main import create_app


def test_analyze_returns_valid_demo_response() -> None:
    client = TestClient(create_app())

    response = client.post("/analyze", json={"marketInput": "KXEXAMPLE-26MAY03-DEMO", "demoMode": True})

    assert response.status_code == 200
    payload = response.json()
    assert payload["schemaVersion"] == "1.0"
    assert payload["market"]["ticker"] == "KXEXAMPLE-26MAY03-DEMO"
    assert payload["delta"]["probabilityPoints"] == 0.13
    assert "research-only" in payload["disclaimer"]
    assert {entry["role"] for entry in payload["agentTrace"]} == {
        "market_data",
        "settlement_rules",
        "research",
        "probability_estimator",
        "skeptic",
        "memo_editor",
    }


def test_analyze_rejects_empty_market_input() -> None:
    client = TestClient(create_app())

    response = client.post("/analyze", json={"marketInput": "   ", "demoMode": True})

    assert response.status_code == 422
    payload = response.json()
    assert payload["code"] == "invalid_input"
    assert payload["request_id"]


def test_analyze_rejects_missing_market_input() -> None:
    client = TestClient(create_app())

    response = client.post("/analyze", json={"demoMode": True})

    assert response.status_code == 422
    assert response.json()["code"] == "invalid_input"
