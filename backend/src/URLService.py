from response import generateJSONResponse
import random
import shortuuid
from datetime import datetime

class URLService:
    def __init__(self, db):
        self.db = db

    def find_url(self, shortened_url):
        """ returns url or None """
        return self.db.links.find_one({"shortened_url": shortened_url})

    def save(self, url):
        result = self.db.links.insert_one(url.to_dto())
        return result.acknowledged

    def generate_uuid(self):
        random_length = random.randint(3, 8)
        uuid = shortuuid.ShortUUID().random(length=random_length)
        return uuid

    def create(self, is_custom, url):
        """
            if is_custom:
                if custom url exists: error
            else:
                generate custom url
            create
        """

        prefix = "https://url-shortit.herokuapp.com/"
        if is_custom:
            search_result = self.find_url(prefix + url.shortened)
            if search_result:
                return generateJSONResponse("Shortened URL exists. Please enter another custom URL.", "true", url.to_dto()), 200
            else:
                path = url.shortened
        else:
            path = self.generate_uuid()

        url.shortened = prefix + path
        save_result = self.save(url)

        if save_result:
            return generateJSONResponse("Shortened URL successfully created!", False, url.to_dto()), 200
        return generateJSONResponse("Shortened URL creation was unsuccessful.", True, url.to_dto()), 200
 

    def get_redirect_url(self, shortened_url):
        # update:
        # increase visit count
        # change datetime

        location = ''
        if ("https://url-shortit.herokuapp.com/" not in shortened_url):
            shortened_url = "https://url-shortit.herokuapp.com/" + shortened_url
        result = self.find_url(shortened_url)
        if result:
            result = dict(result)

            date = datetime.now()
            print("date =", date)
            # dd/mm/YY H:M:S
            dt_string = date.strftime("%d/%m/%Y %H:%M:%S")
            print("date and time =", dt_string)

            # call update function
            self.db.links.update_one({'shortened_url': shortened_url}, {
                                        '$inc': {'visit_count': 1},
                                        '$set': {'last_visited_date': dt_string}})

            if "http" not in result["original_url"]:
                location = "http://"
            location += result["original_url"]
        
        return location
