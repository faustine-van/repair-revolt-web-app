#!/usr/bin/python
""" holds class Review"""
import models
from models.base_hub import BaseHub, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, Float


class Review(BaseHub, Base):
    """Representation of Review """
    __tablename__ = 'reviews'
    technicianId = Column(String(60),
                          ForeignKey('technicians.id'),
                          nullable=False)
    comment = Column(String(1024), nullable=True)
    rating = Column(Float(), nullable=True)

    def __init__(self, *args, **kwargs):
        """initializes Review"""
        super().__init__(*args, **kwargs)
