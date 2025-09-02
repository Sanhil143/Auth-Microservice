# Node.js TypeScript Express MongoDB Auth Microservice

This repository contains a **Node.js microservice** built with **TypeScript**, **Express**, and **MongoDB** for user authentication. It includes features such as **user registration, login, logout, and refresh token-based authentication**.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [Running the Application](#running-the-application) 
- [Folder Structure](#folder-structure)  
- [License](#license)

---

## Features

- **User Registration:** Create a new user account  
- **User Login:** Authenticate using email and password  
- **Logout:** Revoke refresh token  
- **Refresh Token:** Generate a new access token without re-login  
- **Password Hashing:** Secure storage with bcrypt  
- **JWT Authentication:** Secure endpoints using JWT  

---

## Tech Stack

- **Node.js** - Runtime environment  
- **TypeScript** - Typed JavaScript  
- **Express** - Web framework  
- **MongoDB** - Database  
- **Mongoose** - MongoDB object modeling  
- **bcryptjs** - Password hashing  
- **jsonwebtoken** - JWT generation and verification  
- **dotenv** - Environment variable management  

---

## Prerequisites

- Node.js >= 18  
- MongoDB >= 6  
- npm or yarn  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Sanhil143/Auth-Microservice.git
cd nodejs-ts-auth-microservice
npm install
```
---
 
## Environment Variables

Create a .env file in the root directory with the following:

- APP_TITLE=Auth Microservice
- APP_DESCRIPTION=Handle auth
- MONGO_URI=mongodb://localhost:27017/authdb
- REQUEST_LIMIT=100kb
- PORT=3000
- APP_ID=Auth Microservice
- NODE_ENV=development
- SCHEME=http
- LOG_LEVEL=info
- JWT_SECRET=auth_microservice_secret
- JWT_EXPIRES_IN=1h
- REFRESH_TOKEN_EXPIRES_IN=30d
- SESSION_SECRET=auth_microservice_secret

---

## Running the Application

Development (with hot reload):
- npm run dev

Build & Run:
- npm run build
- npm start


## Folder Structure
```bash
.
├── server
│   |-- api    
|   |   ├── controllers      # API controllers
│   |   ├── routers          # Express routes
│   |   ├── services         # Business logic & token services
|   |   └-- server.ts        # Express app
|   ├── models           # Mongoose models
│   ├── middlewares      # Auth middlewares
│   ├── utils            # Helpers (logger, error handling)
|   |-- interfaces       # Interfaces
|   |-- configs          # Configurations
|   |-- validators       # Validators
│   ├── routes.ts        # Routers
│   └── index.ts         # Entry point
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT License

Note: This service is modular and scalable, ideal for integration into larger systems or as a standalone authentication service.

This is now a **fully complete single README file** including installation, environment setup, endpoints, folder structure, and license.  

If you want, I can also create a **ready-to-use single TypeScript file skeleton** for **register, login, logout, and refresh token**