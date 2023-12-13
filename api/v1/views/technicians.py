#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Technicians """
from models.technician import Technician
from models.location import Location
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from api.v1.views.schemas.technician import TechnicianSchema
from marshmallow import ValidationError
from flask_jwt_extended import jwt_required
import base64


@app_views.route('/technicians/<technician_id>', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/technician/get_technician.yml', methods=['GET'])
def get_technician(technician_id):
    """ Retrieves an technician """
    technician = storage.get(Technician, technician_id)
    if not technician:
        return {"msg": "Technician not found"}, 404
    
    technician_data = {
        'id': technician.id,
        'full_name': technician.full_name,
        'bio_text': technician.bio_text,
        'phone_number': technician.phone_number,
        'social_link': technician.social_link,
        'img': technician.img,
        'user_id': technician.user_id,
        'created_at': technician.created_at,
        'updated_at': technician.updated_at,
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
    return make_response(jsonify(technician_data), 200)


@app_views.route('/create_profile', methods=['POST'], strict_slashes=False)
# @swag_from('documentation/technician/post_technician.yml', methods=['POST'])
@jwt_required()
def post_technician():
    """
    Creates a technician
    """
    if not request.is_json:
        return {"msg": "Missing JSON in request"}, 400
    data = request.get_json()

    # Access the image file from request.files
    # img_file = request.files.get('img')

    # if img_file:
    #    img_data = img_file.read()
        # Extract location data
    location_data = {
            'country': data.get('country'),
            'city': data.get('city'),
            'district': data.get('district'),
            'sector': data.get('sector'),
            'cell': data.get('cell'),
    }
    new_locations = Location(**location_data)
   

    # Create a new Technician instance
    new_technician = Technician(
        full_name=data['full_name'],
        bio_text=data['bio_txt'],
        phone_number=data['phone_number'],
        social_link=data['social_link'],
        # img=img_data,
        user_id=data['user_id']
    )
    new_technician.locations.append(new_locations)
    storage.new(new_technician)
    storage.save()
    return make_response(jsonify({"msg": "Profile created successful"}), 201)
    # else:
    #    return {"msg": "No image file provided in the request"}, 400


@app_views.route('/technician/technicians', methods=['GET'], strict_slashes=False)
@swag_from('documentation/technician/all_technicians.yml')
def get_all_technicians():
    """
    Retrieves the list of all technician objects
    or a specific technician based on locations
    """
    all_technicians = storage.all(Technician).values()
    
    technicians_data = []
    for technician in all_technicians:
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


@app_views.route('/technicians/<technician_id>', methods=['PUT'],
                 strict_slashes=False)
@swag_from('documentation/technician/put_technician.yml', methods=['PUT'])
def put_technician(technician_id):
    """
    Updates a technician
    """
    exist_technician = storage.get(Technician, technician_id)

    if not exist_technician:
        return {"msg": "Technician not found"}, 404

    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()

    # Update the exist location data
    location_data = {
        'country': data.get('country', exist_technician.locations[0].country),
        'city': data.get('city', exist_technician.locations[0].city),
        'district': data.get('district', exist_technician.locations[0].district),
        'sector': data.get('sector', exist_technician.locations[0].sector),
        'cell': data.get('cell', exist_technician.locations[0].cell),
    }
    exist_location = exist_technician.locations[0]
    exist_location.country = location_data['country']
    exist_location.citydistrict = location_data['city']
    exist_location.district = location_data['district']
    exist_location.sector = location_data['sector']
    exist_location.cell = location_data['cell']
    
    # Update other technician attributes
    exist_technician.full_name = data.get('full_name', exist_technician.full_name)
    exist_technician.bio_text = data.get('bio_text', exist_technician.bio_text)
    exist_technician.phone_number = data.get('phone_number', exist_technician.phone_number)
    exist_technician.social_link = data.get('social_link', exist_technician.social_link)

    storage.save()
    return jsonify({"msg": "Profile updated successfully"}), 200
    

@app_views.route('/technicians/<technician_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/technician/delete_technician.yml',
           methods=['DELETE'])
def delete_technician(technician_id):
    """
    Deletes a technician Object
    """
    technician = storage.get(Technician, technician_id)
    if not technician:
        abort(404)
    storage.delete(technician)
    storage.save()

    return make_response(jsonify({}), 200)
