import React, { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import UnicornsView from './UnicornsView';
import { UnicornContext, UnicornProvider } from '../context/UnicornContext';

const UnicornsIndex = () => {
    return (
        <UnicornProvider>
            <UnicornsRouter />
        </UnicornProvider>
    );
};

const UnicornsRouter = () => {
    const { unicorns, loading, error, createUnicorn, editUnicorn, deleteUnicorn } = useContext(UnicornContext);
    const [currentUnicorn, setCurrentUnicorn] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Handler para editar
    const handleEdit = (unicorn) => {
        setCurrentUnicorn(unicorn);
        setIsEditing(true);
    };

    // Handler para cancelar edición
    const handleCancel = () => {
        setCurrentUnicorn(null);
        setIsEditing(false);
    };

    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <UnicornsView
                        unicorns={unicorns}
                        loading={loading}
                        error={error}
                        currentUnicorn={currentUnicorn}
                        isEditing={isEditing}
                        onEdit={handleEdit}
                        onCancel={handleCancel}
                        onCreate={createUnicorn}
                        onUpdate={editUnicorn}
                        onDelete={deleteUnicorn}
                    />
                } 
            />
        </Routes>
    );
};

export default UnicornsIndex;