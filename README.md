# Questify

Questify is an AI-powered platform for effective Q&A management

## Installation

Install dependencies both in the root folder and client folder:
npm install

## Usage
After installing dependencies:
- create two .env files in root and client folder
- add environmental variables in client folder, specifically:
-     REACT_APP_BASE_URL_DEV
-     REACT_APP_CLIENT_ID
- add environmental variables in root folder, specifically:
-     MONGODB_URI
-     JWT_SECRET
-     GOOGLE_CLIENT_ID
-     GOOGLE_CLIENT_SECRET
-     SESSION_SECRET
-     OPENAAI_KEY

- launch server: node | nodemon server.js from root folder
- launch client: npm start from client folder
