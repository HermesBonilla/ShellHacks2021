from database_utils import StatusCodes, client_setup
import datetime

db = client_setup()
users_collect = db["Petitions"]


def create_petition(user_info: dict):
    if user_info.is_representative:
        return StatusCodes.UNAUTHORIZED

    date = datetime.datetime.now()
    date.strftime("%x  %X")

    user_info['created_at'] = date

    users_collect.insert_one({user_info})
