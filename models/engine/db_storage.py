#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.review import Review
from models.base_hub import BaseHub, Base
from models.location import Location
from models.user import User, Role
from models.technician import Technician
from models.auth import TokenBlockList
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from config import load_dotenv

classes = {"Technician": Technician, "Location": Location, "Role": Role,
           "Review": Review, "User": User, "TokenBlockList": TokenBlockList}


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        load_dotenv()
        # Load environment variables from .env file
        # dotenv_path = os.path.join(os.path.dirname(__file__), '...', '.env')
        # load_dotenv(dotenv_path)

        HUB_MYSQL_USER = getenv('HUB_MYSQL_USER')
        HUB_MYSQL_PWD = getenv('HUB_MYSQL_PWD')
        HUB_MYSQL_HOST = getenv('HUB_MYSQL_HOST')
        HUB_MYSQL_DB = getenv('HUB_MYSQL_DB')
        HUB_ENV = getenv('HUB_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(HUB_MYSQL_USER,
                                             HUB_MYSQL_PWD,
                                             HUB_MYSQL_HOST,
                                             HUB_MYSQL_DB))
        if HUB_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return (new_dict)

    def get1(self, name):
        """
        count the number of objects in storage
        """
        reviews = self.__session.query(Review).join(Technician).filter(
                        Technician.full_name == name).all()
        for review in reviews:
            print(f"{review.comment}")

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id or value.user_id == id):
                return value

        return None

    def get_by_name(self, technician_name):
        """
        Returns the object based on the class name and its Name, or
        None if not found
        """
        new_dict = {}
        technicians = self.__session.query(Technician).filter(Technician.full_name.like(f'%{technician_name}%')).all()
        for technician in technicians:
            key = technician.__class__.__name__ + '.' + technician.id
            new_dict[key] = technician
        return (new_dict)

    def get_by_location(self, location_type, location_value):
        """
        Returns the object based on Technicain object and its Locations, or
        None if not found
        """
        new_dict = {}
        # Use dynamic filtering based on location_type
        location_filter = getattr(Location, location_type) == location_value
        technicians = self.__session.query(Technician).join(Technician.locations).filter(location_filter).all()
        for technician in technicians:
            key = technician.__class__.__name__ + '.' + technician.id
            new_dict[key] = technician
        return (new_dict)

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count
