#!/usr/bin/python3
""" holds class User"""

import models
from models.base_hub import BaseHub, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from hashlib import md5
from exts import pwd_context


class User(BaseHub, Base):
    """Representation of a user """
    __tablename__ = 'users'
    full_name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)

    # many to many relationship
    roles = relationship(
              'Role', secondary="user_roles",
              back_populates='users', viewonly=False
         )

    # One-to-One relationship with Technician
    technician = relationship('Technician', uselist=False, backref="user")

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with bpkdf2_sha256"""
        if name == "password":
            value = pwd_context.hash(value)
        super().__setattr__(name, value)

    def has_role(self, role):
        return any(user_role.slug == role for user_role in self.roles)


class Role(BaseHub, Base):
    """Representation of a role """
    __tablename__ = 'roles'
    name = Column(String(36), nullable=False)
    slug = Column(String(36), nullable=False, unique=True)

    users = relationship(
             'User', secondary="user_roles",
             back_populates='roles', viewonly=False
         )


class UserRole(Base):
    """Representation of a user roles """
    __tablename__ = 'user_roles'
    user_id = Column(String(60), ForeignKey('users.id'), primary_key=True)
    role_id = Column(String(60), ForeignKey('roles.id'), primary_key=True)
