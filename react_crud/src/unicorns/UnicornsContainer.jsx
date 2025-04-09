import React, { useState, useEffect } from 'react';
import UnicornsView from './UnicornsView';
import ApiErrorPage from '../ApiErrorPage';

const API_URL = 'https://crudcrud.com/api/39adb21e1ba74a0f87740298af3764bc/unicorns';

const UnicornsContainer = () => {
    const [unicorns, setUnicorns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUnicorn, setCurrentUnicorn] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Obtener todos los unicornios
    const fetchUnicorns = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            const data = await response.json();
            setUnicorns(data);
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
            setUnicorns(prev => [...prev, newUnicorn]);
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

            setUnicorns(prev => prev.filter(u => u._id !== id));
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