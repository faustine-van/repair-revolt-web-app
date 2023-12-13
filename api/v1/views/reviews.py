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
# @jwt_required()
# @auth_role("tech")
# @auth_role_required("tech", "admin")
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


@app_views.route('/reviews/<review_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/review/get_review.yml', methods=['GET'])
def get_review(review_id):
    """ Retrieves an review """
    review = storage.get(Review, review_id)
    if not review:
        abort(404)
    return jsonify(review.to_dict())


@app_views.route('/reviews/<review_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/review/delete_review.yml', methods=['DELETE'])
def delete_review(review_id):
    """
    Deletes a review Object
    """
    review = storage.get(Review, review_id)
    if not review:
        abort(404)
    storage.delete(review)
    storage.save()

    return make_response(jsonify({}))


@app_views.route('/reviews', methods=['POST'], strict_slashes=False)
@swag_from('documentation/review/post_review.yml', methods=['POST'])
def post_review():
    """
    Creates a review
    """
    pass
    if not request.is_json:
        return {"msg": "Missing JSON in request"}, 400
    data = request.get_json()
    new_instance = Review(**data)
    new_instance.save()
    return make_response(jsonify(new_instance.to_dict()), 201)


@app_views.route('/reviews/<review_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/review/put_review.yml', methods=['PUT'])
def put_review(review_id):
    """
    Updates a review
    """
    review = storage.get(Review, review_id)

    if not review:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(review, key, value)
    storage.save()
    return make_response(jsonify(review.to_dict()), 200)
