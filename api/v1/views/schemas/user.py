#!/usr/bin/python3
""" scheme user """
from marshmallow import validate, validates_schema, ValidationError
from marshmallow.fields import String, DateTime
from exts import ma
from models.user import User
from models import storage


class UserSchema(ma.SQLAlchemyAutoSchema):
    full_name = String(
        required=True, validate=[validate.Length(min=3)],
        error_messages={
          "required": "The name is required",
          "invalid": "The name is invalid and needs to be a string",
        })
    id = String(dump_only=True)
    email = String(required=True, validate=[validate.Email()])
    password = String(required=True, validate=[validate.Length(min=8)])
    updated_at = DateTime(load_only=True)
    created_at = DateTime(load_only=True)

    @validates_schema
    def validate_email(self, data, **kwargs):
        email = data.get("email")
        users = storage.all(User).values()
        for user in users:
            if user.email == email:
                raise ValidationError(f"Email {email} already exists.")

    class Meta:
        model = User
        # exclude = [']
