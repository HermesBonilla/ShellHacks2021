from database_utils import StatusCodes, client_setup


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
