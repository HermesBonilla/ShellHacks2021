from database_utils import StatusCodes, client_setup
import datetime

pet_col = client_setup("Petitions")

def create_petition(user_info: dict):
    if user_info['creator'] == user_info['tagged_rep']:
        return StatusCodes.UNAUTHORIZED

    date = datetime.datetime.now()
    date.strftime("%x  %X")

    user_info['created_at'] = date

    id = pet_col.insert_one(dict(user_info))
    return id

async def find_all():
    petitions = await pet_col.find(dict())
    return petitions