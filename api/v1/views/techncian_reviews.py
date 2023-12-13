#!/usr/bin/python3
""" handle all RestFul API actions for technicians and reviews """
from models.review import Review
from models.technician import Technician
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from api.v1.auth.decorators import auth_role, auth_role_required
from flask_jwt_extended import jwt_required


@app_views.route('/technicians/<technician_id>/reviews', methods=['GET'],
                 strict_slashes=False)
# @swag_from('documentation/review/all_reviews.yml')
def get_techncian_reviews(technician_id):
    """
    Retrieves the list of all review objects
    or a specific technician
    """
    technician = storage.get(Technician, technician_id)
    if not technician:
        abort(404)
    list_reviews = []
    for review in technician.reviews:
        list_reviews.append(review.to_dict())
    return jsonify(list_reviews)


@app_views.route('/technicians/<technician_id>/reviews', methods=['POST'],
                 strict_slashes=False)
def post_techncian_review(technician_id):
    """
    create review objects
    for a specific technician
    """
    technician = storage.get(Technician, technician_id)
    if not technician:
        abort(404)
    data = request.get_json()
    if not data:
        abort(400, description="Not a JSON")
    if 'comment' not in data:
        abort(400, description="Missing comment")
    data['technicianId'] = technician_id
    new_instance = Review(**data)
    new_instance.save()
    return jsonify(new_instance.to_dict())
