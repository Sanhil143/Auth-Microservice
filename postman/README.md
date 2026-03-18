# Postman Collection - Auth Microservice

## Files

- **Auth-Microservice.postman_collection.json** - API collection with all endpoints
- **local.postman_environment.json** - Local environment (localhost:3000)

## Setup

1. Import the collection: **Postman** → **Import** → Select `Auth-Microservice.postman_collection.json`
2. (Optional) Import the environment: **Import** → Select `local.postman_environment.json` → Select "Local" from environment dropdown

## Usage

1. **Register** - Create a new user
2. **Login** - Get access token and refresh token (auto-saved to collection variables)
3. **Session endpoints** - Use the saved access token automatically (Bearer auth)

## Collection Variables

| Variable       | Description                          | Auto-set by      |
|----------------|--------------------------------------|------------------|
| `baseUrl`      | API base URL (default: localhost)    | Manual           |
| `accessToken`  | JWT access token                     | Login, Refresh   |
| `refreshTokenId` | Refresh token ID (for Logout only) | Login            |

## Endpoints

### Auth
- `POST /auth/signup` - Register
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout (add `terminateAll: true` to logout from all devices)

### AuthToken
- `POST /authToken/referesh` - Refresh access token (send `refreshTokenId` from login; if expired, login again)

### Session (requires Bearer token)
- `GET /sessions` - List sessions
- `DELETE /sessions/:sessionId` - Revoke session
- `DELETE /sessions/terminate-all` - Terminate all sessions
