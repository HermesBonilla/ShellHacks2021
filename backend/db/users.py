from database_utils import StatusCodes, client_setup

COL = "Users"

def create_user(user_info: dict):
    users_collect = client_setup(COL)
    
    users_collect.insert_one(dict(user_info))


def login_check(username: str):
    users_collect = client_setup(COL)
    user = users_collect.find_one({"user_name": username})

    return user
