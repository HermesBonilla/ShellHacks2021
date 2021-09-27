import bcrypt
import requests
from typing import Optional, List
from pydantic import BaseModel
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import requests
import bcrypt
import asyncio

from db import representatives, users, petitions
from database_utils import StatusCodes
from twilio.rest import Client
#from trycourier import Courier

# # Your Account SID from twilio.com/console
# account_sid = "ACff702435d0ed5a311c9c5558e7f171b9"
# # Your Auth Token from twilio.com/console
# auth_token = "87f42b26f98d48204c8dbc37f878fe9d"

# client = Client(account_sid, auth_token)

# message = client.messages.create(
#     to="+17865433977",
#     from_="+12024172346",
#     body="Hello from Python(and Martin)!")

# print(message.sid)

app = FastAPI()

salt = bcrypt.gensalt(10)
API_KEY = 'AIzaSyD1awBg8COVxgukb6PjQK0FYdDCCyAS364'


class User(BaseModel):
    first_name: str
    last_name: str
    user_name: str
    password: str
    zip_code: str
    is_representative: bool
    representative_id: Optional[str]
    county: Optional[str]
    created_petitions: Optional[List[int]] = []
    signed_petitions: Optional[List[int]] = []


class UserNoPwd(BaseModel):
    first_name: str
    last_name: str
    user_name: str
    zip_code: str
    is_representative: bool
    representative_id: str
    county: str


class LoginUser(BaseModel):
    user_name: str
    password: str


class Petition(BaseModel):
    for_count: Optional[int]
    against_count: Optional[int]
    petition_id: int
    text_title: str
    text_body: str
    creator: str
    county: str
    tagged_rep: str
   # image: img  # idk


class Update(BaseModel):
    text_body: str
    creator: User
    text_title: str
    creation_date: str
    petition_id: int

<<<<<<< HEAD

app = FastAPI()

origins = [
    "http://localhost*",
    "http://localhost:3000*",
    "http://localhost:3001*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def alertCreator(petition_id):
    # if ()if get_petitiong_by_id(petition_id).for_count == 1000:
    # send message with twilio


@app.post("/signup/", response_model=UserNoPwd)
=======
@app.post("/signup/")
>>>>>>> 4419b62 (last push)
async def create_item(item: User):
    hash = bcrypt.hashpw(b'item.password', salt)
    item.password = hash
    # GCP HERE
    request = f'https://maps.googleapis.com/maps/api/geocode/json?address={item.zip_code}&key={API_KEY}'
    response = requests.get(request)
    ans = dict(response.json())
    item.county = ans['results'][0]['address_components'][2]['long_name']

    await users.create_user(item.__dict__)
    
    return item

# works


@app.post("/login/", status_code=200, response_model=User)
async def create_item(item: LoginUser, response: Response):
    encoded_non_hashed_pw = (item.password).encode('utf-8')

    user = await users.login_check(item.user_name)
    print(user)
    if not user:
        response.status_code = status.HTTP_404_NOT_FOUND
        return None

    is_same_pwd = bcrypt.checkpw(
        encoded_non_hashed_pw, (user['password']).encode('utf-8'))

    if not is_same_pwd:
        response.status_code = status.HTTP_404_NOT_FOUND
    return user


@app.post("/create_petition/")
async def create_item(item: Petition):
    item.for_count = 0
    item.against_count = 0
<<<<<<< HEAD
    # Your Account SID from twilio.com/console
    account_sid = "ACff702435d0ed5a311c9c5558e7f171b9"
    # Your Auth Token from twilio.com/console
    auth_token = "87f42b26f98d48204c8dbc37f878fe9d"

    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to="+17865433977",
        from_="+12024172346",
        body="Hello! Your petition has been created!")

    print(message.sid)
=======
    petitions.create_petition(item.__dict__)
>>>>>>> 4419b62 (last push)
    return item


@app.get("/get_petition/")
async def get_petition(item: Petition):
    item.for_count = 0
    item.against_count = 0
    return item


@app.post("/create_update/")
async def create_update(item: Update):
    representatives.create_update(item.creator)
    return item


@app.patch("/petitions/{petition_id}")
def change_count(item: Petition):
    # if for is pressed increment count by 1, elif against is pressed increment that by 1.
    # if is_clicked(for_button):
    #     for_count += 1
    # elif is_clicked(against_button):
    #     against_count += 1
    pass

<<<<<<< HEAD

if __name__ == "__main__":
    uvicorn.run(app, port=3001)
=======
@app.get("/petitions/all")
async def all_petitions():
    all_petitions = await petitions.find_all()

    return list(all_petitions)

@app.get("/reps/all")
async def all_reps():
    reps = await representatives.find_all()

    return reps

if __name__ == "__main__":
    origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    uvicorn.run(app, port=3001)
>>>>>>> 4419b62 (last push)
