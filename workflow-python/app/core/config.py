from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Kalshi Research Workflow API"
    cors_allow_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000", "http://127.0.0.1:3000"])

    model_config = SettingsConfigDict(env_prefix="WORKFLOW_", env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
