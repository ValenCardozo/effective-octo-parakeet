import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { ProgressSpinner } from 'primereact/progressspinner';
import * as Yup from 'yup';

const ProductForm = ({ onSave, getProduct }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        category: '',
        stock: 0,
    });
    const [loading, setLoading] = useState(false);

    const categories = [
        { label: 'Electrónica', value: 'electronics' },
        { label: 'Hogar', value: 'home' },
        { label: 'Ropa', value: 'clothing' },
        { label: 'Alimentos', value: 'food' },
        { label: 'Libros', value: 'books' },
    ];

    const productSchema = Yup.object().shape({
        name: Yup.string().required('El nombre es requerido'),
        price: Yup.number()
            .required('El precio es requerido')
            .positive('El precio debe ser positivo'),
        category: Yup.string().required('La categoría es requerida'),
        stock: Yup.number()
            .required('El stock es requerido')
            .integer('El stock debe ser un número entero')
            .min(0, 'El stock no puede ser negativo'),
    });

    useEffect(() => {
        if (id && id !== 'new') {
            setLoading(true);
            try {
                const foundProduct = getProduct(id);
                if (foundProduct) {
                    setProduct(foundProduct);
                }
            } catch (error) {
                console.error('Error al cargar el producto:', error);
            } finally {
                setLoading(false);
            }
        }
    }, [id, getProduct]);

    const handleSubmit = (values, { setSubmitting }) => {
        onSave(values, id !== 'new' ? id : null)
            .then(() => {
                navigate('/products');
            })
            .catch((error) => {
                console.error('Error al guardar el producto:', error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    if (loading) {
        return (
            <div className="flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <ProgressSpinner style={{ width: '50px', height: '50px', stroke: 'var(--primary-color)' }} />
            </div>
        );
    }

    const headerContent = (
        <div className="flex align-items-center gap-2 mb-3">
            <i className={`pi ${id !== 'new' ? 'pi-pencil' : 'pi-plus-circle'}`} 
               style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}></i>
            <h2 className="m-0">{id === 'new' ? 'Crear Nuevo Producto' : 'Editar Producto'}</h2>
        </div>
    );

    return (
        <div className="p-fluid p-formgrid p-grid p-4">
            <Card className="shadow-4 border-round-xl" header={headerContent}>
                <Formik
                    initialValues={product}
                    validationSchema={productSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className="field mb-4">
                                <label htmlFor="name" className="font-medium text-900">Nombre</label>
                                <span className="p-input-icon-left w-full">
                                    <i className="pi pi-tag" />
                                    <Field
                                        as={InputText}
                                        id="name"
                                        name="name"
                                        placeholder="Nombre del producto"
                                        className="p-inputtext-lg"
                                    />
                                </span>
                                <ErrorMessage name="name" component="small" className="p-error block mt-1" />
                            </div>

                            <div className="grid">
                                <div className="col-12 md:col-6 field mb-4">
                                    <label htmlFor="price" className="font-medium text-900">Precio</label>
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-dollar" />
                                        <InputNumber
                                            id="price"
                                            name="price"
                                            mode="currency"
                                            currency="USD"
                                            locale="en-US"
                                            value={values.price}
                                            onValueChange={(e) => setFieldValue('price', e.value)}
                                            className="p-inputtext-lg"
                                            min={0}
                                        />
                                    </span>
                                    <ErrorMessage name="price" component="small" className="p-error block mt-1" />
                                </div>

                                <div className="col-12 md:col-6 field mb-4">
                                    <label htmlFor="stock" className="font-medium text-900">Stock</label>
                                    <span className="p-input-icon-left w-full">
                                        <i className="pi pi-inbox" />
                                        <InputNumber
                                            id="stock"
                                            name="stock"
                                            value={values.stock}
                                            onValueChange={(e) => setFieldValue('stock', e.value)}
                                            showButtons
                                            min={0}
                                            className="p-inputtext-lg"
                                        />
                                    </span>
                                    <ErrorMessage name="stock" component="small" className="p-error block mt-1" />
                                </div>
                            </div>

                            <div className="field mb-4">
                                <label htmlFor="category" className="font-medium text-900">Categoría</label>
                                <Dropdown
                                    id="category"
                                    name="category"
                                    options={categories}
                                    value={values.category}
                                    onChange={(e) => setFieldValue('category', e.value)}
                                    placeholder="Selecciona una categoría"
                                    className="p-inputtext-lg"
                                />
                                <ErrorMessage name="category" component="small" className="p-error block mt-1" />
                            </div>

                            <Divider />

                            <div className="flex justify-content-end gap-2 pt-2">
                                <Button
                                    label="Cancelar"
                                    icon="pi pi-times"
                                    className="p-button-secondary"
                                    onClick={() => navigate('/products')}
                                    type="button"
                                    style={{
                                        borderRadius: '8px',
                                        transition: 'all 0.2s ease',
                                    }}
                                />
                                <Button
                                    type="submit"
                                    label="Guardar"
                                    icon="pi pi-check"
                                    className="p-button-primary"
                                    loading={isSubmitting}
                                    style={{
                                        borderRadius: '8px',
                                        boxShadow: '0 1px 3px rgba(99, 102, 241, 0.3)',
                                        transition: 'all 0.2s ease',
                                    }}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default ProductForm;