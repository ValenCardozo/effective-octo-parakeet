import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';

const ApiErrorPage = ({ error, onRetry }) => {
    return (
        <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className="w-9 md:w-6 lg:w-4" style={{ textAlign: 'center' }}>
                <div className="flex flex-column align-items-center">
                    <i className="pi pi-exclamation-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h1 className="text-2xl font-bold mt-3">¡Error de Conexión!</h1>
                    <p className="mt-2 text-color-secondary">No pudimos conectarnos con el servidor de Unicornios</p>

                    <div className="mt-4 p-3 border-round" style={{ background: 'var(--surface-100)' }}>
                        <code>{error}</code>
                    </div>

                    <Link to="/">
                        <Button className='unicorn-button'>Volver al inicio</Button>
                    </Link>
                    <div className="mt-4 text-sm">
                        <p>Si el problema persiste, contacta al equipo técnico</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ApiErrorPage;