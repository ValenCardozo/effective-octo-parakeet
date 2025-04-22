import { createContext, useState, useEffect } from "react";

const API_URL = 'https://crudcrud.com/api/c74a2d63a6b5452cacd7d0c23dcbd137/unicorns';

export const UnicornContext = createContext();

export const UnicornProvider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get all unicorns
    const getUnicorns = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            const data = await response.json();
            setUnicorns(data);
            setError(null);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Get a unicorn by ID
    const getUnicornById = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${id}`);

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            const data = await response.json();
            setError(null);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Create a new unicorn
    const createUnicorn = async (unicornData) => {
        try {
            setLoading(true);
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
            setError(null);
            return newUnicorn;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update a unicorn (renamed from updateUnicorn to editUnicorn as requested)
    const editUnicorn = async (id, unicornData) => {
        try {
            setLoading(true);
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

            // Actualizar localmente el unicornio editado (en lugar de obtener todos nuevamente)
            setUnicorns(prev => 
                prev.map(unicorn => unicorn._id === id 
                    ? { ...unicorn, ...unicornData } 
                    : unicorn
                )
            );
            
            setError(null);
            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete a unicorn
    const deleteUnicorn = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            setUnicorns(prev => prev.filter(u => u._id !== id));
            setError(null);
            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Load unicorns on mount
    useEffect(() => {
        getUnicorns();
    }, []);

    return (
        <UnicornContext.Provider value={{ 
            unicorns, 
            setUnicorns,
            loading,
            error,
            getUnicorns,
            createUnicorn,
            editUnicorn,
            deleteUnicorn 
        }}>
            {children}
        </UnicornContext.Provider>
    );
};
