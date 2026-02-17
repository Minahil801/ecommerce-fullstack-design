// =============================================
//  BRAND eCOMMERCE - FRONTEND APP.JS
//  Week 2: Connects frontend to backend API
// =============================================

const API_URL = 'http://localhost:5000/api';

// ===== PRODUCT DATA (fallback if API not connected) =====
const allProducts = [
  { id: 0, name: "Sony WH-1000XM5 Headphones", brand: "Sony", category: "Electronics", price: 299.99, oldPrice: 399.99, rating: 5, reviews: 128, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", badge: "NEW" },
  { id: 1, name: "iPhone 15 Pro Max", brand: "Apple", category: "Electronics", price: 999.99, oldPrice: 1199.99, rating: 5, reviews: 256, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80", badge: "-20%" },
  { id: 2, name: "Canon EOS R50 Camera", brand: "Canon", category: "Electronics", price: 679.99, oldPrice: null, rating: 4, reviews: 89, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80", badge: null },
  { id: 3, name: "Samsung Galaxy Watch 6", brand: "Samsung", category: "Gadgets", price: 249.99, oldPrice: 299.99, rating: 5, reviews: 174, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", badge: "-15%" },
  { id: 4, name: "Dell XPS 15 Laptop", brand: "Dell", category: "Electronics", price: 1299.99, oldPrice: 1499.99, rating: 5, reviews: 312, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80", badge: "NEW" },
  { id: 5, name: "JBL Flip 6 Speaker", brand: "JBL", category: "Electronics", price: 129.99, oldPrice: 149.99, rating: 4, reviews: 201, img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80", badge: null },
  { id: 6, name: "Nike Air Max 270", brand: "Nike", category: "Clothing", price: 110.99, oldPrice: null, rating: 5, reviews: 98, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", badge: null },
  { id: 7, name: "Casio G-Shock Watch", brand: "Casio", category: "Gadgets", price: 89.99, oldPrice: 99.99, rating: 4, reviews: 54, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", badge: "-10%" },
  { id: 8, name: "HP Pavilion 15 Laptop", brand: "HP", category: "Electronics", price: 749.99, oldPrice: null, rating: 5, reviews: 143, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80", badge: null },
  { id: 9, name: "Bose QuietComfort 45", brand: "Bose", category: "Electronics", price: 329.99, oldPrice: null, rating: 5, reviews: 211, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", badge: "NEW" },
  { id: 10, name: "iPad Pro 12.9", brand: "Apple", category: "Electronics", price: 1099.99, oldPrice: 1299.99, rating: 5, reviews: 389, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80", badge: "-15%" },
  { id: 11, name: "Samsung 4K Smart TV", brand: "Samsung", category: "Electronics", price: 849.99, oldPrice: 999.99, rating: 4, reviews: 167, img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=80", badge: "-15%" },
  { id: 12, name: "PlayStation 5 Console", brand: "Sony", category: "Gadgets", price: 499.99, oldPrice: null, rating: 5, reviews: 543, img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&q=80", badge: "HOT" },
  { id: 13, name: "DJI Mini 3 Drone", brand: "DJI", category: "Gadgets", price: 759.99, oldPrice: 899.99, rating: 5, reviews: 134, img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&q=80", badge: "NEW" },
  { id: 14, name: "Logitech MX Master 3", brand: "Logitech", category: "Electronics", price: 99.99, oldPrice: 119.99, rating: 5, reviews: 289, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80", badge: null },
  { id: 15, name: "Adidas Ultraboost 22", brand: "Adidas", category: "Clothing", price: 159.99, oldPrice: 189.99, rating: 4, reviews: 76, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", badge: "-15%" },
];

// ===== API HELPER =====
async function apiCall(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem('token');
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  };
  try {
    const res = await fetch(`${API_URL}${endpoint}`, options);
    return await res.json();
  } catch {
    return null; // API not running — use local fallback
  }
}

// ===== FETCH PRODUCTS FROM API =====
async function fetchProducts(params = '') {
  const data = await apiCall(`/products${params}`);
  return data && data.success ? data.products : allProducts;
}

// ===== RENDER PRODUCT CARDS =====
function renderProducts(products, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  // Normalize API products to same shape as local products
  const normalized = products.map((p, i) => ({
    id: p._id || p.id || i,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    oldPrice: p.oldPrice || null,
    rating: p.rating || 5,
    reviews: p.numReviews || p.reviews || 0,
    img: p.image || p.img,
    badge: p.badge || null,
  }));

  if (normalized.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px;color:#888;">
        <i class="fa fa-search" style="font-size:40px;display:block;margin-bottom:12px;"></i>
        No products found.
      </div>`;
    return;
  }

  grid.innerHTML = normalized.map(p => `
    <div class="product-card" onclick="window.location='product-detail.html?id=${p.id}'">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
        ${p.badge ? `<span class="${p.badge.startsWith('-') || p.badge === 'HOT' ? 'badge-sale' : 'badge-new'}">${p.badge}</span>` : ''}
        <button class="wishlist-btn" onclick="toggleWishlist(event, '${p.id}')" title="Wishlist">
          <i class="fa fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <p class="brand">${p.brand}</p>
        <h4>${p.name}</h4>
        <div class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)} <span>(${p.reviews})</span></div>
        <div class="price">
          <span class="current">$${p.price.toFixed(2)}</span>
          ${p.oldPrice ? `<span class="old">$${p.oldPrice.toFixed(2)}</span>` : ''}
        </div>
        <button class="add-cart-btn" onclick="addToCart(event, '${p.id}', '${p.name}', ${p.price}, '${p.img}')">
          <i class="fa fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// ===== CART FUNCTIONS =====
function addToCart(event, id, name, price, img) {
  if (event) event.stopPropagation();
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(i => i.id == id);
  if (existing) { existing.qty++; }
  else { cart.push({ id, name, price, img, qty: 1 }); }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();

  // Button feedback
  if (event) {
    const btn = event.target.closest('.add-cart-btn');
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa fa-check"></i> Added!';
      btn.style.background = '#28a745';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 1500);
    }
  }
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('#cartBadge').forEach(b => b.textContent = total);
}

// ===== WISHLIST =====
function toggleWishlist(event, id) {
  if (event) event.stopPropagation();
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const idx = wishlist.indexOf(String(id));
  if (idx === -1) { wishlist.push(String(id)); }
  else { wishlist.splice(idx, 1); }
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  if (event) {
    const btn = event.target.closest('.wishlist-btn');
    if (btn) btn.classList.toggle('active');
  }
}

// ===== AUTH =====
function getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

function updateNavUser() {
  const user = getUser();
  if (!user) return;
  document.querySelectorAll('.nav-icon').forEach(link => {
    const span = link.querySelector('span');
    if (span && span.textContent === 'Profile') {
      span.textContent = user.name.split(' ')[0];
    }
  });
}

// ===== MOBILE MENU =====
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) menu.classList.toggle('open');
}

// ===== PAGE LOAD =====
document.addEventListener('DOMContentLoaded', async () => {
  updateCartBadge();
  updateNavUser();

  // Homepage - Featured Products
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const products = await fetchProducts('?limit=6');
    renderProducts(products.slice(0, 6), 'featuredGrid');
  }

  // Homepage - Recommended Products
  const recommendedGrid = document.getElementById('recommendedGrid');
  if (recommendedGrid) {
    const products = await fetchProducts('?limit=12');
    renderProducts(products.slice(6, 10), 'recommendedGrid');
  }

  // Products page
  const productsGrid = document.getElementById('productsGrid');
  if (productsGrid) {
    const products = await fetchProducts();
    renderProducts(products, 'productsGrid');
    if (document.getElementById('productCount')) {
      document.getElementById('productCount').textContent = `Showing ${products.length} products`;
    }
  }
});
