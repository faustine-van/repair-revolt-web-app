#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Technicians """
from models.technician import Technician
from models.location import Location
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from flask_jwt_extended import jwt_required


@app_views.route('/search_technicians', methods=['GET'],
                 strict_slashes=False)
# @swag_from('documentation/technician/get_technician.yml', methods=['GET'])
def get_technician_by_name():
    """ Retrieves an technician """
  
    category = request.args.get('category')
    technicians = []
    if category == 'name':
        # Search by technician name
        name = request.args.get('name')
        technicians = storage.get_by_name(name).values()
    elif category == 'location':
        # Search by location parameters
        location_types = ['country', 'city', 'district' 'sector', 'cell']

        for location_type in location_types:
            location_value = request.args.get(location_type)
            if location_value:
                 technicians = storage.get_by_location(location_type, location_value).values()
    else:
        technicians = storage.all(Technician).values()

    if not technicians:
        return {"msg": "Technician not found"}, 404
        

    technicians_data = []
    for technician in technicians:
        technician_data = {
            'id': technician.id,
            'full_name': technician.full_name,
            'bio_text': technician.bio_text,
            'phone_number': technician.phone_number,
            'social_link': technician.social_link,
            'img': technician.img,
            'user_id': technician.user_id,
            'locations': [
                { 
                    'country': location.country,
                    'city': location.city,
                    'district': location.district,
                    'sector': location.sector,
                    'cell': location.cell,
                }
                for location in technician.locations
            ],
        }
        technicians_data.append(technician_data)

    return jsonify(technicians_data), 200
