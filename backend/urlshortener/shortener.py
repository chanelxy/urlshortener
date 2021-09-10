import os
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from utils import *
from bson.json_util import dumps
from dotenv import load_dotenv
from pymongo import ReturnDocument

load_dotenv()
database = os.environ.get("DB")

app = Flask(__name__)
app.config["MONGO_URI"] = database
mongodb_client = PyMongo(app)

CORS(app)
db = mongodb_client.db

@app.route("/")
def hello():
    return "hello"

@app.route("/find", methods=["POST"])
def find():
    """
    sample request: { "shortened_url" : "https://short.it/develop/"}
    output: {
        "_id": {"$oid": "6137693149df325eb90d04c8"}, 
        "shortened_url": "https://short.it/develop/", 
        "original_url": "https://developer.gov.sg/"
        }
    """
    data = request.get_json()
    result = db.links.find_one({"shortened_url": data["shortened_url"]})
    if result:
        return dumps(result)
    return jsonify({'message': 'URL does not exist.'}), 400

@app.route("/create", methods=["POST"])
def create():
    """
        sample data:
            {
                "original_url" : "https://developer.gov.sg/",
                "custom_url" : "develop" // optional
            }
        
        output:
            {
                "original_url" : "https://developer.gov.sg/",
                "shortened_url" : "https://short.it/develop"
            }

        logic:
            if custom url:
                if custom url exists: error
            else:
                generate custom url
            if original url exists: update
            else: create
    """

    prefix = "http://short.it/"
    data = request.get_json()
    shortened_url = ""

    if data["custom_url"]:
        shortened_url = data["custom_url"]
        exists = db.links.find_one({"shortened_url": prefix + shortened_url})
        if exists:
            return jsonify({"message": "The URL '{}{}' already exists.".format(prefix, shortened_url)}), 400
    else:
        shortened_url = generate_url(data)

    db.links.find_one_and_update(
        {"original_url": data["original_url"]},
        {"$set": {"shortened_url": prefix + shortened_url}},
        upsert = True, 
        return_document = ReturnDocument.AFTER)

    return jsonify({"message": "URL successfully created."}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
