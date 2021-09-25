from pymongo import MongoClient


class StatusCodes():
    OK = 200
    UNAUTHORIZED = 403
    NOT_FOUND = 404
    INTERNAL_SERVER_ERROR = 500


def client_setup(uri="mongodb+srv://Hermes:ShellHacks2021@cluster0.qf7di.mongodb.net/ShellHacks2021?retryWrites=true&w=majority"):
    client = MongoClient(uri)
    return client["ShellHacks2021"]
