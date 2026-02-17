# 🛒 Brand eCommerce - Full Stack App

## 📁 Project Structure
```
ecommerce-fullstack-design/
│
├── frontend/               ← Week 1 HTML files
│   ├── index.html
│   ├── products.html
│   ├── product-detail.html
│   ├── cart.html
│   ├── login.html
│   ├── style.css
│   └── app.js             ← Updated to connect to backend
│
└── backend/               ← Week 2 Node.js + Express
    ├── server.js          ← Main entry point
    ├── .env               ← Environment variables
    ├── package.json
    ├── models/
    │   ├── Product.js     ← MongoDB Product schema
    │   ├── User.js        ← MongoDB User schema
    │   └── Order.js       ← MongoDB Order schema
    ├── routes/
    │   ├── productRoutes.js  ← CRUD for products
    │   ├── authRoutes.js     ← Login / Register
    │   ├── cartRoutes.js     ← Cart management
    │   └── orderRoutes.js    ← Order management
    └── middleware/
        └── authMiddleware.js ← JWT protection
```

---

## 🚀 HOW TO RUN (Step by Step)

### Step 1: Install Node.js
Download from: https://nodejs.org (choose LTS version)

### Step 2: Install MongoDB
Download from: https://www.mongodb.com/try/download/community
After installing, run: `mongod` in a terminal to start MongoDB

### Step 3: Setup Backend
```bash
# Open terminal, go to backend folder
cd backend

# Install all packages
npm install

# Start the server
npm run dev
```
✅ You should see:
```
✅ MongoDB Connected Successfully!
🔥 Server running on http://localhost:5000
🌱 Database seeded with 12 products!
```

### Step 4: Open Frontend
Just open `frontend/index.html` in your browser
OR use VS Code Live Server extension

---

## 🔗 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET    | /api/products | Get all products |
| GET    | /api/products?search=sony | Search products |
| GET    | /api/products?category=Electronics | Filter by category |
| GET    | /api/products/:id | Get single product |
| POST   | /api/products | Create product (Admin) |
| PUT    | /api/products/:id | Update product (Admin) |
| DELETE | /api/products/:id | Delete product (Admin) |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login | Login user |
| GET    | /api/auth/profile | Get profile (Protected) |
| GET    | /api/cart | Get cart (Protected) |
| POST   | /api/cart/add | Add to cart (Protected) |
| DELETE | /api/cart/remove/:id | Remove from cart |
| POST   | /api/orders | Place order (Protected) |
| GET    | /api/orders/my | My orders (Protected) |
| GET    | /api/orders | All orders (Admin) |

---

## 🔑 Admin Login
- **Email:** admin@brand.com
- **Password:** admin123

---

## 🛠️ Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcryptjs
- **Version Control:** GitHub

---

## 📅 Deadline: 2nd March 2026
