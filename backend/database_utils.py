from pymongo import MongoClient

MONGO_URI = "mongodb+srv://Hermes:ShellHacks2021@cluster0.qf7di.mongodb.net/ShellHacks2021?retryWrites=true&w=majority"

class StatusCodes():
    OK = 200
    UNAUTHORIZED = 403
    NOT_FOUND = 404
    INTERNAL_SERVER_ERROR = 500


def client_setup(collection, URI=MONGO_URI):
    client = MongoClient(URI)
    return client["ShellHacks2021"][collection]
