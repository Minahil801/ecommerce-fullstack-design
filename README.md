# 🛍️ Brand eCommerce - Full-Stack Web Application

A fully functional eCommerce web application built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

**Live Demo:** [https://ecommerce-fullstack-design.netlify.app/](https://ecommerce-fullstack-design.netlify.app/)

**GitHub Repository:** [https://github.com/Minahil801/ecommerce-fullstack-design](https://github.com/Minahil801/ecommerce-fullstack-design)

---

## 📋 Project Overview

This project was developed as part of a full-stack development internship task, completed in 3 weekly milestones covering frontend development, backend integration, and deployment.

---

## ✅ Week 1: Static Frontend Development

**Goal:** Build responsive frontend pages for desktop and mobile views

### Completed Features:
- ✅ **Home Page** - Hero section, featured products, categories
- ✅ **Product Listing Page** - Grid layout with filters and search
- ✅ **Product Details Page** - Product information and add to cart
- ✅ **Cart Page** - Shopping cart with quantity controls
- ✅ **Login/Register Pages** - User authentication forms
- ✅ **Fully Responsive Design** - Mobile, tablet, and desktop optimized

### Technologies Used:
- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript
- Font Awesome Icons

### Deliverables:
✅ Responsive design for all screen sizes  
✅ Clean, organized code structure  
✅ Committed to GitHub repository

---

## ✅ Week 2: Backend Setup & Dynamic Integration

**Goal:** Create backend API and connect with frontend for dynamic content

### Completed Features:
- ✅ **MongoDB Database** - Cloud database on MongoDB Atlas
- ✅ **Node.js + Express Backend** - RESTful API architecture
- ✅ **CRUD Operations** - Create, Read, Update, Delete for products
- ✅ **Product Collection** - 30+ products across 8 categories
- ✅ **Dynamic Frontend** - Data fetched from backend API
- ✅ **Search & Filter** - Filter by category, price, rating, and search

### API Endpoints:
```
GET    /api/products           - Get all products
GET    /api/products/:id       - Get single product
POST   /api/products           - Create product (Admin)
PUT    /api/products/:id       - Update product (Admin)
DELETE /api/products/:id       - Delete product (Admin)
POST   /api/auth/register      - User registration
POST   /api/auth/login         - User login
```

### Technologies Used:
- Node.js & Express.js
- MongoDB & Mongoose
- MongoDB Atlas (Cloud Database)
- dotenv for environment variables
- CORS for cross-origin requests

### Deliverables:
✅ Functional backend with REST APIs  
✅ Database populated with sample data  
✅ Frontend-backend integration complete  
✅ Committed to GitHub repository

---

## ✅ Week 3: Authentication, Admin Panel & Deployment

**Goal:** Add authentication, admin features, and deploy the application

### Completed Features:
- ✅ **JWT Authentication** - Secure login/register with JSON Web Tokens
- ✅ **Password Hashing** - bcrypt for secure password storage
- ✅ **Admin Panel** - Complete CRUD interface for products
- ✅ **Protected Routes** - Admin-only access to management pages
- ✅ **Cart Management** - localStorage for cart persistence
- ✅ **Responsive Testing** - All pages tested on mobile/tablet/desktop
- ✅ **Frontend Deployment** - Deployed on Netlify

### Admin Panel Features:
- Dashboard with product statistics
- Add new products with form validation
- Edit existing products
- Delete products with confirmation
- Search and filter products
- Stock level indicators (In Stock, Low Stock, Out of Stock)

### Technologies Used:
- JSON Web Tokens (JWT)
- bcryptjs
- Express middleware for route protection
- Netlify for frontend hosting
- MongoDB Atlas for cloud database

### Deliverables:
✅ User authentication implemented  
✅ Admin panel with CRUD operations  
✅ Cart functionality working  
✅ Responsive testing complete  
✅ Application deployed with live URL  
✅ Final code committed to GitHub

---

## 🚀 Deployment

### Frontend (Netlify):
**Live URL:** [https://ecommerce-fullstack-design.netlify.app/](https://ecommerce-fullstack-design.netlify.app/)

- Deployed via GitHub integration
- Automatic deployments on push
- Custom domain support ready

### Backend:
- Backend code available in `/backend` folder
- MongoDB Atlas connection configured
- Ready for deployment on Railway/Render/Heroku

---

## 📁 Project Structure

```
ecommerce-fullstack-design/
├── frontend/
│   ├── index.html           # Home page
│   ├── products.html        # Product listing
│   ├── product-detail.html  # Product details
│   ├── cart.html           # Shopping cart
│   ├── login.html          # Login/Register
│   ├── admin.html          # Admin panel
│   ├── style.css           # Main stylesheet
│   ├── app.js              # Frontend logic
│   └── navbar.js           # Navbar helper
│
├── backend/
│   ├── server.js           # Express server
│   ├── models/
│   │   ├── Product.js      # Product schema
│   │   ├── User.js         # User schema
│   │   └── Order.js        # Order schema
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── package.json
│   └── .env (not in Git)
│
├── .gitignore
└── README.md
```

---

## 🛠️ Local Setup Instructions

### Prerequisites:
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation:

1. **Clone the repository:**
```bash
git clone https://github.com/Minahil801/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

2. **Setup Backend:**
```bash
cd backend
npm install
```

3. **Create `.env` file in backend folder:**
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=brand_secret_key_2026
PORT=5000
```

4. **Start Backend Server:**
```bash
npm run dev
```
Server runs on `http://localhost:5000`

5. **Open Frontend:**
- Open `frontend/index.html` in browser
- Or use Live Server extension in VS Code

---

## 🔑 Test Credentials

### Admin Account:
```
Email: admin@brand.com
Password: admin123
```

### Regular User:
Register a new account or use any test account you create.

---

## 📊 Database Information

**MongoDB Atlas** - Cloud Database
- **Cluster:** ecommerce-cluster
- **Database:** ecommerce-brand
- **Collections:** products, users, orders

**Sample Data:**
- 30+ products across 8 categories
- Categories: Electronics, Gadgets, Clothing, Sports, Home, Kitchen, Garden, Jewelry

---

## 🎨 Features Showcase

### User Features:
- Browse products with search and filters
- View product details
- Add items to cart
- Adjust quantities in cart
- User registration and login
- Responsive design for all devices

### Admin Features:
- Dashboard with statistics
- Add new products
- Edit product details
- Delete products
- Stock management
- Search and filter products

---

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Environment variables for sensitive data
- CORS configuration for API security

---

## 📱 Responsive Design

Tested and optimized for:
- 📱 Mobile phones (320px - 480px)
- 📱 Tablets (481px - 768px)
- 💻 Laptops (769px - 1024px)
- 🖥️ Desktops (1025px+)

---

## 👨‍💻 Developer

**Minahil Hassan**  
Full-Stack Development Intern  
Pakistan Internship Program 2026

---

## 📄 License

This project was created as part of an internship assignment.

---

## 🙏 Acknowledgments

- Assignment provided by Pakistan Internship Program
- MongoDB Atlas for cloud database
- Netlify for frontend hosting

---

**Last Updated:** February 18, 2026  
**Project Deadline:** March 2, 2026  
**Status:** ✅ Completed and Deployed
