def generateJSONResponse(message, exist, data=None):
    return {"message": message, "data": data, "exist": exist}
