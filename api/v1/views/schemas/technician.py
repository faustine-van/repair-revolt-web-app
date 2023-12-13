#!/usr/bin/python3
""" scheme user """
from marshmallow import validate, validates_schema, ValidationError
from marshmallow.fields import String, DateTime, Raw, URL
from exts import ma
from models.technician import Technician
from models import storage


class TechnicianSchema(ma.SQLAlchemyAutoSchema):
    """schema for technician"""
    full_name = String(required=True)
    bio_text = String(required=True)
    phone_number = String(required=True)
    social_link = URL(allow_none=True)
    img = Raw(allow_none=True)
    user_id = String(required=True)
    id = String(dump_only=True)
    updated_at = DateTime(load_only=True)
    created_at = DateTime(load_only=True)

    class Meta:
        model = Technician
