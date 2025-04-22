import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsView from './ProductsView';
import ProductForm from './ProductForm';
import { getProducts, addProduct, updateProduct, deleteProduct, getProductById } from './productsData';

const ProductsIndex = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Error loading products: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (productData, id) => {
        try {
            setLoading(true);
            if (id) {
                await updateProduct(id, productData);
            } else {
                await addProduct(productData);
            }
            await loadProducts();
            return true;
        } catch (err) {
            setError('Error saving product: ' + err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteProduct(id);
            await loadProducts();
        } catch (err) {
            setError('Error deleting product: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Routes>
            <Route 
                path="/" 
                element={<ProductsView 
                    products={products} 
                    loading={loading} 
                    error={error} 
                    onDelete={handleDelete} 
                />} 
            />
            <Route 
                path="/new" 
                element={<ProductForm 
                    onSave={handleSave} 
                    getProduct={getProductById} 
                />} 
            />
            <Route 
                path="/edit/:id" 
                element={<ProductForm 
                    onSave={handleSave} 
                    getProduct={getProductById} 
                />} 
            />
        </Routes>
    );
};

export default ProductsIndex;