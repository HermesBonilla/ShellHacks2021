from database_utils import StatusCodes, client_setup

COL = "Users"

async def create_user(user_info: dict):
    users_collect = client_setup(COL)
    
    id = await users_collect.insert_one(dict(user_info))
    return id

async def login_check(username: str):
    users_collect = client_setup(COL)
    user = await users_collect.find_one({"user_name": str(username)})

    return user
