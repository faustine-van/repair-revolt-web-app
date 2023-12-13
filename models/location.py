#!/usr/bin/python3
""" holds class Technician"""

import models
from models.base_hub import BaseHub, Base
from os import getenv
from models.technician import Technician, technician_location
import sqlalchemy
from sqlalchemy import Column, String, LargeBinary
from sqlalchemy.orm import relationship
from hashlib import md5


class Location(BaseHub, Base):
    """Representation of a  Location" """
    __tablename__ = 'locations'
    country = Column(String(128), nullable=False)
    city = Column(String(128), nullable=False)
    district = Column(String(128), nullable=False)
    sector = Column(String(1024), nullable=False)
    cell = Column(String(128), nullable=False)
    # relationship Many-To-Many between the Location and Technician
    technicians = relationship('Technician', secondary=technician_location,
                               back_populates='locations')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
