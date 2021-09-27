from database_utils import StatusCodes, client_setup
import datetime

def representatives_info(rep_info: dict):
    rep_col = client_setup("Representatives")
    id = rep_col.insert_one(rep_info)
    return id


def create_update(user_info: dict):
    rep_col = client_setup("Representatives")
    
    if not user_info.is_representative:
        return StatusCodes.UNAUTHORIZED

    update_date = datetime.datetime.now()
    update_date.strftime("%X, %Y")

    rep_col['update date'] = update_date

    id = rep_col.insert_one({user_info})
    return id

def find_all():
    rep_col = client_setup("Representatives")
    reps = rep_col.find({})
    return list(reps)