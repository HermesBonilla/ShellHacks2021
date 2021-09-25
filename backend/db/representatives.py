from database_utils import client_setup

db = client_setup()
users_collect = db["Representatives"]


def representatives_info(rep_info: dict):
    users_collect.insert_one(rep_info)
