# Inventory Management System — API Documentation

Backend API for inventory management: auth, products, customers, and orders.

**Base URL:** `http://localhost:6969/api`

All protected routes require a Bearer token:
```
Authorization: Bearer <token>
```

---

## Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Log in, returns JWT |
| GET | `/auth/me` | Yes | Get current user info |

> Rate limited: 5 requests / 15 min per IP.

**Register**
```json
POST /auth/register
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Login**
```json
POST /auth/login
{
  "email": "string",
  "password": "string"
}
```
Returns the user record on success, `null` on wrong password, `false` if the account doesn't exist.

---

## Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/products` | Yes | List all products |
| POST | `/products` | Yes | Create a product (multipart/form-data) |
| PUT | `/products/:id` | Yes | Update a product |
| DELETE | `/products/:id` | Yes | Delete a product |

**Create / Update payload** (`multipart/form-data`)
```
prodName:    string
price:       number
stock:       number
description: string
image:       file (optional on update — omit to keep existing image)
```

Images are uploaded to Cloudinary; the stored `image` field is a full URL.

---

## Customers

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/customers` | Yes | List all customers |
| POST | `/customers/add` | Yes | Create a customer |
| PUT | `/customers/edit/:id` | Yes | Update a customer |
| DELETE | `/customers/delete/:id` | Yes | Delete a customer |

**Create / Update payload**
```json
{
  "cusName": "string",
  "email": "string",
  "phone": "string",
  "gender": "MALE | FEMALE"
}
```

---

## Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/orders` | Yes | List all orders (includes line items) |
| GET | `/orders/:id` | Yes | Get one order by ID (includes line items) |
| POST | `/orders` | Yes | Create an order |
| PATCH | `/orders/:id/status` | Yes | Update order status |

**Create payload**
```json
{
  "customer_id": 1,
  "items": [
    { "product_id": 3, "quantity": 2 },
    { "product_id": 5, "quantity": 1 }
  ]
}
```
- Price is looked up server-side per product at order time — don't send price from the client.
- Stock is validated and decremented automatically per item.
- `totalPrice` is calculated server-side, not accepted as input.

**Update status payload**
```json
{ "status": "Pending | Completed | Cancelled" }
```
- Setting status to `Cancelled` restores stock for every item on that order.

---

## Data Model

```
users        (id, name, email, password, created_at)
customers    (id, cusName, email, phone, gender, created_at)
products     (id, prodName, image, price, stock, description, created_at)
orders       (id, customer_id, totalPrice, status, created_at)
order_items  (id, order_id, product_id, quantity, price)
```

`order_items` is the join table between `orders` and `products` — one order can contain multiple products, each with its own quantity and price snapshot at time of purchase.

---

## Error Format

All errors return:
```json
{ "message": "Server error", "error": "<detail>" }
```

Common status codes:
- `401` — missing/invalid token
- `404` — resource not found
- `429` — rate limit exceeded (auth routes only)
- `500` — server error (check `error` field for detail)
