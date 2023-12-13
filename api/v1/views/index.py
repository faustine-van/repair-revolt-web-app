#!/usr/bin/python3
""" Index """
from models.review import Review
from models.location import Location
from models.user import User
from models.technician import Technician
from models import storage
from api.v1.views import app_views
from flask import jsonify
from flask_cors import cross_origin


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def stats():
    """ Retrieves the number of each objects by type """
    classes = [Review, Location, Technician,  User]
    names = ["reviews", "locations", "technicians", "users"]

    num_objs = {}
    for i in range(len(classes)):
        num_objs[names[i]] = storage.count(classes[i])

    return jsonify(num_objs)
