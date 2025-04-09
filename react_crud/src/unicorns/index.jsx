import React from 'react';
import UnicornsContainer from './UnicornsContainer';
import { useParams } from 'react-router-dom';

const UnicornsIndex = () => {
    const { id } = useParams(); // Capturamos el parámetro de ruta si existe

    return (
        <div className="unicorns-module">
            {/* Pasamos el id al contenedor si existe en la ruta */}
            <UnicornsContainer unicornId={id} />
        </div>
    );
};

export default UnicornsIndex;