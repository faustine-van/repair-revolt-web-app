#!/usr/bin/python3
""" objects that handle all authentication of RestFul API"""
from models.user import User
from models import storage
from api.v1.auth import auth_s
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from api.v1.views.schemas.user import UserSchema
from marshmallow import ValidationError
from exts import pwd_context, jwt
from flask import current_app as app
from api.v1.auth.decorators import auth_role
from api.v1.auth.helpers import (
    add_token_to_db,
    revoke_token,
    is_token_revoked,
)
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_current_user,
    get_jwt_identity,
    get_jwt,
)


@auth_s.route('/register', methods=['POST'], strict_slashes=False)
# @swag_from('documentation/user/post_user.yml', methods=['POST'])
def post_user():
    """
    Creates a user
    """
    if not request.is_json:
        return {"msg": "Missing JSON in request"}, 400
    data = request.get_json()
    try:
        schema = UserSchema()
        user_data = schema.load(data)
    except ValidationError as e:
        # Handle validation errors and return a meaningful response
        return e.messages, 400

    new_instance = User(**data)
    new_instance.save()
    # return make_response(jsonify(new_instance.to_dict()), 201)
    return make_response(jsonify({"msg": "User created successfull"}), 201)


@auth_s.route('/login', methods=['POST'], strict_slashes=False)
# @swag_from('documentation/user/post_user.yml', methods=['POST'])
def login():
    """login"""
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    email = request.get_json().get("email")
    password = request.get_json().get("password")
    if not email or not password:
        return jsonify({"msg": "Missing password or email"}), 400
    data = storage.all(User)
    users = [user for user in data.values() if user.email == email]
    user = users[0]
    if not user:
        return jsonify({"msg": "User not found"}), 401
    if not pwd_context.verify(password, user.password):
        return jsonify({"msg": "Incorrect password"}), 401

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    # save in database the token
    add_token_to_db(access_token)
    add_token_to_db(refresh_token)

    return {"access_token": access_token, "refresh_token": refresh_token}


@auth_s.route('/refresh', methods=['POST'], strict_slashes=False)
# @swag_from('documentation/user/post_user.yml', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """refresh"""
    user_id = get_jwt_identity()  # user_id
    access_token = create_access_token(identity=user_id)
    # save access_token in database
    add_token_to_db(access_token)

    return {"access_token": access_token}, 200


@auth_s.route('/revoke_access', methods=['DELETE'], strict_slashes=False)
@jwt_required()
def revoke_access_token():
    """revoke access token"""
    jti = get_jwt()["jti"]
    user_id = get_jwt_identity()
    revoke_token(jti, user_id)
    return {"msg": "Token revoked"}, 200


@auth_s.route('/revoke_refresh', methods=['DELETE'], strict_slashes=False)
@jwt_required(refresh=True)
def revoke_refresh_token():
    """revoke refresh token"""
    jti = get_jwt()["jti"]
    user_id = get_jwt_identity()
    # acess  user
    user = get_current_user()
    revoke_token(jti, user_id)
    return {"msg": f"refresh token revoked from {user}"}, 200


@jwt.user_lookup_loader
def user_load(jwt_headers, jwt_payload):
    """load user from token"""
    user_id = jwt_payload[app.config["JWT_IDENTITY_CLAIM"]]
    return storage.get(User, user_id)


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_headers, jwt_payload):
    """check if token is revoked"""
    return is_token_revoked(jwt_payload)


@auth_s.route('/me', methods=['GET'], strict_slashes=False)
@jwt_required()
# @auth_role("tech")
def get_user_profile():
    current_user_id = get_jwt_identity()
    user = storage.get(User, current_user_id)
    if not user:
        return {"msg": "User doesn't exists"}, 404
    return jsonify(user.to_dict()), 200
