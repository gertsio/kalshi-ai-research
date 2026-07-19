from functools import lru_cache

from pydantic import AliasChoices, Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

GOOGLE_GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta"
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"


class Settings(BaseSettings):
    app_name: str = Field(
        default="Kalshi Research Workflow API", validation_alias=AliasChoices("WORKFLOW_APP_NAME", "APP_NAME")
    )
    cors_allow_origins: list[str] = Field(
        default_factory=lambda: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        validation_alias=AliasChoices("WORKFLOW_CORS_ALLOW_ORIGINS", "CORS_ALLOW_ORIGINS"),
    )
    cors_allow_origin_regex: str | None = Field(
        default=None,
        validation_alias=AliasChoices("WORKFLOW_CORS_ALLOW_ORIGIN_REGEX", "CORS_ALLOW_ORIGIN_REGEX"),
    )
    tavily_api_key: str | None = Field(
        default=None, validation_alias=AliasChoices("WORKFLOW_TAVILY_API_KEY", "TAVILY_API_KEY")
    )
    gemini_api_key: str | None = Field(
        default=None, validation_alias=AliasChoices("WORKFLOW_GEMINI_API_KEY", "GEMINI_API_KEY")
    )
    gemini_model: str = Field(
        default="gemini-2.5-flash", validation_alias=AliasChoices("WORKFLOW_GEMINI_MODEL", "GEMINI_MODEL")
    )
    gemini_base_url: str = Field(
        default=GOOGLE_GEMINI_BASE_URL, validation_alias=AliasChoices("WORKFLOW_GEMINI_BASE_URL", "GEMINI_BASE_URL")
    )
    ag2_enabled: bool = Field(default=False, validation_alias=AliasChoices("WORKFLOW_AG2_ENABLED", "AG2_ENABLED"))

    model_config = SettingsConfigDict(env_file=("../.env", ".env"), extra="ignore")

    @model_validator(mode="after")
    def infer_openrouter_settings(self) -> "Settings":
        if (
            self.gemini_api_key
            and self.gemini_api_key.startswith("sk-or-")
            and self.gemini_base_url == GOOGLE_GEMINI_BASE_URL
        ):
            self.gemini_base_url = OPENROUTER_BASE_URL
            if "/" not in self.gemini_model:
                self.gemini_model = f"google/{self.gemini_model}"
        return self


@lru_cache
def get_settings() -> Settings:
    return Settings()
