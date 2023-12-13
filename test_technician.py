#!/usr/bin/python3
# test techncian with review
from models import *
from models.technician import  Technician

# creation of a Technician
technician = Technician(full_name="Gael", location_id=1, user_id='1' ,bio_text="I am collision repair")
technician.save()

# creation of a Technician
review = Review(technicianId=technician.id, Comment="Great services Gael")
review.save()
