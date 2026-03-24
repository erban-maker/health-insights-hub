# code-backend

Node + Express + MongoDB backend scaffold

## Setup

1. `cd code-backend`
2. `npm install`
3. create `.env` with:
   - `MONGODB_URI=mongodb://localhost:27017/health_insights_hub`
   - optional `PORT=5000`
4. `npm run dev` (needs nodemon) or `npm start`

## Endpoints

- `GET /` -> hello message
- `GET /api/users` -> list users
- `POST /api/users` -> create user

## Notes

- Uses Mongoose for MongoDB
- Use MongoDB Compass to connect to the same URI.
