import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import * as Yup from 'yup';
import { useUnicornForm } from './useUnicornForm';

const UnicornForm = ({ currentUnicorn, onSubmit, onCancel }) => {
    const { initialValues, validationSchema } = useUnicornForm(currentUnicorn);
    
    const handleFormSubmit = (values, { setSubmitting }) => {
        onSubmit(values)
            .then(() => {
                setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
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
                            type="button"
                        />
                        <Button
                            type="submit"
                            label={currentUnicorn ? 'Actualizar' : 'Crear'}
                            icon="pi pi-check"
                            className="p-button-primary unicorn-button"
                            loading={isSubmitting}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UnicornForm;