document.addEventListener('DOMContentLoaded', function() {
  // Thumbnail Gallery
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainProductImage = document.getElementById('mainProductImage');

  if (thumbnails.length > 0 && mainProductImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Update main image (in a real app, this would swap the actual image)
        const index = this.dataset.index;
        // This is a placeholder - in production, you'd swap the actual background image
        console.log('Switched to image', index);
      });
    });
  }

  // Size Selection
  const sizeButtons = document.querySelectorAll('.size-btn');
  
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      sizeButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Quantity Selector
  const minusBtn = document.querySelector('.qty-btn.minus');
  const plusBtn = document.querySelector('.qty-btn.plus');
  const qtyInput = document.querySelector('.qty-input');

  if (minusBtn && plusBtn && qtyInput) {
    minusBtn.addEventListener('click', function() {
      const currentValue = parseInt(qtyInput.value);
      if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
        minusBtn.disabled = currentValue - 1 === 1;
      }
    });

    plusBtn.addEventListener('click', function() {
      const currentValue = parseInt(qtyInput.value);
      const maxValue = parseInt(qtyInput.max) || 10;
      if (currentValue < maxValue) {
        qtyInput.value = currentValue + 1;
        minusBtn.disabled = false;
      }
    });
  }

  // Product Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.dataset.tab;

      // Remove active class from all buttons and panes
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      // Add active class to clicked button and corresponding pane
      this.classList.add('active');
      const targetPane = document.getElementById(targetTab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Add to Cart Button
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const selectedSize = document.querySelector('.size-btn.active');
      const quantity = qtyInput ? qtyInput.value : 1;

      if (!selectedSize) {
        alert('Please select a size');
        return;
      }

      // In a real app, this would add the item to cart
      console.log('Added to cart:', {
        size: selectedSize.dataset.size,
        quantity: quantity
      });
      
      // Show success feedback
      this.textContent = 'Added to Bag ✓';
      this.style.background = '#A5673E';
      
      setTimeout(() => {
        this.textContent = 'Add to Bag — £0.00';
        this.style.background = '#D91C73';
      }, 2000);
    });
  }

  // Buy Now Button
  const buyNowBtn = document.querySelector('.buy-now-btn');
  
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
      const selectedSize = document.querySelector('.size-btn.active');
      
      if (!selectedSize) {
        alert('Please select a size');
        return;
      }

      // In a real app, this would redirect to checkout
      console.log('Buy now clicked');
    });
  }

  // Wishlist Button
  const wishlistBtn = document.querySelector('.wishlist-btn');
  
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      const svg = this.querySelector('svg');
      
      if (this.classList.contains('active')) {
        svg.setAttribute('fill', '#D91C73');
        svg.setAttribute('stroke', '#D91C73');
      } else {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
      }
    });
  }
});
