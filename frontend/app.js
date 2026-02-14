// =============================================
//  BRAND eCOMMERCE - APP.JS
//  Fetches from Node.js backend (localhost:5000)
//  Falls back to local data if backend is offline
// =============================================

var API_URL = 'http://localhost:5000/api';

// ===== LOCAL FALLBACK DATA =====
var localProducts = [
  {id:0,  name:"Sony WH-1000XM5 Headphones",  brand:"Sony",         category:"Electronics", price:299.99, oldPrice:399.99,  rating:5, reviews:128, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",  badge:"NEW"},
  {id:1,  name:"iPhone 15 Pro Max",            brand:"Apple",        category:"Electronics", price:999.99, oldPrice:1199.99, rating:5, reviews:256, img:"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80",  badge:"-20%"},
  {id:2,  name:"Canon EOS R50 Camera",         brand:"Canon",        category:"Electronics", price:679.99, oldPrice:null,    rating:4, reviews:89,  img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80",  badge:null},
  {id:3,  name:"Dell XPS 15 Laptop",           brand:"Dell",         category:"Electronics", price:1299.99,oldPrice:1499.99, rating:5, reviews:312, img:"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=300&q=80",  badge:"NEW"},
  {id:4,  name:"Samsung 4K Smart TV 55",       brand:"Samsung",      category:"Electronics", price:849.99, oldPrice:999.99,  rating:4, reviews:167, img:"https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&q=80",  badge:"-15%"},
  {id:5,  name:"iPad Pro 12.9",                brand:"Apple",        category:"Electronics", price:1099.99,oldPrice:1299.99, rating:5, reviews:389, img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80",  badge:"-15%"},
  {id:6,  name:"Bose QuietComfort 45",         brand:"Bose",         category:"Electronics", price:329.99, oldPrice:null,    rating:5, reviews:211, img:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&q=80",  badge:"NEW"},
  {id:7,  name:"JBL Flip 6 Bluetooth Speaker", brand:"JBL",          category:"Electronics", price:129.99, oldPrice:149.99,  rating:4, reviews:201, img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",  badge:null},
  {id:8,  name:"Samsung Galaxy Watch 6",       brand:"Samsung",      category:"Gadgets",     price:249.99, oldPrice:299.99,  rating:5, reviews:174, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",  badge:"-15%"},
  {id:9,  name:"PlayStation 5 Console",        brand:"Sony",         category:"Gadgets",     price:499.99, oldPrice:null,    rating:5, reviews:543, img:"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&q=80",  badge:"HOT"},
  {id:10, name:"DJI Mini 3 Drone",             brand:"DJI",          category:"Gadgets",     price:759.99, oldPrice:899.99,  rating:5, reviews:134, img:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&q=80",  badge:"NEW"},
  {id:11, name:"Logitech MX Master 3 Mouse",   brand:"Logitech",     category:"Gadgets",     price:99.99,  oldPrice:119.99,  rating:5, reviews:289, img:"https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=300&q=80",  badge:null},
  {id:12, name:"Nike Air Max 270 Sneakers",    brand:"Nike",         category:"Clothing",    price:110.99, oldPrice:139.99,  rating:5, reviews:98,  img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",  badge:null},
  {id:13, name:"Adidas Ultraboost 22",         brand:"Adidas",       category:"Clothing",    price:159.99, oldPrice:189.99,  rating:4, reviews:76,  img:"https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=300&q=80",  badge:"-15%"},
  {id:14, name:"Levis 501 Original Jeans",     brand:"Levis",        category:"Clothing",    price:69.99,  oldPrice:89.99,   rating:5, reviews:432, img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",  badge:"-20%"},
  {id:15, name:"Zara Slim Fit Formal Shirt",   brand:"Zara",         category:"Clothing",    price:39.99,  oldPrice:null,    rating:4, reviews:154, img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80",  badge:"NEW"},
  {id:16, name:"H&M Winter Puffer Jacket",     brand:"H&M",          category:"Clothing",    price:89.99,  oldPrice:119.99,  rating:4, reviews:203, img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80",  badge:"-25%"},
  {id:17, name:"Under Armour Sports T-Shirt",  brand:"Under Armour", category:"Clothing",    price:34.99,  oldPrice:44.99,   rating:5, reviews:87,  img:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&q=80",  badge:null},
  {id:18, name:"Ray-Ban Aviator Sunglasses",   brand:"Ray-Ban",      category:"Clothing",    price:154.99, oldPrice:179.99,  rating:5, reviews:321, img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80",  badge:"-10%"},
  {id:19, name:"Yoga Mat Pro",                 brand:"Decathlon",    category:"Sports",      price:29.99,  oldPrice:39.99,   rating:5, reviews:267, img:"https://images.unsplash.com/photo-1601925228008-6adf8c673c28?w=300&q=80",  badge:null},
  {id:20, name:"Tennis Racket Pro",            brand:"Wilson",       category:"Sports",      price:89.99,  oldPrice:109.99,  rating:4, reviews:143, img:"https://images.unsplash.com/photo-1617083934555-ac6ef0be1154?w=300&q=80",  badge:"-20%"},
  {id:21, name:"NBA Size 7 Basketball",        brand:"Spalding",     category:"Sports",      price:49.99,  oldPrice:null,    rating:5, reviews:198, img:"https://images.unsplash.com/photo-1546519638405-a9a54bb68eb1?w=300&q=80",  badge:"NEW"},
  {id:22, name:"Adjustable Dumbbells Set",     brand:"Bowflex",      category:"Sports",      price:299.99, oldPrice:399.99,  rating:5, reviews:412, img:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80",  badge:"-25%"},
  {id:23, name:"Football Cleats Predator",     brand:"Adidas",       category:"Sports",      price:79.99,  oldPrice:99.99,   rating:4, reviews:156, img:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&q=80",  badge:"-20%"},
  {id:24, name:"Road Cycling Helmet",          brand:"Nike",         category:"Sports",      price:59.99,  oldPrice:null,    rating:5, reviews:88,  img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",  badge:null},
  {id:25, name:"3-Seater Velvet Sofa",         brand:"IKEA",         category:"Home",        price:599.99, oldPrice:799.99,  rating:5, reviews:234, img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",  badge:"-25%"},
  {id:26, name:"L-Shaped Corner Sofa",         brand:"Ashley",       category:"Home",        price:899.99, oldPrice:1099.99, rating:4, reviews:189, img:"https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&q=80",  badge:"-18%"},
  {id:27, name:"Wooden Dining Table Set",      brand:"IKEA",         category:"Home",        price:449.99, oldPrice:549.99,  rating:5, reviews:167, img:"https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300&q=80",  badge:"NEW"},
  {id:28, name:"King Size Bed Frame",          brand:"Ashley",       category:"Home",        price:699.99, oldPrice:899.99,  rating:4, reviews:143, img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&q=80",  badge:"-22%"},
  {id:29, name:"Ergonomic Office Chair",       brand:"Herman Miller",category:"Home",        price:349.99, oldPrice:449.99,  rating:5, reviews:521, img:"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&q=80",  badge:"-20%"},
  {id:30, name:"Scandinavian Bookshelf",       brand:"IKEA",         category:"Home",        price:199.99, oldPrice:null,    rating:4, reviews:98,  img:"https://images.unsplash.com/photo-1594620302200-9a762244a156?w=300&q=80",  badge:null},
  {id:31, name:"KitchenAid Stand Mixer",       brand:"KitchenAid",   category:"Kitchen",     price:379.99, oldPrice:449.99,  rating:5, reviews:678, img:"https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=300&q=80",  badge:"-15%"},
  {id:32, name:"Instant Pot Duo 7-in-1",       brand:"Instant Pot",  category:"Kitchen",     price:89.99,  oldPrice:119.99,  rating:5, reviews:943, img:"https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&q=80",  badge:"HOT"},
  {id:33, name:"Ninja Air Fryer 5.5L",         brand:"Ninja",        category:"Kitchen",     price:119.99, oldPrice:149.99,  rating:5, reviews:812, img:"https://images.unsplash.com/photo-1648170645793-ec7372a1d51e?w=300&q=80",  badge:"-20%"},
  {id:34, name:"Non-Stick Pan Set 5pc",        brand:"Tefal",        category:"Kitchen",     price:79.99,  oldPrice:99.99,   rating:4, reviews:345, img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80",  badge:"-20%"},
  {id:35, name:"Nespresso Coffee Machine",     brand:"Nespresso",    category:"Kitchen",     price:199.99, oldPrice:249.99,  rating:5, reviews:567, img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80",  badge:"-20%"},
  {id:36, name:"Professional Knife Set 15pc",  brand:"Cuisinart",    category:"Kitchen",     price:59.99,  oldPrice:79.99,   rating:4, reviews:289, img:"https://images.unsplash.com/photo-1593618998160-e34014e67546?w=300&q=80",  badge:null},
  {id:37, name:"Philips Hand Blender 800W",    brand:"Philips",      category:"Kitchen",     price:49.99,  oldPrice:64.99,   rating:4, reviews:198, img:"https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&q=80",  badge:"-23%"},
  {id:38, name:"Glass Food Storage Set 10pc",  brand:"Pyrex",        category:"Kitchen",     price:34.99,  oldPrice:null,    rating:5, reviews:412, img:"https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&q=80",  badge:"NEW"},
  {id:39, name:"Weber BBQ Gas Grill",          brand:"Weber",        category:"Garden",      price:349.99, oldPrice:449.99,  rating:5, reviews:312, img:"https://images.unsplash.com/photo-1555169062-013468b47731?w=300&q=80",  badge:"-22%"},
  {id:40, name:"Rattan Garden Chair Set",      brand:"Garden Plus",  category:"Garden",      price:249.99, oldPrice:299.99,  rating:4, reviews:143, img:"https://images.unsplash.com/photo-1600210492493-0946911123ea?w=300&q=80",  badge:"-17%"},
  {id:41, name:"Solar Garden LED Lights",      brand:"Philips",      category:"Garden",      price:29.99,  oldPrice:null,    rating:4, reviews:267, img:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80",  badge:"NEW"},
  {id:42, name:"Electric Lawn Mower",          brand:"Bosch",        category:"Garden",      price:199.99, oldPrice:259.99,  rating:5, reviews:189, img:"https://images.unsplash.com/photo-1590418606746-018840f9eff8?w=300&q=80",  badge:"-23%"},
  {id:43, name:"Gold Diamond Pendant",         brand:"Tiffany",      category:"Jewelry",     price:299.99, oldPrice:399.99,  rating:5, reviews:87,  img:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80",  badge:"-25%"},
  {id:44, name:"Silver Charm Bracelet",        brand:"Pandora",      category:"Jewelry",     price:89.99,  oldPrice:null,    rating:5, reviews:234, img:"https://images.unsplash.com/photo-1573408301185-9519f94815e2?w=300&q=80",  badge:"NEW"},
  {id:45, name:"Pearl Stud Earrings",          brand:"Swarovski",    category:"Jewelry",     price:59.99,  oldPrice:74.99,   rating:4, reviews:156, img:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80",  badge:"-20%"}
];

// Active products (filled by API or local)
var allProducts = [];

// =============================================
// FETCH FROM BACKEND API
// =============================================
function fetchProducts(callback) {
  fetch(API_URL + '/products?limit=100')
    .then(function(res) {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })
    .then(function(data) {
      // server.js returns { success, count, products: [...] }
      var raw = data.products || data;
      allProducts = raw.map(function(p, i) {
        return {
          id:       p._id,
          name:     p.name,
          brand:    p.brand || 'Brand',
          category: p.category,
          price:    p.price,
          oldPrice: p.oldPrice || null,
          rating:   p.rating  || 5,
          reviews:  p.numReviews || 0,
          img:      p.image  || '',
          badge:    p.oldPrice ? '-' + Math.round((1 - p.price/p.oldPrice)*100) + '%' : null,
          stock:    p.stock  || 0,
          description: p.description || ''
        };
      });
      console.log('✅ Loaded from API:', allProducts.length, 'products');
      if (callback) callback(allProducts);
    })
    .catch(function() {
      console.warn('⚠️ Backend offline — using local data');
      allProducts = localProducts;
      if (callback) callback(allProducts);
    });
}

// Fetch single product by ID
function fetchProductById(id, callback) {
  // Try MongoDB _id first
  fetch(API_URL + '/products/' + id)
    .then(function(res) {
      if (!res.ok) throw new Error('not found');
      return res.json();
    })
    .then(function(data) {
      var p = data.product || data;
      var product = {
        id:          p._id,
        name:        p.name,
        brand:       p.brand || 'Brand',
        category:    p.category,
        price:       p.price,
        oldPrice:    p.oldPrice || null,
        rating:      p.rating  || 5,
        reviews:     p.numReviews || 0,
        img:         p.image  || '',
        badge:       p.oldPrice ? '-' + Math.round((1-p.price/p.oldPrice)*100)+'%' : null,
        stock:       p.stock  || 0,
        description: p.description || ''
      };
      if (callback) callback(product);
    })
    .catch(function() {
      // Fallback: find by numeric id in local data
      var found = localProducts.find(function(p) { return String(p.id) === String(id); });
      if (callback) callback(found || null);
    });
}

// =============================================
// RENDER PRODUCT CARDS
// =============================================
function renderProducts(list, containerId) {
  var grid = document.getElementById(containerId);
  if (!grid) return;
  if (!list || list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:#888;"><i class="fa fa-search" style="font-size:48px;display:block;margin-bottom:16px;opacity:0.3;"></i><p>No products found</p></div>';
    return;
  }
  grid.innerHTML = list.map(function(p) {
    var stars = '';
    for (var i = 0; i < 5; i++) stars += i < p.rating ? '★' : '☆';
    var pid      = p.id || p._id;
    var safeName = String(p.name).replace(/'/g, '');
    var safeImg  = String(p.img || p.image || '').replace(/'/g, '');
    return '<div class="product-card" onclick="window.location=\'product-detail.html?id=' + pid + '\'">' +
      '<div class="product-img">' +
      '<img src="' + safeImg + '" alt="' + p.name + '" loading="lazy"/>' +
      (p.badge ? '<span class="' + (String(p.badge).charAt(0)==='-'||p.badge==='HOT'?'badge-sale':'badge-new') + '">' + p.badge + '</span>' : '') +
      '<button class="wishlist-btn" onclick="event.stopPropagation()"><i class="fa fa-heart"></i></button>' +
      '</div>' +
      '<div class="product-info">' +
      '<p class="brand">' + (p.brand||'') + '</p>' +
      '<h4>' + p.name + '</h4>' +
      '<div class="stars">' + stars + ' <span>(' + (p.reviews||p.numReviews||0) + ')</span></div>' +
      '<div class="price">' +
      '<span class="current">$' + Number(p.price).toFixed(2) + '</span>' +
      (p.oldPrice ? '<span class="old">$' + Number(p.oldPrice).toFixed(2) + '</span>' : '') +
      '</div>' +
      '<button class="add-cart-btn" onclick="event.stopPropagation();addToCart(\'' + pid + '\',\'' + safeName + '\',' + p.price + ',\'' + safeImg + '\')">' +
      '<i class="fa fa-shopping-cart"></i> Add to Cart</button>' +
      '</div></div>';
  }).join('');
}

// =============================================
// CART FUNCTIONS
// =============================================
function addToCart(id, name, price, img) {
  var cart = JSON.parse(localStorage.getItem('cart') || '[]');
  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (String(cart[i].id) === String(id)) { cart[i].qty++; found = true; break; }
  }
  if (!found) cart.push({id: String(id), name: name, price: Number(price), img: img, qty: 1});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  var cart  = JSON.parse(localStorage.getItem('cart') || '[]');
  var total = cart.reduce(function(s,i){return s+i.qty;}, 0);
  document.querySelectorAll('#cartBadge').forEach(function(b){b.textContent=total;});
}

function changeQty(id, delta) {
  var cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.map(function(i){
    if(String(i.id)===String(id)) i.qty=Math.max(1,i.qty+delta);
    return i;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}

function removeFromCart(id) {
  var cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter(function(i){return String(i.id)!==String(id);});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}

// =============================================
// CART PAGE
// =============================================
function renderCart() {
  var cartItems   = document.getElementById('cartItems');
  var emptyCart   = document.getElementById('emptyCart');
  var cartSummary = document.getElementById('cartSummary');
  if (!cartItems) return;

  var cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) {
    cartItems.innerHTML = '';
    if (emptyCart)   emptyCart.style.display   = 'block';
    if (cartSummary) cartSummary.style.display = 'none';
    return;
  }
  if (emptyCart)   emptyCart.style.display   = 'none';
  if (cartSummary) cartSummary.style.display = 'block';

  var subtotal = 0;
  cartItems.innerHTML = cart.map(function(item){
    subtotal += item.price * item.qty;
    return '<div class="cart-item" style="display:flex;align-items:center;gap:16px;padding:16px;background:#fff;border-radius:12px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">' +
      '<img src="'+item.img+'" style="width:80px;height:80px;object-fit:cover;border-radius:8px;"/>' +
      '<div style="flex:1;"><h4 style="font-size:15px;margin-bottom:4px;">'+item.name+'</h4>' +
      '<p style="color:#0D6EFD;font-weight:700;">$'+Number(item.price).toFixed(2)+'</p></div>' +
      '<div style="display:flex;align-items:center;gap:8px;">' +
      '<button onclick="changeQty(\''+item.id+'\',-1)" style="width:32px;height:32px;border:1px solid #ddd;border-radius:6px;cursor:pointer;background:#f8f9fa;font-size:16px;font-weight:700;">-</button>' +
      '<span style="font-weight:700;min-width:28px;text-align:center;">'+item.qty+'</span>' +
      '<button onclick="changeQty(\''+item.id+'\',1)" style="width:32px;height:32px;border:1px solid #ddd;border-radius:6px;cursor:pointer;background:#f8f9fa;font-size:16px;font-weight:700;">+</button>' +
      '</div>' +
      '<p style="font-weight:700;min-width:80px;text-align:right;">$'+(item.price*item.qty).toFixed(2)+'</p>' +
      '<button onclick="removeFromCart(\''+item.id+'\')" style="background:none;border:none;color:#dc3545;cursor:pointer;font-size:18px;padding:4px 8px;"><i class="fa fa-trash"></i></button>' +
      '</div>';
  }).join('');

  var tax   = subtotal * 0.1;
  var total = subtotal + tax;
  var s  = document.getElementById('subtotal');
  var t  = document.getElementById('tax');
  var tt = document.getElementById('total');
  if(s)  s.textContent  = '$'+subtotal.toFixed(2);
  if(t)  t.textContent  = '$'+tax.toFixed(2);
  if(tt) tt.textContent = '$'+total.toFixed(2);
}

// =============================================
// AUTH — connect to backend API
// =============================================
function getUser()   { return JSON.parse(localStorage.getItem('user') || 'null'); }
function isLoggedIn(){ return !!localStorage.getItem('token'); }

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function updateNavUser() {
  var user = getUser();
  if (!user) return;
  document.querySelectorAll('.nav-icon span').forEach(function(s){
    if(s.textContent==='Profile') s.textContent = user.name.split(' ')[0];
  });
}

// Login — backend first, local fallback
function handleLogin(e) {
  if(e) e.preventDefault();
  var email = (document.getElementById('loginEmail')||{}).value||'';
  var pass  = (document.getElementById('loginPassword')||{}).value||'';
  if(!email||!pass){ alert('Please fill all fields!'); return; }

  fetch(API_URL + '/auth/login', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email:email, password:pass})
  })
  .then(function(res){ return res.json(); })
  .then(function(data) {
    if(data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        name: data.user ? data.user.name : email.split('@')[0],
        email: email,
        role: data.user ? data.user.role : 'user'
      }));
      window.location.href = 'index.html';
    } else {
      alert(data.message || 'Wrong email or password!');
    }
  })
  .catch(function() {
    // Backend offline — local fallback
    var users = JSON.parse(localStorage.getItem('users')||'[]');
    users.push({name:'Admin', email:'admin@brand.com', password:'admin123', role:'admin'});
    var u = null;
    for(var i=0;i<users.length;i++){
      if(users[i].email===email && users[i].password===pass){u=users[i];break;}
    }
    if(u){
      localStorage.setItem('user', JSON.stringify({name:u.name,email:u.email,role:u.role||'user'}));
      localStorage.setItem('token','local-'+Date.now());
      window.location.href='index.html';
    } else {
      alert('Wrong email or password!');
    }
  });
}

// Register — backend first, local fallback
function handleRegister(e) {
  if(e) e.preventDefault();
  var name  = (document.getElementById('regName')||{}).value||'';
  var email = (document.getElementById('regEmail')||{}).value||'';
  var pass  = (document.getElementById('regPassword')||{}).value||'';
  var conf  = (document.getElementById('regConfirm')||{}).value||'';
  if(!name||!email||!pass){ alert('Please fill all fields!'); return; }
  if(pass!==conf){ alert('Passwords do not match!'); return; }
  if(pass.length<6){ alert('Password must be at least 6 characters!'); return; }

  fetch(API_URL + '/auth/register', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name:name, email:email, password:pass})
  })
  .then(function(res){ return res.json(); })
  .then(function(data) {
    if(data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({name:name,email:email,role:'user'}));
      alert('Welcome, '+name+'!');
      window.location.href='index.html';
    } else {
      alert(data.message || 'Registration failed!');
    }
  })
  .catch(function() {
    var users = JSON.parse(localStorage.getItem('users')||'[]');
    for(var i=0;i<users.length;i++){
      if(users[i].email===email){alert('Email already registered!');return;}
    }
    users.push({name:name,email:email,password:pass,role:'user'});
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify({name:name,email:email,role:'user'}));
    localStorage.setItem('token','local-'+Date.now());
    alert('Welcome, '+name+'!');
    window.location.href='index.html';
  });
}

// =============================================
// PAGE LOAD
// =============================================
document.addEventListener('DOMContentLoaded', function(){
  updateCartBadge();
  updateNavUser();

  var page = window.location.pathname.split('/').pop() || 'index.html';

  if(page === 'cart.html') {
    renderCart();
  }

  if(page === 'index.html' || page === '') {
    fetchProducts(function(products) {
      renderProducts(products.slice(0, 8),  'featuredGrid');
      renderProducts(products.slice(8, 16), 'recommendedGrid');
    });
  }
});
