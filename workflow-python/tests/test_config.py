from pytest import MonkeyPatch

from app.core.config import OPENROUTER_BASE_URL, Settings


def test_settings_accept_unprefixed_local_env_aliases(monkeypatch: MonkeyPatch) -> None:
    monkeypatch.setenv("GEMINI_API_KEY", "google-key")
    monkeypatch.setenv("TAVILY_API_KEY", "tavily-key")

    settings = Settings()

    assert settings.gemini_api_key == "google-key"
    assert settings.tavily_api_key == "tavily-key"


def test_settings_infer_openrouter_for_openrouter_key(monkeypatch: MonkeyPatch) -> None:
    monkeypatch.setenv("GEMINI_API_KEY", "sk-or-test")

    settings = Settings()

    assert settings.gemini_base_url == OPENROUTER_BASE_URL
    assert settings.gemini_model == "google/gemini-2.5-flash"


def test_workflow_prefixed_settings_take_precedence(monkeypatch: MonkeyPatch) -> None:
    monkeypatch.setenv("GEMINI_API_KEY", "google-key")
    monkeypatch.setenv("WORKFLOW_GEMINI_API_KEY", "workflow-google-key")

    settings = Settings()

    assert settings.gemini_api_key == "workflow-google-key"
