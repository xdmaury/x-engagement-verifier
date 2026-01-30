# Twitter Verification API

API to verify whether a Twitter/X user exists, replied to a specific post, and follows a specific page.

## Features
- Input validation
- Structured JSON responses
- Health check endpoint

## Requirements
- Node.js 18+
- API key for Rettiwt

## Setup
1. Install dependencies:
   - `npm install`
2. Get your Twitter/X API key via the browser extension:
  - Chrome: https://rishikant181.github.io/Rettiwt-API/#a-for-chromechromium-based-browsers
  - Firefox: https://rishikant181.github.io/Rettiwt-API/#b-for-firefoxfirefox-based-browsers
  - After installing, connect to your Twitter/X account and click the extension to obtain the API key.
3. Create a `.env` file:
  - `API_KEY=your_api_key`
   - `PORT=3000` (optional)

## Run
- `npm run start`

The server starts on `http://localhost:3000` by default.

## Endpoints

### Health
- GET `/health`
- Response:
  ```json
  { "ok": true }
  ```

### Verify
- POST `/api/verify`
- Body:
  ```json
  {
    "username": "xdmaury_",
    "postId": "2013583895313424615",
    "pageName": "SHREDfi"
  }
  ```
- Response (example):
  ```json
  {
    "ok": true,
    "input": {
      "username": "xdmaury_",
      "postId": "2013583895313424615",
      "pageName": "SHREDfi"
    },
    "results": {
      "userFound": true,
      "repliedToPost": true,
      "followsPage": false
    },
    "details": {
      "userId": "123456789",
      "replyId": "987654321"
    }
  }
  ```

## Project Structure
- `src/app.js` Express app setup
- `src/server.js` HTTP server entrypoint
- `src/controllers` request handlers
- `src/services` Twitter/Rettiwt API client
- `src/routes` API routes
- `src/utils` validation and logging
- `src/config` environment configuration

## Notes
- The Rettiwt API provides best-effort data based on public information.
- Limits and availability depend on the upstream service.
