# Simple Auth App
A minimalistic authentication system built with Express and TypeORM, utilizing JWT for handling user authentication.

## Features
* User Registration
* Email Verification (Implementation pending)
* User Login and JWT Token Generation
* Token-based Authentication with JWT
* User Profile Retrieval
* Password Reset (Implementation pending)
* User Logout
* Refresh Token Mechanism to renew access tokens
## Getting Started
### Prerequisites
* Node.js
* TypeScript
* SQLite (For database, as the project uses SQLite)
### Installation
1. Clone the repository:
```bash
git@github.com:UranusLin/simple-auth-app.git
```
1. Install dependencies:
```bash
cd simple-auth-app
pnpm install
```
1. Start the server:
```bash
pnpm start
```
The server will be running on http://localhost:3000.

## API Endpoints
### User Registration
Endpoint: /api/signup

Method: POST

Data:
```json
{
  "email": "testasd5@asd.com",
  "name": "testzz1",
  "password": "asdasd"
}
```
### Email Verification (Pending)
Endpoint: /api/verify-email/:token

Method: GET

### User Login
Endpoint: /api/login

Method: POST

Data:
```json
{
    "email": "testasd5@asd.com",
    "password": "asdasd123"
}
```
### User Profile Retrieval
Endpoint: /api/profile

Method: GET

Headers:
```
header 'authorization: Bearer <access_token>'
```
### Password Reset (Pending)
Endpoint: /api/reset-password

Method: POST
Headers:
```
header 'authorization: Bearer <access_token>'
```
Data:
```json
{
    "password": "asdasd123"
}
```

## Future Improvements
* Complete pending features: Email Verification and Password Reset.
* Add support for third-party OAuth providers like Google, Facebook, etc.
* Integrate more security features like 2FA and rate limiting.
