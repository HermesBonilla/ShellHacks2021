from pymongo import MongoClient


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

    # if match return 200 and info
    # if not, throw error

    # store hashed password
    # login stuff (find_one())
