import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Bienvenido al Sistema de Unicornios</h1>
            <Link to="/unicorns">
                <button>Ir a Mis Unicornios</button>
            </Link>
        </div>
    );
};

export default Home;