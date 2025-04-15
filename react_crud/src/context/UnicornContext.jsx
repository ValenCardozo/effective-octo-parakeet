import { createContext, useState, useEffect, use } from "react";

const API_URL = 'https://crudcrud.com/api/584d28c9e7824001a9f37634bd81f630/unicorns';

export const UnicornContext = createContext();

export const UnicornProvider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);

    const getUnicorns = async () => {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP! estado: ${response.status}`);
        }

        const data = await response.json();
        setUnicorns(data);
    }

    useEffect(() => {
        getUnicorns();
    }, []);

    return(
        <UnicornContext.Provider value={{ unicorns, getUnicorns }}>
            {children}
        </UnicornContext.Provider>
    )
}
