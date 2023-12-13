#!/usr/bin/python3
""" Test .get() and .count() methods
"""
from models import storage
from models.user import User

print("All objects: {}".format(storage.count()))
print("User objects: {}".format(storage.count(User)))

first_user_id = list(storage.all(User).values())[0].id
print("First user: {}".format(storage.get(User, first_user_id)))

new_user = User()
new_user.full_name = "Sugira Kalisa"
new_user.email = "sugira@kalisa.com"
new_user.password = "123456789"
new_user.role = "Technician"
storage.new(new_user)
storage.save()

print("New User: {}".format(new_user))

