// Local storage key for products
const PRODUCTS_STORAGE_KEY = 'app_products_data';

// Initial sample data
const initialProducts = [
    {
        id: '1',
        name: 'Smartphone XYZ',
        price: 599.99,
        category: 'electronics',
        stock: 35
    },
    {
        id: '2',
        name: 'Laptop Pro',
        price: 1299.99,
        category: 'electronics',
        stock: 12
    },
    {
        id: '3',
        name: 'Coffee Maker',
        price: 89.99,
        category: 'home',
        stock: 20
    },
    {
        id: '4',
        name: 'Denim Jeans',
        price: 49.99,
        category: 'clothing',
        stock: 50
    }
];

// Load products from localStorage or initialize with sample data
const loadFromStorage = () => {
    try {
        const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : initialProducts;
    } catch (error) {
        console.error('Error loading products from storage:', error);
        return initialProducts;
    }
};

// Save products to localStorage
const saveToStorage = (products) => {
    try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
        console.error('Error saving products to storage:', error);
    }
};

// Generate a unique ID for new products
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all products
export const getProducts = async () => {
    return Promise.resolve(loadFromStorage());
};

// Get a product by ID
export const getProductById = (id) => {
    const products = loadFromStorage();
    return products.find(product => product.id === id);
};

// Add a new product
export const addProduct = async (productData) => {
    const products = loadFromStorage();
    const newProduct = {
        ...productData,
        id: generateId()
    };
    
    products.push(newProduct);
    saveToStorage(products);
    return Promise.resolve(newProduct);
};

// Update an existing product
export const updateProduct = async (id, productData) => {
    const products = loadFromStorage();
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) {
        throw new Error(`Product with id ${id} not found`);
    }
    
    products[index] = { ...productData, id };
    saveToStorage(products);
    return Promise.resolve(products[index]);
};

// Delete a product
export const deleteProduct = async (id) => {
    const products = loadFromStorage();
    const filteredProducts = products.filter(product => product.id !== id);
    
    if (products.length === filteredProducts.length) {
        throw new Error(`Product with id ${id} not found`);
    }
    
    saveToStorage(filteredProducts);
    return Promise.resolve(true);
};