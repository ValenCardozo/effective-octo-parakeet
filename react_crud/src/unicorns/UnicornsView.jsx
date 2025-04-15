import React from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import 'primeicons/primeicons.css';
import * as Yup from 'yup';
import './UnicornsView.css';

const UnicornsView = ({
    unicorns,
    loading,
    error,
    currentUnicorn,
    isEditing,
    onEdit,
    onCancel,
    onCreate,
    onUpdate,
    onDelete
}) => {
    // Esquema de validación con Yup
    const unicornSchema = Yup.object().shape({
        name: Yup.string().required('El nombre es requerido'),
        colour: Yup.string().required('El color es requerido'),
        age: Yup.number()
            .required('La edad es requerida')
            .positive('La edad debe ser positiva')
            .integer('La edad debe ser un número entero'),
        power: Yup.string().required('El poder es requerido')
    });

    // Manejar el envío del formulario
    const handleFormSubmit = (values, { setSubmitting }) => {
        const operation = isEditing && currentUnicorn
            ? onUpdate(currentUnicorn._id, values)
            : onCreate(values);

        operation.then(() => {
            setSubmitting(false);
            onCancel();
        });
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
                    className="p-button-rounded p-button-danger p-button-sm unicorn-button unicorn-button"
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
                <Message severity="error" text={error} />
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-content-between align-items-center mb-4">
                <h1 className='unicorns-title'>Gestor de Unicornios</h1>
                <Button
                    label="Crear Nuevo Unicornio"
                    icon="pi pi-plus"
                    className="p-button-primary unicorn-button"
                    onClick={() => onEdit(null)}
                />
                <Link to="/">
                    <Button className='unicorn-button'>Volver al inicio</Button>
                </Link>
            </div>

            <div className="card unicorns-card">
                <DataTable
                    value={unicorns}
                    emptyMessage="No se encontraron unicornios"
                    loading={loading}
                    tableStyle={{ minWidth: '50rem' }}
                    className='unicorns-table'
                >
                    <Column field="name" header="Nombre" sortable />
                    <Column field="age" header="Edad" sortable />
                    <Column field="colour" header="Color" sortable />
                    <Column field="power" header="Poder" sortable />
                    <Column
                        header="Acciones"
                        body={actionsBodyTemplate}
                    />
                </DataTable>
            </div>

            <Dialog
                header={isEditing ? 'Editar Unicornio' : 'Crear Unicornio'}
                visible={isEditing}
                style={{ width: '50vw' }}
                onHide={onCancel}
                modal
                className='unicorns-dialog'
            >
                <Formik
                    initialValues={{
                        _id: currentUnicorn?._id || '',
                        name: currentUnicorn?.name || '',
                        colour: currentUnicorn?.colour || '',
                        age: currentUnicorn?.age || '',
                        power: currentUnicorn?.power || ''
                    }}
                    validationSchema={unicornSchema}
                    onSubmit={handleFormSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form className="p-fluid unicorns-form-label">
                            <div className="field">
                                <label htmlFor="name">Nombre</label>
                                <Field
                                    as={InputText}
                                    id="name"
                                    name="name"
                                    placeholder="Nombre del unicornio"
                                    className='unicorns-form-input'
                                />
                                <ErrorMessage name="name" component="small" className="p-error unicorns-error-message" />
                            </div>

                            <div className="field">
                                <label htmlFor="colour">Color</label>
                                <Field
                                    as={InputText}
                                    id="colour"
                                    name="colour"
                                    placeholder="Color del unicornio"
                                    className='unicorns-form-input'
                                />
                                <ErrorMessage name="colour" component="small" className="p-error unicorns-error-message" />
                            </div>

                            <div className="field">
                                <label htmlFor="age">Edad</label>
                                <Field
                                    as={InputText}
                                    id="age"
                                    name="age"
                                    placeholder="Edad del unicornio"
                                    keyfilter="int"
                                    className='unicorns-form-input'
                                />
                                <ErrorMessage name="age" component="small" className="p-error unicorns-error-message" />
                            </div>

                            <div className="field">
                                <label htmlFor="power">Poder</label>
                                <Field
                                    as={InputText}
                                    id="power"
                                    name="power"
                                    placeholder="Poder del unicornio"
                                    className='unicorns-form-input'
                                />
                                <ErrorMessage name="power" component="small" className="p-error unicorns-error-message" />
                            </div>


                            <div className="flex justify-content-end gap-2 mt-4">
                                <Button
                                    label="Cancelar"
                                    icon="pi pi-times"
                                    className="p-button-secondary unicorn-button"
                                    onClick={onCancel}
                                />
                                <Button
                                    type="submit"
                                    label={isEditing ? 'Actualizar' : 'Crear'}
                                    icon="pi pi-check"
                                    className="p-button-primary unicorn-button"
                                    loading={isSubmitting}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

export default UnicornsView;