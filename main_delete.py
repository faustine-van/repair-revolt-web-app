#!/usr/bin/python3
""" Test delete feature
"""
from models import storage
from models.technician import Technician
from models.review import Review
from models.location import Location


# All Technicians
all_technicians = storage.all(Technician)
print("All Technicians: {}".format(len(all_technicians.keys())))
for technician_key in all_technicians.keys():
   print(all_technicians[technician_key])
print("")

# Create a new Technician
new_technician = Technician()
new_technician.full_name = "Eva"
new_technician.bio_text = "Experienced technician"
new_technician.phone_number = "123-456-7890"
new_technician.social_link = "https://example.com"
# new_technician.img = NULL
new_technician.user_id = "207fc0df-d4a7-4db5-ab5c-d813cf8c1e8e"
storage.new(new_technician)
storage.save()

new_review = Review(technicianId=new_technician.id, comment="Great service!", rating=4.5)
storage.new(new_review)
storage.save()
print("New Technician: {}".format(new_technician))
print("")

# All Technicians
all_Technicians = storage.all(Technician)
print("All Technicians: {}".format(len(all_Technicians.keys())))
for technician_key in all_Technicians.keys():
    print(all_Technicians[technician_key])
print("")

# Create another Technician
another_technician = Technician()
another_technician.full_name = "Sugira Kalisa"
another_technician.bio_text = "Experienced technician && Colision repair"
another_technician.phone_number = "123-456-7894"
another_technician.social_link = "https://techf.com.com"
# another_technician.img = NULL
another_technician.user_id = "207fc0df-d4a7-4db5-ab5c-d813cf8c1e8e"
storage.new(another_technician)
storage.save()

another_review = Review(technicianId=another_technician.id,  comment="Excellent work!", rating=5.5)
storage.new(another_review)
storage.save()
print("Another Technician: {}".format(another_technician))
print("")

# All Technicians
all_Technicians = storage.all(Technician)
print("All Technicians: {}".format(len(all_Technicians.keys())))
for technician_key in all_Technicians.keys():
    print(all_Technicians[technician_key])        

print("")
# Delete the new Technician
# storage.delete(new_technician)
# storage.save()
# print("deleted a record")
# print("New Technician: {}".format(new_technician))
# All Technicians
"""all_Technicians = storage.all(Technician)
print("All Technicians: {}".format(len(all_Technicians.keys())))
for technician_key in all_Technicians.keys():
   print(all_Technicians[technician_key])"""
new_location = Location(country="Rwanda", city="Kigali", district="Jabana", sector="Mushubi", cell="Rutobwe")
storage.new(new_location)
storage.save()

another_location = Location(country="Rwanda", city="Kigali", district="Jali", sector="Mushubi", cell="Byimana")
storage.new(another_location)
storage.save()

new_technician.locations.append(new_location)
new_technician.locations.append(another_location)

another_technician.locations.append(new_location)
another_technician.locations.append(another_location)

storage.save()
