import logging
from uuid import uuid4


def configure_logging() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")


def new_request_id() -> str:
    return str(uuid4())
