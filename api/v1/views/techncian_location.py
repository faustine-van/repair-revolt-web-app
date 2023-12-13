#!/usr/bin/python3
""" handle all RestFul API actions for technicians and locations """
from models.location import Location
from models.technician import Technician
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from api.v1.auth.decorators import auth_role, auth_role_required
from flask_jwt_extended import jwt_required


@app_views.route('/technicians/<technician_id>/locations', methods=['GET'],
                 strict_slashes=False)
# @swag_from('documentation/location/all_locations.yml')
def get_techncian_locations(technician_id):
    """
    Retrieves the list of all locations objects
    or a specific technician
    """
    technician = storage.get(Technician, technician_id)
    if not technician:
        abort(404)
    list_locations = []
    for location in technician.locations:
        list_locations.append(location.to_dict())
    return jsonify(list_locations)


@app_views.route('/locations/<location_id>/technicians', methods=['GET'],
                 strict_slashes=False)
def get_locations_tech(location_id):
    """
    create location objects
    for a specific technician
    """
    location = storage.get(Location, location_id)
    if not location:
        abort(404)
    list_technicians = []
    for technician in location.technicians:
        list_technicians.append(technician.to_dict())
    return jsonify(list_technicians)
