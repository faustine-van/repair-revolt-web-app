#!/usr/bin/python3
""" Flask Application """
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from flask_restx import Api, Resource
from api.v1.views import app_views
from api.v1.auth import auth_s
from models import storage
from os import getenv
from flasgger import Swagger
from exts import jwt
from marshmallow.exceptions import ValidationError

app = Flask(__name__)
app.register_blueprint(app_views)
app.register_blueprint(auth_s)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

swagger_template ={
    "swagger": "2.0",
    "info": {
      "title": "RepairRevolt Hub API",
      "description": "API Documentation for RepairRevolt Hub API",
      "contact": {
        "name": "Admin",
        "email": "faustinemuhayemariya44@gmail.com",
        "url": "http://www.axiatadigitallabs.com",
        },
      "termsOfService": "Terms of services",
      "version": "1.0",
      "host":"Wine_Quality_Prediction",
      "basePath":"http://localhost:5000",
      "license":{
        "name":"License of API",
        "url":"API license URL"
      }
              },
    "schemes": [
        "http",
        "https"
    ],
      }

swagger_config = {
    "headers": [
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Methods', "GET, POST"),
    ],
    "specs": [
        {
            "endpoint": 'repair_revolt_hub',
            "route": '/RepairRevolt_Hub.json',
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/apidocs/",
    
}
Swagger(app, template=swagger_template, config=swagger_config)

# authorization
app.config.from_object('config')
jwt.init_app(app)


@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
      ---
      responses:
       404:
       description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


@app.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    """ 400 Error
      ---
      responses:
       404:
       description: validating
    """
    return jsonify(e.message), 400


if __name__ == '__main__':
    """ Main Function """
    host = getenv('HUB_API_HOST')
    port = getenv('HUB_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    app.run(debug=True, host=host, port=port, threaded=True)
