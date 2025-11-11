/* app.js — cart UI (fixed) */

function updateCartDisplay() {
  if (!cartItemsList || !cartTotal || !cartCounter || !checkoutBtn) return;

  cartItemsList.innerHTML = '';
  let totalItems = 0;
  let totalPesoAmount = 0;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li style="text-align: center; color: #888;">Your cart is empty.</li>';
  } else {
    cart.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <div class="item-details">
          <span class="item-name">${item.name}</span>
          <span class="item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
          <div class="quantity-controls">
            <button class="qty-btn minus" data-id="${item.id}" data-action="minus">-</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn plus" data-id="${item.id}" data-action="plus">+</button>
          </div>
        </div>
        <button class="remove-btn" data-id="${item.id}" data-action="remove">🗑️</button>
      `;
      cartItemsList.appendChild(li);
      totalItems += item.quantity;
      totalPesoAmount += item.price * item.quantity;
    });
  }

  if (totalItems > 0) {
    cartCounter.textContent = totalItems;
    cartCounter.style.display = 'block';
  } else {
    cartCounter.style.display = 'none';
  }

  cartTotal.innerHTML = `<strong>Total: ₱${totalPesoAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}</strong>`;

  checkoutBtn.disabled = cart.length === 0;
}

function showCartSidebar(event) {
  if (event) event.preventDefault();
  document.getElementById('page-overlay')?.classList.add('show');
  document.getElementById('cart-sidebar')?.classList.add('show');
}

function hideCartSidebar() {
  document.getElementById('page-overlay')?.classList.remove('show');
  document.getElementById('cart-sidebar')?.classList.remove('show');
}

function openCheckout() {
  if (cart.length === 0) return;
  hideCartSidebar();
  document.getElementById('checkout-modal')?.classList.add('show');
}

function closeCheckout() {
  document.getElementById('checkout-modal')?.classList.remove('show');
}

function placeOrder(event) {
  event.preventDefault();
  const buyerDetails = {
    name: document.getElementById('full-name')?.value || '',
    address: document.getElementById('address')?.value || '',
    city: document.getElementById('city')?.value || '',
    phone: document.getElementById('phone')?.value || '',
    payment: document.querySelector('input[name="payment"]:checked')?.value || 'cod',
  };

  const orderSummary = cart.map(
    (item) => `${item.name} (x${item.quantity}) - ₱${(item.price * item.quantity).toFixed(2)}`
  );
  const totalAmount = document.getElementById('cart-total')?.textContent || '';

  console.log('--- NEW ORDER ---');
  console.log('Buyer:', buyerDetails);
  console.log('Items:', orderSummary);
  console.log('Total:', totalAmount);

  alert(`Order Placed Successfully!

Thank you, ${buyerDetails.name}!
Your order will be shipped to: ${buyerDetails.address}, ${buyerDetails.city}
Total: ${totalAmount}`);

  closeCheckout();
  cart = [];
  updateCartDisplay();
  document.getElementById('checkout-form')?.reset();
}

// Initialize cart display once DOM is parsed
document.addEventListener('DOMContentLoaded', updateCartDisplay);
