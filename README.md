# Smile Seattle Bakery

A full-stack bakery website for browsing cakes, selecting cake sizes, placing orders, and securely completing payments online.

## Features

- Browse cakes by category
- View detailed cake information
- Select cake sizes and prices
- Add cakes to a shopping cart
- Update quantities and remove items
- User registration and login
- JWT-based authentication and authorization
- Customer order history
- View individual order details
- Cancel pending orders
- Secure Stripe checkout
- Automatic order creation after successful payment
- Order confirmation emails
- Order-ready email notifications
- Contact form with email notifications
- Admin dashboard
- Admin order status management
- Admin cake management
- Add, edit, delete, archive, and restore cake sizes
- Wedding cake quote requests

## Technologies

### Frontend

- React
- Vite
- React Router
- Context API
- CSS

### Backend

- Node.js
- Express
- MySQL
- JWT
- bcrypt

### APIs & Services

- Stripe
- Resend
- Custom Rest-API

## Project Structure

```text
bakery-app/
├── public/
├── src/
│   ├── components and pages
│   ├── context/
│   └── assets/
├── server/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── server.js
├── package.json
└── README.md