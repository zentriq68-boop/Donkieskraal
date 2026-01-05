// Simple Cart System using LocalStorage

class CartSystem {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('donkieskraal_cart')) || [];
        this.updateCartCount();
        this.renderCart();
    }

    addItem(product) {
        // Check if item exists
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        this.updateCartCount();
        this.renderCart();

        // Open cart sidebar when adding item
        if (typeof toggleCart === 'function') {
            const sidebar = document.getElementById('cart-sidebar');
            if (sidebar && sidebar.classList.contains('translate-x-full')) {
                toggleCart();
            }
        }
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    saveCart() {
        localStorage.setItem('donkieskraal_cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        const countElements = document.querySelectorAll('.cart-count');

        countElements.forEach(el => {
            el.textContent = count;
            if (count > 0) {
                el.classList.remove('opacity-0');
                el.classList.add('opacity-100');
            } else {
                el.classList.remove('opacity-100');
                el.classList.add('opacity-0');
            }
        });
    }

    renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalContainer = document.getElementById('cart-total');
        const emptyCartState = document.getElementById('empty-cart');

        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            if (emptyCartState) emptyCartState.style.display = 'flex';
            cartItemsContainer.innerHTML = '';
            if (emptyCartState) cartItemsContainer.appendChild(emptyCartState);
            if (cartTotalContainer) cartTotalContainer.textContent = 'R 0.00';
            return;
        }

        if (emptyCartState) emptyCartState.style.display = 'none';

        cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-border-dark last:border-0">
                <div class="flex-grow">
                    <h4 class="font-bold dark:text-white">${item.name}</h4>
                    <p class="text-sm text-gray-500">${item.quantity} x R ${item.price.toFixed(2)}</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <p class="font-bold dark:text-white">R ${(item.price * item.quantity).toFixed(2)}</p>
                    <button onclick="cart.removeItem('${item.id}')" class="text-xs text-red-500 hover:text-red-600 transition-colors">Remove</button>
                </div>
            </div>
        `).join('');

        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        if (cartTotalContainer) cartTotalContainer.textContent = `R ${subtotal.toFixed(2)}`;
    }
}

const cart = new CartSystem();

// Expose to window for inline calls if needed
window.addToCart = (id, name, price) => {
    cart.addItem({ id, name, price });
};
