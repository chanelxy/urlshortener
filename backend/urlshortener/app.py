from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from response import generateJSONResponse
from bson.json_util import dumps
import os
from URLService import URLService
from Url import URL

load_dotenv()
app = Flask(__name__)
database = os.environ.get("DB")
app.config["MONGO_URI"] = database
mongodb_client = PyMongo(app)
db = mongodb_client.db
CORS(app)
service = URLService(db)

@app.route("/")
def hello():
    return "hello"


@app.route("/find")
def find():
    """
    sample input: { "shortened_url" : "https://short.it/develop/"}
    """
    data = request.get_json()
    result = service.find_url(data["shortened_url"])
    if result:
        result = dict(result)
        url = URL(result["original_url"], result["shortened_url"])
        return generateJSONResponse("Shortened URL exists", url.to_dto()), 200
    return generateJSONResponse('Shortened URL does not exist.'), 200


@app.route("/create", methods=["POST"])
def create():
    """
    sample input:
        {
            "original_url" : "https://developer.gov.sg/",
            "custom_url" : "develop" //,
            "is_custom" : "true" / "false"
        }
    """
    data = request.get_json()
    url = URL(data["original_url"], data["custom_url"])
    result = service.create(data["is_custom"], url)
    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
