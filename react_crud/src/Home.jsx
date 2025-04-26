import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Home = () => {
return (
    <div className="p-4">
        <div className="text-center my-6">
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '1rem'
            }}>
                Bienvenido al Gestor de Recursos
            </h1>
            <p className="text-xl text-color-secondary mb-5" style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-light)' }}>
                Una aplicación para gestionar unicornios mágicos y productos magicos
            </p>
        </div>

        <div className="col-12 md:col-5" style={{ maxWidth: '800px', margin: '2% auto' }}>
            <div className="flex flex-row gap-4 justify-content-center">
                <div className="col-6" style={{ minWidth: '300px' }}></div>
                    <Card className="shadow-4 border-round-xl w-full transition-all transition-duration-300" 
                        style={{ 
                            borderTop: '6px solid var(--primary-color)',
                            transform: 'translateY(0)',
                            transition: 'all 0.3s ease',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div className="flex flex-column align-items-center text-center h-full">
                            <div className="bg-primary border-circle p-3 mb-3" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                                <i className="pi pi-heart text-4xl text-primary" style={{ color: 'var(--primary-color)' }}></i>
                            </div>
                            <h2 className="text-xl font-bold mb-2">Gestión de Unicornios</h2>
                            <p className="mb-3 line-height-3 text-sm">
                                Administra tu colección de unicornios mágicos. Crea nuevos unicornios, edita sus características, 
                                y mantén un registro de todos ellos.
                            </p>
                            <div className="mt-auto w-full pt-3">
                                <Link to="/unicorns" className="w-full block">
                                    <Button label="Ir a Unicornios" icon="pi pi-arrow-right" iconPos="right" className="p-button-primary w-full" />
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
                
            <div className="col-6" style={{ minWidth: '300px' }}>
                    <Card className="shadow-4 border-round-xl w-full" 
                        style={{ 
                            borderTop: '6px solid var(--success-color)',
                            transform: 'translateY(0)',
                            transition: 'all 0.3s ease',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div className="flex flex-column align-items-center text-center h-full">
                            <div className="border-circle p-3 mb-3" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                                <i className="pi pi-shopping-cart text-4xl" style={{ color: 'var(--success-color)' }}></i>
                            </div>
                            <h2 className="text-xl font-bold mb-2">Catálogo de Productos</h2>
                            <p className="mb-3 line-height-3 text-sm">
                                Gestiona el inventario de productos comerciales. Añade nuevos productos, 
                                actualiza precios, controla el stock y organiza por categorías.
                            </p>
                            <div className="mt-auto w-full pt-3">
                                <Link to="/products" className="w-full block">
                                    <Button label="Ir a Productos" icon="pi pi-arrow-right" iconPos="right" className="p-button-success w-full" />
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
);
};

export default Home;