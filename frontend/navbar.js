// =============================================
//  SMART NAVBAR — Auto injects on every page
//  Handles: active links, same-page reload, cart badge
// =============================================

(function() {

  // Current page filename
  var page = window.location.pathname.split('/').pop() || 'index.html';

  // Helper: is this the current page?
  function isActive(href) {
    return page === href || (page === '' && href === 'index.html');
  }

  // Build nav links — clicking same page = reload
  function navLink(href, label) {
    var active = isActive(href) ? ' class="active"' : '';
    var click  = isActive(href)
      ? ' onclick="window.location.reload(); return false;"'
      : '';
    return '<a href="' + href + '"' + active + click + '>' + label + '</a>';
  }

  // Inject navbar HTML into every page
  var navbar = document.querySelector('.nav-links .container');
  if (navbar) {
    navbar.innerHTML =
      navLink('index.html',      'Home')      +
      navLink('products.html',   'Products')  +
      navLink('learn-more.html', 'Learn More')+
      navLink('sale.html',       'Sale');
  }

  // Update cart badge
  function updateBadge() {
    var cart  = JSON.parse(localStorage.getItem('cart') || '[]');
    var total = cart.reduce(function(s, i) { return s + i.qty; }, 0);
    document.querySelectorAll('#cartBadge').forEach(function(b) {
      b.textContent = total;
    });
  }

  // Show logged-in user name in navbar
  function updateNavUser() {
    var user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) return;
    document.querySelectorAll('.nav-icon span').forEach(function(span) {
      if (span.textContent === 'Profile') {
        span.textContent = user.name.split(' ')[0];
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateBadge();
    updateNavUser();
  });

  // Expose globally so other scripts can call it
  window.updateCartBadge = updateBadge;
  window.updateNavUser   = updateNavUser;

})();
