#!/usr/bin/python3
"""
initialize the models package
"""
from os import getenv
from config import load_dotenv

# Load environment variables from .env file
# dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
# load_dotenv(dotenv_path)

load_dotenv()

storage_t = getenv("HUB_TYPE_STORAGE")

if storage_t == "db":
    from models.engine.db_storage import DBStorage
    storage = DBStorage()
    storage.reload()
