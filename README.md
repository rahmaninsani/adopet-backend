# Installation

### You'll need to install **Node.js** (https://nodejs.org/en/download) and **yarn** if you haven't already. You can install **yarn** via **npm** too.

- `npm install --global yarn`

### Open your project and duplicate **.env.example** file as **.env** file and fill in all fields in it.

### Open your project directory in **Terminal/CMD** and run the following syntax:

- `yarn`
- `yarn db-create`
- `yarn table-create`
- `yarn row-insert`
- `yarn dev`

# API Spec

## Base URL

> http://localhost:{port}

## Authentication

Request:

- Header:
  - Bearer {accessToken}

## Sign Up

Request :

- Method : POST
- Endpoint : `/signup`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
  "name": "string",
  "phoneNumber": "string",
  "address": "string",
  "email": "string",
  "password": "string"
}
```

Response :

```json
{
  "code": "number",
  "status": "string"
}
```

## Sign In

Request :

- Method : POST
- Endpoint : `/signin`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
  "email": "string",
  "password": "string"
}
```

Response :

```json
{
  "code": "number",
  "status": "string",
  "data": {
    "name": "string",
    "phoneNumber": "string",
    "address": "string",
    "email": "string",
    "accessToken": "string"
  }
}
```
