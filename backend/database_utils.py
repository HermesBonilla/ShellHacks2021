from pymongo import MongoClient
import datetime


class StatusCodes():
    OK = 200
    UNAUTHORIZED = 403
    NOT_FOUND = 404
    INTERNAL_SERVER_ERROR = 500


def client_setup(uri="mongodb+srv://Hermes:ShellHacks2021@cluster0.qf7di.mongodb.net/ShellHacks2021?retryWrites=true&w=majority"):
    client = MongoClient(uri)
    return client["ShellHacks2021"]


def represenatives_info(rep_info: dict):
    db = client_setup()
    users_collect = db["Representatives"]  # collections

    users_collect.insert_one(rep_info)


def petitioner_info(petitioner_info: dict):
    db = client_setup()
    users_collect = db["Petitioners"]

    users_collect.insert_one(petitioner_info)


def login_check(username: str):
    db = client_setup()
    users_collect = db["Users"]

    user = users_collect.findOne({"user_name": username})
    if user == None:
        status = StatusCodes.NOT_FOUND
    else:
        status = StatusCodes.OK

    return status, user


def create_petition(is_representative: bool, text_title: str, text_body: str, for_count: int, against_count: int):
    if is_representative:
        return StatusCodes.UNAUTHORIZED

    db = client_setup()
    users_collect = db["Petitions"]

    date = datetime.datetime.now()
    date.strftime("%x  %X")

    users_collect.insert_one(
        {"text_file": text_title,
         "text_body": text_body,
         "date": date,
         "for_count": for_count,
         "against_count": against_count
         })