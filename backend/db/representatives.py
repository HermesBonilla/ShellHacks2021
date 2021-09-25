from backend.database_utils import StatusCodes, client_setup
import datetime

db = client_setup()
users_collect = db["Representatives"]


def representatives_info(rep_info: dict):
    users_collect.insert_one(rep_info)


def create_update(user_info: dict):
    if not user_info.is_representative:
        return StatusCodes.UNAUTHORIZED

    comment_date = "placeholder"
    comment_date.strftime("%X, %Y")

    users_collect['comment date'] = comment_date

    users_collect.insert_one({user_info})
