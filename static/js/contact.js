document.addEventListener('DOMContentLoaded', function() {
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const successMsg = document.getElementById('successMsg');
      if (successMsg) {
        successMsg.classList.add('show');
      }
      this.reset();
    });
  }

  // Cart badge update
  function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('oladiplenty_cart') || '[]');
    } catch (e) {}
    const count = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  updateCartBadge();
});
