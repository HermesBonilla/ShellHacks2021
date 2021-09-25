from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI
import requests
import bcrypt

API_KEY = 'AIzaSyD1awBg8COVxgukb6PjQK0FYdDCCyAS364'

app = FastAPI()


class User(BaseModel):
    first_name: str
    last_name: str
    user_name: str
    password: str
    zip_code: str


class Petition():
    petition_id: str
    for_count: int
    against_count: int
    title: str
    body: str
    creator: str
   # image: img  # idk


@app.get("/zipcode/{zip_code}")
def read_root(zip_code: int):
    request = f'https://maps.googleapis.com/maps/api/geocode/json?address={zip_code}&key={API_KEY}'
    response = requests.get(request)
    ans = dict(response.json())
    return {"Hello": ans['results'][0]['address_components'][2]['long_name']}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@app.post("/items/")
async def create_item(item: User):
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(item.password, salt)
    item.password = hash
    return item


@app.get("/petitions/{petition_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "q": q}


@app.patch("/items/{petition_id}")
def change_count(item: User):
    # if for is pressed increment count by 1, elif against is pressed increment that by 1.
    # if is_clicked(for_button):
    #     for_count += 1
    # elif is_clicked(against_button):
    #     against_count += 1
