// SCRIPT.JS - Main Application Logic with Image Upload

// Render product gallery
function renderGallery(filter = 'all') {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    const filtered = getProductsByCategory(filter);
    
    filtered.forEach(product => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        
        // Check if product has an image URL or use icon
        const imageContent = product.imageUrl ? 
            `<img src="${product.imageUrl}" alt="${product.name}" class="gallery-item-img">` :
            `<div class="gallery-item-image">${product.icon}</div>`;
        
        div.innerHTML = `
            ${imageContent}
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
    if (password === 'Stoneadmin@123') {
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
        div.style.cssText = 'background: var(--light-color); padding: 1rem; margin: 1rem 0; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;';
        
        const hasImage = product.imageUrl ? '🖼️' : '🎨';
        
        div.innerHTML = `
            <div style="flex: 1; min-width: 200px;">
                <strong>${hasImage} ${product.name}</strong><br>
                <small>${product.description}</small><br>
                <small style="color: #666;">Category: ${product.category} | Price: ${product.price}</small>
                ${product.imageUrl ? `<br><small style="color: #FF8C00;"><strong>✓ Image uploaded</strong></small>` : ''}
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="editProduct(${product.id})" style="background-color: #FF8C00; padding: 0.5rem 1rem; color: white; border: none; border-radius: 4px; cursor: pointer;">Edit</button>
                <button onclick="deleteProductAdmin(${product.id})" style="background-color: #d9534f; padding: 0.5rem 1rem; color: white; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}

// Edit product
function editProduct(id) {
    const product = getProductById(id);
    if (!product) return;
    
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productIcon').value = product.icon;
    document.getElementById('productPrice').value = product.price;
    
    // Show current image if exists
    if (product.imageUrl) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = `
            <div style="margin-top: 1rem; text-align: center;">
                <img src="${product.imageUrl}" style="max-width: 150px; border-radius: 5px; margin-bottom: 0.5rem;">
                <p><small>Current image</small></p>
            </div>
        `;
    }
    
    // Store edit ID
    document.getElementById('productForm').dataset.editId = id;
    document.getElementById('submitBtn').textContent = 'Update Product';
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

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;
        document.getElementById('productForm').dataset.imageUrl = imageUrl;
        
        // Show preview
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = `
            <div style="margin-top: 1rem; text-align: center;">
                <img src="${imageUrl}" style="max-width: 150px; border-radius: 5px; margin-bottom: 0.5rem;">
                <p><small>Preview - Ready to upload</small></p>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

// Handle product form submission
document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const imageUpload = document.getElementById('productImage');
    
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }
    
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const editId = productForm.dataset.editId;
            const imageUrl = productForm.dataset.imageUrl;
            
            if (editId) {
                // Update existing product
                const updatedProduct = {
                    name: document.getElementById('productName').value,
                    category: document.getElementById('productCategory').value,
                    description: document.getElementById('productDescription').value,
                    icon: document.getElementById('productIcon').value || '🎨',
                    price: document.getElementById('productPrice').value || 'On Request'
                };
                
                if (imageUrl) {
                    updatedProduct.imageUrl = imageUrl;
                }
                
                updateProduct(parseInt(editId), updatedProduct);
                delete productForm.dataset.editId;
                alert('Product updated successfully! ✅');
            } else {
                // Add new product
                const newProduct = {
                    name: document.getElementById('productName').value,
                    category: document.getElementById('productCategory').value,
                    description: document.getElementById('productDescription').value,
                    icon: document.getElementById('productIcon').value || '🎨',
                    price: document.getElementById('productPrice').value || 'On Request',
                    imageUrl: imageUrl || null
                };
                
                addProduct(newProduct);
                alert('Product added successfully! ✅');
            }
            
            renderGallery();
            renderAdminList();
            clearForm();
            document.getElementById('imagePreview').innerHTML = '';
        });
    }
});

// Clear form
function clearForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productIcon').value = '🎨';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('productForm').dataset.editId = '';
    document.getElementById('productForm').dataset.imageUrl = '';
    document.getElementById('submitBtn').textContent = 'Add Product';
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