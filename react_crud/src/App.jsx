import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UnicornsIndex from './unicorns';
import ProductsIndex from './products';
import Home from './Home';
import './App.css';

const App = () => {
  return (
    <Routes>
      {/* Unicorn routes - UnicornProvider se aplica dentro del componente UnicornsIndex */}
      <Route path="/unicorns/*" element={<UnicornsIndex />} />
      
      {/* Product routes */}
      <Route path="/products/*" element={<ProductsIndex />} />
      
      {/* Home route */}
      <Route path="/" element={<Home />} />
      
      {/* Redirect other routes to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;