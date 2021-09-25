from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI
from trycourier import Courier
import requests
import bcrypt

salt = bcrypt.gensalt(10)
API_KEY = 'AIzaSyD1awBg8COVxgukb6PjQK0FYdDCCyAS364'


class User(BaseModel):
    first_name: str
    last_name: str
    user_name: str
    password: str
    zip_code: str

# need to wait for lazaros code to be able to assign these


class Petition(BaseModel):
    petition_id: str
    for_count: int
    against_count: int
    title: str
    body: str
    creator: str
   # image: img  # idk


app = FastAPI()


@app.get("/courier/")
def read_root():
    url = "https://api.courier.com/send"

    payload = {
        "event": "EXAMPLE_NOTIFICATION",
        "recipient": "8ec8c99a-c5f7-455b-9f60-8222b8a27056",
        "brand": "W50NC77P524K14M5300PGPEK4JMJ",
        "data": {
            "name": "Martin Alvarez",
            "age": 27
        },
        "profile": {
            "phone_number": "7865431215",
            "email": "malva408@fiu.edu"
        }
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers)

    return (response.text)

# works


@app.get("/zipcode/{zip_code}")
def read_root(zip_code: int):
    request = f'https://maps.googleapis.com/maps/api/geocode/json?address={zip_code}&key={API_KEY}'
    response = requests.get(request)
    ans = dict(response.json())
    return {"Hello": ans['results'][0]['address_components'][2]['long_name']}

# works


@app.post("/signup/")
async def create_item(item: User):
    print(item)
    hash = bcrypt.hashpw(b'item.password', salt)
    item.password = hash
    return item

# works


@app.post("/login/")
async def create_item(item: User):
    hash = bcrypt.hashpw(b'item.password', salt)
    item.password = hash
    return item


@app.patch("/items/{petition_id}")
def change_count(item: User):
    # if for is pressed increment count by 1, elif against is pressed increment that by 1.
    # if is_clicked(for_button):
    #     for_count += 1
    # elif is_clicked(against_button):
    #     against_count += 1
    pass
