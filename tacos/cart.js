// ==================== cart.js ====================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price, img = '') {
    const existing = cart.find(item => item.name === name);
    
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({
            name: name,
            price: parseFloat(price.replace('$', '')),
            quantity: 1,
            img: img
        });
    }
    
    saveCart();
    updateCartCount();
    
    // Notificación
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#4CAF50;color:white;padding:15px 25px;border-radius:8px;z-index:10000;';
    notif.textContent = `${name} agregado ✓`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

function updateCartCount() {
    document.querySelectorAll('.cart-count').forEach(el => {
        const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        el.textContent = total;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    if (typeof renderCart === 'function') renderCart();
}

// Hacer funciones globales
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartCount = updateCartCount;