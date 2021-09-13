# Short.it

Frontend is hosted on: https://url-shortit.netlify.app/ \
Backend is hosted on: https://url-shortit.herokuapp.com/

Short.it provides a simple way to shorten URLs.

### Tech Stack
- Backend is built with Python `Flask`, and dockerized for deployment on Heroku
- Frontend responsive web application is built with JavaScript `React.JS`, hosted on Netlify
- Data is stored and persisted on MongoDB Atlas

---

### Backend
Start the server by (1) running Flask application directly, or (2) through Docker.
#### (1) Running Flask application
At `/backend/src` directory, run:
```
python app.py
```
Done!
#### (2) Running application server in a Docker container
At `/backend/src` directory, run:
```
docker build -t chanelxy/urlshortener .
```
```
docker run -d -p 5000:5000 chanelxy/urlshortener
```
Tada! Docker Containers up and running.
### Frontend

To first install dependencies, at `/frontend` directory, run:

```
npm install
```

To run the app in the development mode, run:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To launch the test runner in the interactive watch mode, run:

```
npm test
```

---
