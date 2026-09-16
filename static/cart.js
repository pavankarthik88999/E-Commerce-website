


// Load the cart from browser memory, or create an empty array if none exists
let cart = JSON.parse(localStorage.getItem('cart')) || []; 


// 1. Add to Cart (Used on index.html)
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: parseFloat(productPrice) });
    
    // Save the updated cart back to browser memory
    localStorage.setItem('cart', JSON.stringify(cart)); 
    
    // Update the button text if it exists on the current page
    const cartBtn = document.getElementById('cart_control');
    if (cartBtn) {
        cartBtn.innerText = `Cart (${cart.length})`;
    }
    
    alert(`${productName} added to cart!`);
}

// 2. Render Cart (Used on cart.html)
function renderCart() {
    const container = document.getElementById('cart_items_container');
    const totalDisplay = document.getElementById('cart_total');
    
    // Safety check: Only run this if we are actually on the cart.html page
    if (!container) return; 

    container.innerHTML = ''; 
    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is currently empty.</p>';
    } else {
        cart.forEach((item, index) => {
            totalPrice += item.price;
            container.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });
    }
    totalDisplay.innerText = totalPrice;
    console.log("Cart rendered. Total price: ₹" + totalPrice);
}

// 3. Remove Item from Cart
function removeFromCart(indexToRemove) {
    cart.splice(indexToRemove, 1); 
    
    // Save the new array to browser memory after deleting the item
    localStorage.setItem('cart', JSON.stringify(cart)); 
    
    renderCart(); // Re-draw the screen
}

// 4. Checkout Logic
const checkoutBtn = document.getElementById('checkout_btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert("Add some items to your cart first!");
        } else {
            alert("Thank you for your purchase!");
            cart = []; 
            localStorage.setItem('cart', JSON.stringify(cart)); // Clear browser memory
            renderCart();
        }
    });
}

// 5. Auto-run renderCart when the page loads
window.addEventListener('DOMContentLoaded', function() {
    renderCart();
    
    // Also auto-update the Cart button number on index.html if it exists
    const cartBtn = document.getElementById('cart_control');
    if (cartBtn) {
        cartBtn.innerText = `Cart (${cart.length})`;
    }
});