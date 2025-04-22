import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const Home = () => {
return (
    <div className="p-4">
        <div className="text-center my-5">
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '1rem'
            }}>
                Bienvenido al Gestor de Recursos
            </h1>
            <p className="text-xl text-color-secondary mb-5" style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-light)' }}>
                Una aplicación para gestionar unicornios mágicos y productos comerciales
            </p>
        </div>
        
        <div className="flex flex-row justify-content-center align-items-stretch" style={{ gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ flex: '1', maxWidth: '350px' }}>
                <Card className="shadow-4 border-round-xl w-full transition-all transition-duration-300" 
                            style={{ 
                                borderTop: '6px solid var(--primary-color)',
                                transform: 'translateY(0)',
                                transition: 'all 0.3s ease',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
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
            
            <div style={{ flex: '1', maxWidth: '350px' }}>
                <Card className="shadow-4 border-round-xl w-full" 
                            style={{ 
                                borderTop: '6px solid var(--success-color)',
                                transform: 'translateY(0)',
                                transition: 'all 0.3s ease',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
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
        
        <div className="mt-6 p-4 border-round-xl text-center glass-effect" 
                 style={{ 
                     background: 'rgba(255, 255, 255, 0.7)',
                     backdropFilter: 'blur(10px)',
                     border: '1px solid rgba(255, 255, 255, 0.18)',
                     boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                     maxWidth: '1200px',
                     margin: '0 auto'
                 }}>
            <h3 className="text-xl mb-2">¿Necesitas ayuda?</h3>
            <p className="mb-0">
                Esta aplicación fue desarrollada como proyecto de demostración con React y PrimeReact.
                Explora cada sección para ver las funcionalidades CRUD implementadas.
            </p>
        </div>
    </div>
);
};

export default Home;