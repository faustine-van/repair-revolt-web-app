#!/usr/bin/python3
""" token"""
from flask import current_app as app
from flask_jwt_extended import decode_token
from models import storage
from models.auth import TokenBlockList
from datetime import datetime
from sqlalchemy.orm.exc import NoResultFound


def add_token_to_db(encoded_token):
    """Save token in database"""
    decoded_token = decode_token(encoded_token)

    jti = decoded_token["jti"]
    token_type = decoded_token["type"]
    user_id = decoded_token[app.config["JWT_IDENTITY_CLAIM"]]
    expires = datetime.fromtimestamp(decoded_token["exp"])

    db_token = TokenBlockList(
        jti=jti,
        token_type=token_type,
        user_id=user_id,
        expires=expires
    )
    storage.new(db_token)
    storage.save()


def revoke_token(token_jti, user_id):
    """revoke token"""
    try:
        tokens = storage.all(TokenBlockList)
        token = [
                 token for token in tokens.values()
                 if token.user_id == user_id and token.jti == token_jti
                ]
        if token and not token[0].revoked_at:
            token[0].revoked_at = datetime.utcnow()
            storage.save()
            return True
        else:
            return False
    except NoResultFound:
        raise Exception(f"could not find token {token_jti}")


def is_token_revoked(jwt_payload):
    """check if is token"""
    jti = jwt_payload["jti"]
    user_id = jwt_payload[app.config["JWT_IDENTITY_CLAIM"]]
    try:
        tokens = storage.all(TokenBlockList)
        token = [
                 token for token in tokens.values()
                 if token.user_id == user_id and token.jti == jti
                ]
        return token[0].revoked_at is not None
    except NoResultFound:
        raise Exception(f"could not find token {token_jti}")
