#!/usr/bin/python3
""" Test link Many-To-Many Place <> Amenity
"""
import models
from models.user import User
from models.base_hub import BaseHub
from models.review import Review
from models.technician import Technician
from models import storage

all_states = storage.all()
for state_id, state in all_states.items():
    print("Find the user {} ".format(state))

print()
technician = storage.get_by_name(Technician, "Selena")
print("Find the technician {} ".format(technician))
