import React, { useState, useEffect, useContext } from 'react';
import UnicornsView from './UnicornsView';
import ApiErrorPage from '../ApiErrorPage';
import { UnicornContext } from '../context/UnicornContext';

const API_URL = 'https://crudcrud.com/api/584d28c9e7824001a9f37634bd81f630/unicorns';

const UnicornsContainer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUnicorn, setCurrentUnicorn] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const {unicorns, getUnicorns} = useContext(UnicornContext)

    // Obtener todos los unicornios
    const fetchUnicorns = async () => {
        try {
            setLoading(true);
            getUnicorns()
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Crear un nuevo unicornio
    const createUnicorn = async (unicornData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: unicornData.name,
                    age: unicornData.age,
                    colour: unicornData.colour,
                    power: unicornData.power
                }),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            const newUnicorn = await response.json();
            UnicornContext.setUnicorns(prev => [...prev, newUnicorn]);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    // Actualizar un unicornio
    const updateUnicorn = async (id, unicornData) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: unicornData.name,
                    age: unicornData.age,
                    colour: unicornData.colour,
                    power: unicornData.power
                }),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            await fetchUnicorns();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    // Eliminar un unicornio
    const deleteUnicorn = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            UnicornContext.setUnicorns(prev => prev.filter(u => u._id !== id));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

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

    // Cargar los datos al montar el componente
    useEffect(() => {
        fetchUnicorns();
    }, []);

    if (error) {
        return <ApiErrorPage error={error}/>;
    }

    return (
        <UnicornsView
            unicorns={unicorns}
            loading={loading}
            error={error}
            currentUnicorn={currentUnicorn}
            isEditing={isEditing}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onCreate={createUnicorn}
            onUpdate={updateUnicorn}
            onDelete={deleteUnicorn}
        />
    );
};

export default UnicornsContainer;