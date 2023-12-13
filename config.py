#!/usr/bin/python3
"""Configurations variable for repairRevolt
"""
from datetime import timedelta
from decouple import config
from dotenv import load_dotenv
import os
load_dotenv()

"""configuration variables
"""
DEBUG = os.environ.get("DEBUG", False)
SECRET_KEY = os.getenv('SECRET_KEY')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
# where Flask JWT Extended should look for the JWT token
# when trying to extract it
JWT_TOKEN_LOCATION = ["headers"]
JWT_IDENTITY_CLAIM = "user_id"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
