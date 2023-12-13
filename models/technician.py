#!/usr/bin/python3
""" holds class Technician"""

import models
from models.base_hub import BaseHub, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String, LargeBinary, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine, Table
from hashlib import md5

technician_location = Table('technician_location', Base.metadata,
                            Column('technician_id', String(60),
                                   ForeignKey('technicians.id',
                                              onupdate="CASCADE",
                                              ondelete="CASCADE"),
                                   nullable=False, primary_key=True),
                            Column('location_id', String(60),
                                   ForeignKey('locations.id',
                                              onupdate="CASCADE",
                                              ondelete="CASCADE"),
                                   nullable=False, primary_key=True))


class Technician(BaseHub, Base):
    """Representation of a  Technician" """
    __tablename__ = 'technicians'
    full_name = Column(String(128), nullable=False)
    bio_text = Column(String(1024), nullable=False)
    phone_number = Column(String(20), nullable=False)
    social_link = Column(String(255), nullable=True)
    img = Column(LargeBinary, nullable=True)
    user_id = Column(String(128), ForeignKey('users.id'), nullable=False)

    reviews = relationship("Review", backref="technician",
                           cascade="all, delete, delete-orphan")
    # relationship Many-To-Many between the Location and Technician
    locations = relationship('Location',
                             secondary=technician_location,
                             back_populates='technicians')

    def __init__(self, *args, **kwargs):
        """initializes technician"""
        super().__init__(*args, **kwargs)
