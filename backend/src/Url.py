class URL:
    def __init__(self, original, shortened):
        self.original = original
        self.shortened = shortened

    def to_dto(self): # data transfer object
        return {"original_url": self.original, "shortened_url": self.shortened}
