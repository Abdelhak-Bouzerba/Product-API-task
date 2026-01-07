# Product API

## Overview

Product API is a RESTful service for managing catalog items. It exposes endpoints to create products, list the complete catalog, filter by category, and retrieve product details by identifier. The API persists data in PostgreSQL through Prisma ORM and validates inbound payloads with Joi.

## Tech Stack

- Node.js 20
- Express 5
- TypeScript 5
- Prisma ORM with PostgreSQL adapter
- Joi for request validation

## Prerequisites

- Node.js 20+
- PostgreSQL instance accessible via connection string
- npm (bundled with Node.js)

## Environment Variables

Create an `.env` file in the project root with the following values:

```
DATABASE_URL="postgresql://username:password@host:port/database"
PORT=3000 # optional, defaults to 3000
```

## Setup and Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Generate the Prisma client (runs automatically on `npm install`, but can be rerun when schema changes):
   ```bash
   npx prisma generate
   ```
3. Apply database migrations (creates tables based on `prisma/schema.prisma`):
   ```bash
   npx prisma migrate deploy
   ```
4. Start the development server with live reload:
   ```bash
   npm run dev
   ```
5. Build and start for production (optional):
   ```bash
   npm run build
   npm start
   ```

The API listens on `http://localhost:<PORT>`.

## API Endpoints

All routes are prefixed with `/api`.

| Method | Route                           | Description                        |
| ------ | ------------------------------- | ---------------------------------- |
| GET    | `/api/products`                 | List all products                  |
| GET    | `/api/products?category={name}` | List products filtered by category |
| GET    | `/api/products/{id}`            | Retrieve a single product by id    |
| POST   | `/api/products`                 | Create a new product               |

## Sample Postman Requests

Use the `{{baseUrl}}` Postman variable to store `http://localhost:3000` (or your deployed URL).

### Get All Products

```http
GET {{baseUrl}}/api/products
```

### Get Products By Category

```http
GET {{baseUrl}}/api/products?category=Electronics
```

### Get Product By Id

```http
GET {{baseUrl}}/api/products/1
```

### Create Product

```http
POST {{baseUrl}}/api/products
Content-Type: application/json

{
  "name": "Wireless Keyboard",
  "description": "Low-profile keyboard with Bluetooth connectivity",
  "price": 79.99,
  "stock": 25,
  "category": "Accessories"
}
```

#### Expected Response (201 Created)

```json
{
  "id": 1,
  "name": "Wireless Keyboard",
  "description": "Low-profile keyboard with Bluetooth connectivity",
  "price": 79.99,
  "category": "Accessories",
  "stock": 25,
  "createdAt": "2026-01-07T20:33:12.000Z"
}
```

## Error Handling

- Validation failures return HTTP 400 with a Joi-generated message.
- Missing records return HTTP 404 with a descriptive message.
- Unhandled errors bubble up through `express-async-handler` and return HTTP 500.

## Database Migrations

Prisma migrations reside in `prisma/migrations`. When you update the schema, create a new migration and apply it:

```bash
npx prisma migrate dev --name add-new-field
```

## Useful npm Scripts

- `npm run dev` runs the server with Nodemon and tsx.
- `npm run build` compiles TypeScript to `dist/`.
- `npm start` launches the compiled JavaScript.
