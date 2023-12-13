#!/usr/bin/python3
""" class User"""

import models
from models.base_hub import BaseHub, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from hashlib import md5


class TokenBlockList(BaseHub, Base):
    """Representation of a TokenBlockList """
    __tablename__ = 'tokens'
    jti = Column(String(128), nullable=False, unique=True)
    token_type = Column(String(128), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'),
                     nullable=False, index=True)
    revoked_at = Column(DateTime)
    expires = Column(DateTime, nullable=False)

    user = relationship("User", backref="tokenBlockLists",
                        cascade="all, delete, delete-orphan",
                        single_parent=True)
