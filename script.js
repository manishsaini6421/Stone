// SCRIPT.JS - Main Application Logic
// This file handles all JavaScript functionality

// Render product gallery
function renderGallery(filter = 'all') {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    const filtered = getProductsByCategory(filter);
    
    filtered.forEach(product => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <div class="gallery-item-image">${product.icon}</div>
            <div class="gallery-item-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <a href="https://wa.me/919828132854?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}" class="btn" target="_blank">Inquire Now</a>
            </div>
        `;
        gallery.appendChild(div);
    });
}

// Filter products by category
function filterProducts(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderGallery(category);
}

// Show admin panel with password protection
function showAdminPanel() {
    const password = prompt('Enter admin password:');
    if (password === '123456') {
        document.getElementById('adminPanel').classList.add('active');
        renderAdminList();
    } else if (password !== null) {
        alert('Incorrect password!');
    }
}

// Hide admin panel
function hideAdminPanel() {
    document.getElementById('adminPanel').classList.remove('active');
}

// Render admin products list for management
function renderAdminList() {
    const list = document.getElementById('adminProductsList');
    list.innerHTML = '';
    
    getAllProducts().forEach(product => {
        const div = document.createElement('div');
        div.style.cssText = 'background: var(--light-color); padding: 1rem; margin: 1rem 0; border-radius: 5px; display: flex; justify-content: space-between; align-items: center;';
        div.innerHTML = `
            <div>
                <strong>${product.icon} ${product.name}</strong><br>
                <small>${product.description}</small>
            </div>
            <button onclick="deleteProductAdmin(${product.id})" style="background-color: #d9534f; padding: 0.5rem 1rem;">Delete</button>
        `;
        list.appendChild(div);
    });
}

// Delete product from admin panel
function deleteProductAdmin(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(id);
        renderGallery();
        renderAdminList();
        alert('Product deleted successfully!');
    }
}

// Handle product form submission
document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newProduct = {
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                description: document.getElementById('productDescription').value,
                icon: document.getElementById('productIcon').value || '🎨',
                price: document.getElementById('productPrice').value || 'On Request'
            };
            
            addProduct(newProduct);
            renderGallery();
            renderAdminList();
            clearForm();
            alert('Product added successfully! ✅');
        });
    }
});

// Clear form
function clearForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productIcon').value = '🎨';
}

// Smooth scroll to sections
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle quick contact message
function handleQuickMessage(e) {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon. ✅');
    e.target.reset();
}

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    renderGallery('all');
});