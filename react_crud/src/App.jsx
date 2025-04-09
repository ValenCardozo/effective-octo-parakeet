import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UnicornsIndex from './unicorns';
import Home from './Home';
import './App.css';

const App = () => {
  return (
    <Routes>
      {/* Ruta para la lista completa de unicornios */}
      <Route path="/unicorns" element={<UnicornsIndex />} />

      {/* Ruta para detalles de un unicornio específico */}
      <Route path="/unicorns/:id" element={<UnicornsIndex />} />

      {/* Ruta de inicio */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;