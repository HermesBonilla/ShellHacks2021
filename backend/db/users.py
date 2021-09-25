from database_utils import StatusCodes, client_setup


def create_user(user_info: dict):
    db = client_setup()
    users_collect = db["Users"]

    users_collect.insert_one(user_info)


def login_check(username: str):
    db = client_setup()
    users_collect = db["Users"]

    user = users_collect.findOne({"user_name": username})

    return user
