// =============================================
//  BRAND eCOMMERCE - MAIN SERVER FILE
//  Week 2: Node.js + Express + MongoDB Backend
// =============================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// ===== MIDDLEWARE =====
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files (Week 1 HTML files)
app.use(express.static('../frontend'));

// ===== DATABASE CONNECTION =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    // Seed database with sample data on first run
    seedDatabase();
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    console.log('💡 Make sure MongoDB is running: mongod');
    process.exit(1);
  });

// ===== ROUTES =====
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/cart',     require('./routes/cartRoutes'));
app.use('/api/orders',   require('./routes/orderRoutes'));

// ===== ROOT ROUTE =====
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Brand eCommerce API is running!',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      auth:     '/api/auth',
      cart:     '/api/cart',
      orders:   '/api/orders',
    }
  });
});

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ===== GLOBAL ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ success: false, message: err.message || 'Server Error' });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🔥 Server running on http://localhost:${PORT}`);
  console.log(`📦 API ready at http://localhost:${PORT}/api/products`);
  console.log(`🔐 Auth ready at http://localhost:${PORT}/api/auth\n`);
});

// ===== SEED DATABASE =====
async function seedDatabase() {
  const Product = require('./models/Product');
  const count = await Product.countDocuments();
  if (count > 0) return; // Already seeded

  const sampleProducts = [
    // Electronics
    { name: "Sony WH-1000XM5 Headphones",  price: 299.99, oldPrice: 399.99,  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",  description: "Industry-leading noise cancellation with 30-hour battery life.", category: "Electronics", brand: "Sony",      stock: 15, rating: 5, numReviews: 128 },
    { name: "iPhone 15 Pro Max",            price: 999.99, oldPrice: 1199.99, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80",  description: "The most powerful iPhone ever with titanium design.",            category: "Electronics", brand: "Apple",     stock: 25, rating: 5, numReviews: 256 },
    { name: "Dell XPS 15 Laptop",           price: 1299.99,oldPrice: 1499.99, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80",  description: "Premium laptop with OLED display and Intel Core i9.",           category: "Electronics", brand: "Dell",      stock: 8,  rating: 5, numReviews: 312 },
    { name: "Samsung 4K Smart TV 55\"",     price: 849.99, oldPrice: 999.99,  image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=80",  description: "55-inch Crystal UHD Smart TV with built-in streaming.",         category: "Electronics", brand: "Samsung",   stock: 7,  rating: 4, numReviews: 167 },
    { name: "iPad Pro 12.9",                price: 1099.99,oldPrice: 1299.99, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80",  description: "The ultimate iPad experience powered by Apple M2 chip.",        category: "Electronics", brand: "Apple",     stock: 12, rating: 5, numReviews: 389 },
    { name: "JBL Flip 6 Bluetooth Speaker", price: 129.99, oldPrice: 149.99,  image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",  description: "Powerful sound with IP67 waterproof rating.",                   category: "Electronics", brand: "JBL",       stock: 30, rating: 4, numReviews: 201 },
    // Gadgets
    { name: "Samsung Galaxy Watch 6",       price: 249.99, oldPrice: 299.99,  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",  description: "Advanced health tracking with stunning AMOLED display.",        category: "Gadgets",     brand: "Samsung",   stock: 20, rating: 5, numReviews: 174 },
    { name: "PlayStation 5 Console",        price: 499.99, oldPrice: null,    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&q=80",  description: "Next-gen gaming with ultra-fast SSD and ray tracing.",          category: "Gadgets",     brand: "Sony",      stock: 5,  rating: 5, numReviews: 543 },
    { name: "DJI Mini 3 Drone",             price: 759.99, oldPrice: 899.99,  image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&q=80",  description: "Lightweight drone with 4K HDR video and 38-min flight time.",   category: "Gadgets",     brand: "DJI",       stock: 9,  rating: 5, numReviews: 134 },
    // Clothing
    { name: "Nike Air Max 270 Sneakers",    price: 110.99, oldPrice: 139.99,  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",  description: "Max Air cushioning unit for all-day comfort and style.",        category: "Clothing",    brand: "Nike",      stock: 50, rating: 5, numReviews: 98  },
    { name: "Levi's 501 Original Jeans",    price: 69.99,  oldPrice: 89.99,   image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",  description: "The original straight fit jeans since 1873. Timeless style.",  category: "Clothing",    brand: "Levi's",    stock: 80, rating: 5, numReviews: 432 },
    { name: "H&M Winter Puffer Jacket",     price: 89.99,  oldPrice: 119.99,  image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80",  description: "Warm padded jacket with hood, perfect for cold winters.",       category: "Clothing",    brand: "H&M",       stock: 45, rating: 4, numReviews: 203 },
    { name: "Ray-Ban Aviator Sunglasses",   price: 154.99, oldPrice: 179.99,  image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80",  description: "Classic aviator style with UV400 protection lenses.",           category: "Clothing",    brand: "Ray-Ban",   stock: 35, rating: 5, numReviews: 321 },
    // Sports
    { name: "Decathlon Yoga Mat Pro",       price: 29.99,  oldPrice: 39.99,   image: "https://images.unsplash.com/photo-1601925228008-6adf8c673c28?w=300&q=80",  description: "Non-slip 6mm thick yoga mat with alignment lines.",             category: "Sports",      brand: "Decathlon", stock: 100,rating: 5, numReviews: 267 },
    { name: "Bowflex Adjustable Dumbbells", price: 299.99, oldPrice: 399.99,  image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80",  description: "Replaces 15 sets of weights. Adjust from 5 to 52.5 lbs.",      category: "Sports",      brand: "Bowflex",   stock: 18, rating: 5, numReviews: 412 },
    { name: "Spalding NBA Basketball",      price: 49.99,  oldPrice: null,    image: "https://images.unsplash.com/photo-1546519638405-a9a54bb68eb1?w=300&q=80",  description: "Official NBA game ball with deep channel design.",              category: "Sports",      brand: "Spalding",  stock: 60, rating: 5, numReviews: 198 },
    { name: "Wilson Tennis Racket Pro",     price: 89.99,  oldPrice: 109.99,  image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=300&q=80",  description: "Professional grade tennis racket for all skill levels.",        category: "Sports",      brand: "Wilson",    stock: 25, rating: 4, numReviews: 143 },
    // Home Furniture
    { name: "3-Seater Velvet Sofa",         price: 599.99, oldPrice: 799.99,  image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",  description: "Luxury velvet sofa with solid wood legs and foam cushioning.",  category: "Home",        brand: "IKEA",      stock: 10, rating: 5, numReviews: 234 },
    { name: "L-Shaped Corner Sofa",         price: 899.99, oldPrice: 1099.99, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&q=80",  description: "Spacious L-shaped sofa perfect for large living rooms.",        category: "Home",        brand: "Ashley",    stock: 6,  rating: 4, numReviews: 189 },
    { name: "Wooden Dining Table Set",      price: 449.99, oldPrice: 549.99,  image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300&q=80",  description: "Solid wood dining table with 4 matching chairs.",               category: "Home",        brand: "IKEA",      stock: 8,  rating: 5, numReviews: 167 },
    { name: "Ergonomic Office Chair",       price: 349.99, oldPrice: 449.99,  image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&q=80",  description: "Lumbar support office chair for all-day comfort.",              category: "Home",        brand: "Herman Miller", stock: 15, rating: 5, numReviews: 521 },
    // Kitchen
    { name: "KitchenAid Stand Mixer",       price: 379.99, oldPrice: 449.99,  image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=300&q=80",  description: "Professional 5-quart stand mixer with 10 speeds.",              category: "Kitchen",     brand: "KitchenAid",stock: 20, rating: 5, numReviews: 678 },
    { name: "Instant Pot Duo 7-in-1",       price: 89.99,  oldPrice: 119.99,  image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&q=80",  description: "7-in-1 multi-use pressure cooker, slow cooker and steamer.",   category: "Kitchen",     brand: "Instant Pot",stock:40, rating: 5, numReviews: 943 },
    { name: "Ninja Air Fryer 5.5L",         price: 119.99, oldPrice: 149.99,  image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=300&q=80",  description: "XL air fryer with 5.5L capacity and 4 cooking functions.",      category: "Kitchen",     brand: "Ninja",     stock: 35, rating: 5, numReviews: 812 },
    { name: "Nespresso Coffee Machine",     price: 199.99, oldPrice: 249.99,  image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=300&q=80",  description: "Premium espresso machine with 19-bar pump pressure.",           category: "Kitchen",     brand: "Nespresso", stock: 22, rating: 5, numReviews: 567 },
    { name: "Tefal Non-Stick Pan Set",      price: 79.99,  oldPrice: 99.99,   image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80",  description: "5-piece non-stick cookware set with titanium coating.",         category: "Kitchen",     brand: "Tefal",     stock: 50, rating: 4, numReviews: 345 },
    // Garden
    { name: "Weber BBQ Gas Grill",          price: 349.99, oldPrice: 449.99,  image: "https://images.unsplash.com/photo-1555169062-013468b47731?w=300&q=80",  description: "3-burner gas grill with 7,500 BTU and porcelain grates.",      category: "Garden",      brand: "Weber",     stock: 8,  rating: 5, numReviews: 312 },
    { name: "Rattan Garden Chair Set",      price: 249.99, oldPrice: 299.99,  image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=300&q=80",  description: "2-piece outdoor rattan chair set with cushions.",               category: "Garden",      brand: "Garden Plus",stock:12, rating: 4, numReviews: 143 },
    // Jewelry
    { name: "Gold Diamond Pendant",         price: 299.99, oldPrice: 399.99,  image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80",  description: "14K gold pendant with genuine diamond. Perfect gift.",          category: "Jewelry",     brand: "Tiffany",   stock: 15, rating: 5, numReviews: 87  },
    { name: "Silver Charm Bracelet",        price: 89.99,  oldPrice: null,    image: "https://images.unsplash.com/photo-1573408301185-9519f94815e2?w=300&q=80",  description: "Sterling silver bracelet with 5 charm slots.",                  category: "Jewelry",     brand: "Pandora",   stock: 30, rating: 5, numReviews: 234 },
  ];

  await Product.insertMany(sampleProducts);
  console.log('🌱 Database seeded with', sampleProducts.length, 'products!');
}
