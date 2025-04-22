import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';

const ProductsView = ({ products, loading, error, onEdit, onDelete }) => {
    if (loading) {
        return (
            <div className="flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <ProgressSpinner style={{ width: '50px', height: '50px', stroke: 'var(--primary-color)' }} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="alert alert-error">
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: '1.5rem' }}></i>
                    <div>
                        <h3>Error</h3>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const actionsBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Link to={`/products/edit/${rowData.id}`}>
                    <Button
                        icon="pi pi-pencil"
                        className="p-button-rounded p-button-success p-button-sm"
                        tooltip="Editar"
                        tooltipOptions={{ position: 'top' }}
                    />
                </Link>
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-button-sm"
                    onClick={() => onDelete(rowData.id)}
                    tooltip="Eliminar"
                    tooltipOptions={{ position: 'top' }}
                />
            </div>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <span className="font-semibold text-lg">
                ${rowData.price.toFixed(2)}
            </span>
        );
    };

    const stockBodyTemplate = (rowData) => {
        let severity = 'success';
        if (rowData.stock <= 5) {
            severity = 'danger';
        } else if (rowData.stock <= 20) {
            severity = 'warning';
        }

        return (
            <div className="flex align-items-center">
                <Badge 
                    value={rowData.stock} 
                    severity={severity} 
                    size="large"
                />
                <span className="ml-2">unidades</span>
            </div>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        const categoryColors = {
            'electronics': 'info',
            'home': 'success',
            'clothing': 'warning',
            'food': 'danger',
            'books': 'primary'
        };

        const categoryLabels = {
            'electronics': 'Electrónica',
            'home': 'Hogar',
            'clothing': 'Ropa',
            'food': 'Alimentos',
            'books': 'Libros'
        };

        return (
            <Tag 
                value={categoryLabels[rowData.category] || rowData.category} 
                severity={categoryColors[rowData.category] || 'info'} 
            />
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center">
                <span className="font-bold">{rowData.name}</span>
            </div>
        );
    };

    // Footer de la tabla que muestra el total de productos
    const footer = `Total de ${products.length} producto${products.length !== 1 ? 's' : ''} registrado${products.length !== 1 ? 's' : ''}.`;

    return (
        <div className="p-4">
            <div className="page-header">
                <h1 style={{ 
                    position: 'relative', 
                    display: 'inline-block',
                    color: '#1e293b',
                    fontWeight: '600' 
                }}>
                    Catálogo de Productos
                    <div 
                        style={{ 
                            content: '',
                            position: 'absolute',
                            width: '50%',
                            height: '4px',
                            background: 'var(--primary-color)',
                            bottom: '-8px',
                            left: '0',
                            borderRadius: '2px'
                        }}
                    ></div>
                </h1>
                <div className="action-buttons">
                    <Link to="/products/new">
                        <Button
                            label="Crear Nuevo Producto"
                            icon="pi pi-plus"
                            className="p-button-primary"
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 1px 3px rgba(99, 102, 241, 0.3)',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    </Link>
                    <Link to="/">
                        <Button 
                            icon="pi pi-home" 
                            label="Volver al inicio" 
                            className="p-button-secondary"
                            style={{
                                borderRadius: '8px',
                                transition: 'all 0.2s ease',
                            }}
                        />
                    </Link>
                </div>
            </div>

            <div className="card" style={{
                borderRadius: '12px',
                boxShadow: 'var(--shadow)',
                transition: 'var(--transition)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)'
            }}>
                <DataTable
                    value={products}
                    emptyMessage="No se encontraron productos"
                    loading={loading}
                    tableStyle={{ minWidth: '50rem' }}
                    footer={footer}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    sortField="name"
                    sortOrder={1}
                    stripedRows
                    className="product-table"
                >
                    <Column field="name" header="Nombre" body={nameBodyTemplate} sortable />
                    <Column field="price" header="Precio" body={priceBodyTemplate} sortable />
                    <Column field="category" header="Categoría" body={categoryBodyTemplate} sortable />
                    <Column field="stock" header="Stock" body={stockBodyTemplate} sortable />
                    <Column
                        header="Acciones"
                        body={actionsBodyTemplate}
                        style={{ width: '10rem', textAlign: 'center' }}
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default ProductsView;