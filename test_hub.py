#!/usr/bin/python3
""" Test link Many-To-Many Place <> Amenity
"""
import models
from models.user import User
from models.base_hub import BaseHub
from models.review import Review
from models.technician import Technician


# creation of a State
state = Review(technicianId="2", rating=1.2, comment="Well done")
state.save()
print(models.storage.all())
# creation of a City
city = Technician(full_name="San Francisco", bio_text="Hello world", img="file.png")
city.save()

