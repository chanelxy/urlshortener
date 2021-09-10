import random
import shortuuid


def generate_url(data):
    random_length = random.randint(3, 8)
    shortened_url = shortuuid.ShortUUID().random(length=random_length)
    return shortened_url
