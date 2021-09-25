from pymongo import MongoClient


def represenatives_info(rep_info: dict):
    client = MongoClient(
        "mongodb+srv://Hermes:ShellHacks2021@cluster0.qf7di.mongodb.net/ShellHacks2021?retryWrites=true&w=majority")
    db = client["ShellHacks2021"]
    users_collect = db["Representatives"]  # collections

    users_collect.insert_one(rep_info)


def petitioner_info(petitioner_info: dict):
    client = MongoClient(
        "mongodb+srv://Hermes:ShellHacks2021@cluster0.qf7di.mongodb.net/ShellHacks2021?retryWrites=true&w=majority")
    db = client["ShellHacks2021"]
    users_collect = db["Petitioners"]

    users_collect.insert_one(petitioner_info)
