# News Application API

This project is a RESTful API for a news application that allows users to read, favorite, and search news articles.

## Features

- User authentication
- Fetch news articles
- Mark articles as read
- Favorite articles
- View read articles
- View favorite articles
- Search articles by keyword

## Project Structure

The project follows a typical Express.js application structure:

.
├── controllers/
│ └── newsController.js
├── middleware/
│ └── auth.js
├── routes/
│ └── news.js
├── models/
├── config/
├── app.js
├── server.js
└── package.json

## Routes

The following routes are available in the `routes/news.js` file:

| Method | Path | Description | Authentication |
|--------|------|-------------|----------------|
| GET | `/api/v1/news` | Get all news articles | Required |
| POST | `/api/v1/news/:id/read` | Mark an article as read | Required |
| POST | `/api/v1/news/:id/favorite` | Mark an article as favorite | Required |
| GET | `/api/v1/news/read` | Get all read articles | Required |
| GET | `/api/v1/news/favorites` | Get all favorite articles | Required |
| GET | `/api/v1/news/search/:keyword` | Search articles by keyword | Required |

## Authentication

All routes require authentication. The `authenticate` middleware is used to protect these routes. Ensure you include the necessary authentication headers with your requests.

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/airtribe-projects/news-aggregator-api-paviajay1712.git
   cd news-aggregator-api-paviajay1712
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEWS_API_KEY=your_news_api_key
   ```

4. Start the server:
   ```
   npm start
   ```

## API Usage

To use the API, make requests to the appropriate endpoints. Remember to include authentication headers with your requests.

Example using curl:

curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/news

## Dependencies

- Express.js: Web application framework
- Mongoose: MongoDB object modeling
- jsonwebtoken: JWT implementation for Node.js
- bcrypt: Password hashing
- dotenv: Environment variable management
