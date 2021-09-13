from flask import Flask, request, redirect, abort, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from response import generateJSONResponse
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
    return "Hi! Please head to https://url-shortit.netlify.app/"


@app.route("/find", methods=["POST"])
def find():
    """
    sample input: { "shortened_url" : "http://url-shortit.herokuapp.com/develop/"}
    """
    data = request.get_json()
    print('data --->', data)
    result = service.find_url(data["shortened_url"])
    if result:
        result = dict(result)
        url = URL(result["original_url"], result["shortened_url"])
        return generateJSONResponse("Original URL found!",  "true", url.to_dto()), 200
    return generateJSONResponse('Shortened URL does not exist.', "false"), 200


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


@app.route("/<url>")
def move(url):
    # find shortened url and redirect
    location = service.get_redirect_url(url)
    return redirect(location)


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
