import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import 'primeicons/primeicons.css';
import './UnicornsView.css';
import UnicornForm from './UnicornForm';

const UnicornsView = ({
    unicorns,
    loading,
    error,
    currentUnicorn,
    isEditing,
    onEdit,
    onCancel,
    onCreate,
    onUpdate, // Esta prop debería ser editUnicorn, pero mantenemos el nombre para no cambiar la interfaz
    onDelete
}) => {
    // Determinar qué función utilizar para el envío del formulario
    const handleFormSubmit = (values) => {
        const operation = currentUnicorn?._id
            ? onUpdate(currentUnicorn._id, values) // Usar editUnicorn aquí
            : onCreate(values);
        
        return operation;
    };

    // Generar color pastel basado en el nombre del unicornio
    const generatePastelColor = (name) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        // Generar valores RGB en el rango pastel (200-240)
        const r = ((hash & 0xFF) % 40) + 200;
        const g = (((hash >> 8) & 0xFF) % 40) + 200;
        const b = (((hash >> 16) & 0xFF) % 40) + 200;
        
        return `rgb(${r}, ${g}, ${b})`;
    };

    // Template para mostrar el nombre con un avatar
    const nameTemplate = (rowData) => {
        const bgColor = generatePastelColor(rowData.name);
        
        return (
            <div className="flex align-items-center gap-2">
                <Avatar
                    label={rowData.name.charAt(0).toUpperCase()}
                    shape="circle"
                    size="large"
                    style={{ backgroundColor: bgColor, color: '#1e293b' }}
                />
                <span className="font-semibold">{rowData.name}</span>
            </div>
        );
    };

    // Template para mostrar el color
    const colorTemplate = (rowData) => {
        return (
            <div className="flex align-items-center">
                <div 
                    className="border-circle mr-2" 
                    style={{ 
                        width: '1.5rem', 
                        height: '1.5rem', 
                        background: rowData.colour.toLowerCase(),
                        border: '2px solid #e2e8f0',
                        borderRadius: '50%',
                        display: 'inline-block'
                    }}
                ></div>
                {rowData.colour}
            </div>
        );
    };

    // Template para mostrar el poder como una etiqueta
    const powerTemplate = (rowData) => {
        return (
            <Tag 
                value={rowData.power} 
                severity="info" 
                className="unicorn-power"
            />
        );
    };

    // Template para la edad con pequeña descripción
    const ageTemplate = (rowData) => {
        let ageText = "Joven";
        if (rowData.age > 100) ageText = "Adulto";
        if (rowData.age > 500) ageText = "Antiguo";
        
        return (
            <div>
                <span className="font-medium">{rowData.age}</span>
                <br />
                <small className="text-color-secondary">{ageText}</small>
            </div>
        );
    };

    // Acciones para la tabla
    const actionsBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2 unicorns-container">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success p-button-sm unicorn-button"
                    onClick={() => onEdit({
                        _id: rowData._id,
                        name: rowData.name,
                        colour: rowData.colour,
                        age: rowData.age,
                        power: rowData.power
                    })}
                    tooltip="Editar"
                    tooltipOptions={{ position: 'top' }}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-button-sm unicorn-button"
                    onClick={() => onDelete(rowData._id)}
                    tooltip="Eliminar"
                    tooltipOptions={{ position: 'top' }}
                />
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <ProgressSpinner className='unicorns-spinner'/>
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

    // Footer de la tabla que muestra el total de unicornios
    const footer = `Total de ${unicorns.length} unicornio${unicorns.length !== 1 ? 's' : ''} registrado${unicorns.length !== 1 ? 's' : ''}.`;

    return (
        <div className="p-4 unicorns-view">
            <div className="page-header">
                <h1 className='unicorns-title'>Gestor de Unicornios</h1>
                <div className="action-buttons">
                    <Button
                        label="Crear Nuevo Unicornio"
                        icon="pi pi-plus"
                        className="p-button-primary unicorn-button"
                        onClick={() => onEdit(null)}
                    />
                    <Link to="/">
                        <Button className='unicorn-button p-button-secondary'>
                            <i className="pi pi-home mr-2"></i>
                            Volver al inicio
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="card unicorns-card">
                <DataTable
                    value={unicorns}
                    emptyMessage="No se encontraron unicornios"
                    loading={loading}
                    tableStyle={{ minWidth: '50rem' }}
                    className='unicorns-table'
                    footer={footer}
                    paginator 
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    sortField="name"
                    sortOrder={1}
                    stripedRows
                >
                    <Column field="name" header="Nombre" body={nameTemplate} sortable />
                    <Column field="age" header="Edad" body={ageTemplate} sortable />
                    <Column field="colour" header="Color" body={colorTemplate} sortable />
                    <Column field="power" header="Poder" body={powerTemplate} sortable />
                    <Column
                        header="Acciones"
                        body={actionsBodyTemplate}
                        style={{ width: '10rem', textAlign: 'center' }}
                    />
                </DataTable>
            </div>

            <Dialog
                header={currentUnicorn ? 'Editar Unicornio' : 'Crear Unicornio'}
                visible={isEditing}
                style={{ width: '50vw', borderRadius: '12px', overflow: 'hidden' }}
                onHide={onCancel}
                modal
                className='unicorns-dialog'
                dismissableMask
            >
                <UnicornForm 
                    currentUnicorn={currentUnicorn}
                    onSubmit={handleFormSubmit}
                    onCancel={onCancel}
                />
            </Dialog>
        </div>
    );
};

export default UnicornsView;