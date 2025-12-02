// DATABASE.JS - Product Data Management
// This file handles all product data storage and retrieval

// Initialize products array from localStorage
let products = JSON.parse(localStorage.getItem('stoneProducts')) || [
    {
        id: 1,
        name: 'Hand-carved Stone Statue',
        category: 'statues',
        description: 'Beautiful hand-carved stone statue with intricate details. Perfect for garden or home decoration.',
        icon: '🗿',
        price: 'On Request'
    },
    {
        id: 2,
        name: 'Decorative Stone Planter',
        category: 'decorative',
        description: 'Elegant stone planter with traditional designs. Ideal for flowers and indoor plants.',
        icon: '🪴',
        price: 'On Request'
    },
    {
        id: 3,
        name: 'Garden Stone Bench',
        category: 'garden',
        description: 'Comfortable outdoor stone bench for your garden. Weather-resistant and durable.',
        icon: '🛋️',
        price: 'On Request'
    }
];

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('stoneProducts', JSON.stringify(products));
}

// Get all products
function getAllProducts() {
    return products;
}

// Get products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(p => p.category === category);
}

// Add new product
function addProduct(product) {
    const newProduct = {
        id: Date.now(),
        name: product.name,
        category: product.category,
        description: product.description,
        icon: product.icon || '🎨',
        price: product.price || 'On Request'
    };
    products.push(newProduct);
    saveProducts();
    return newProduct;
}

// Delete product
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    saveProducts();
}

// Update product
function updateProduct(id, updatedData) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        saveProducts();
        return products[index];
    }
    return null;
}

// Get product by ID
function getProductById(id) {
    return products.find(p => p.id === id);
}