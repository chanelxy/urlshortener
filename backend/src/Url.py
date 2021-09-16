class URL:
    def __init__(self, original, shortened, visit_count, last_visited_date):
        self.original = original
        self.shortened = shortened
        self.visit_count = visit_count
        self.last_visited_date = last_visited_date

    def to_dto(self): # data transfer object
        return {"original_url": self.original, "shortened_url": self.shortened,
                "visit_count": self.visit_count, "last_visited_date": self.last_visited_date}
