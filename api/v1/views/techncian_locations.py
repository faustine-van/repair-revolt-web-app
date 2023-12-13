#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from models.review import Review
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from api.v1.auth.decorators import auth_role, auth_role_required
from flask_jwt_extended import jwt_required


@app_views.route('/reviews', methods=['GET'], strict_slashes=False)
@swag_from('documentation/review/all_reviews.yml')
def get_reviews():
    """
    Retrieves the list of all review objects
    or a specific review
    """
    all_reviews = storage.all(Review).values()
    list_reviews = []
    for review in all_reviews:
        list_reviews.append(review.to_dict())
    return jsonify(list_reviews)
