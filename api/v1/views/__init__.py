#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.index import *
from api.v1.views.locations import *
from api.v1.views.technicians import *
from api.v1.views.users import *
from api.v1.views.reviews import *
from api.v1.views.techncian_location import *
from api.v1.views.techncian_reviews import *
from api.v1.views.techncians_search import *
