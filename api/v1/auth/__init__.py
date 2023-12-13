#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint

auth_s = Blueprint('auth_s', __name__, url_prefix='/api/v1/users')

from api.v1.auth.auth import *
