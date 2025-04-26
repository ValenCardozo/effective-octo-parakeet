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
        { label: 'Pociones', value: 'pociones' },
        { label: 'Armas', value: 'armas' },
        { label: 'Accesorios', value: 'accesorios' },
        { label: 'Contenedores', value: 'contenedores' },
        { label: 'Vestimenta', value: 'vestimenta' }
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
        <div className="p-fluid p-formgrid p-grid p-4"
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '2rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Card className="shadow-4 border-round-xl" header={headerContent}>
                <Formik
                    initialValues={product}
                    validationSchema={productSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className="grid">
                                <div className="field mb-4" style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="name" className="font-medium text-900"><i className="pi pi-tag" style={{ marginRight: '0.5rem' }} />Nombre</label>
                                    <span className="p-input-icon-left w-full">
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
                                <div className="col-12 md:col-6 field mb-4" style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="price" className="font-medium text-900"><i className="pi pi-dollar" style={{ marginRight: '0.5rem' }} />Precio</label>
                                    <span className="p-input-icon-left w-full">
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
                                <div className="col-12 md:col-6 field mb-4" style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="stock" className="font-medium text-900"><i className="pi pi-inbox" style={{ marginRight: '0.5rem' }} />Stock</label>
                                    <span className="p-input-icon-left w-full">
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
                                <div className="field mb-4" style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="category" className="font-medium text-900">Categoría</label>
                                    <Dropdown
                                        id="category"
                                        name="category"
                                        options={categories}
                                        value={values.category}
                                        onChange={(e) => setFieldValue('category', e.value)}
                                        placeholder="Selecciona una categoría"
                                        className="p-inputtext-lg"
                                        style={{ backgroundColor: '#ffffff' }}
                                        panelStyle={{ 
                                            backgroundColor: '#ffffff',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                        }}
                                        itemTemplate={(option) => {
                                            const categoryColors = {
                                                'pociones': 'success',
                                                'armas': 'danger',
                                                'accesorios': 'warning',
                                                'contenedores': 'info',
                                                'vestimenta': 'primary'
                                            };
                                            
                                            return (
                                                <div className="flex align-items-center">
                                                    <span className={`mr-2 border-circle inline-block`} 
                                                        style={{ 
                                                            width: '0.75rem', 
                                                            height: '0.75rem', 
                                                            backgroundColor: `var(--${categoryColors[option.value]}-color)` 
                                                        }}>
                                                    </span>
                                                    {option.label}
                                                </div>
                                            );
                                        }}
                                    />
                                    <ErrorMessage name="category" component="small" className="p-error block mt-1" />
                                </div>
                                <Divider />
                                <Button
                                    label="Cancelar"
                                    icon="pi pi-times"
                                    className="p-button-secondary"
                                    onClick={() => navigate('/products')}
                                />
                                <Button
                                    type="submit"
                                    label="Guardar"
                                    icon="pi pi-check"
                                    className="p-button-primary"
                                    loading={isSubmitting}
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