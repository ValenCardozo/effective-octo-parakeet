import { useMemo } from 'react';
import * as Yup from 'yup';

export const useUnicornForm = (currentUnicorn) => {
    // Initial values for the form
    const initialValues = useMemo(() => ({
        _id: currentUnicorn?._id || '',
        name: currentUnicorn?.name || '',
        colour: currentUnicorn?.colour || '',
        age: currentUnicorn?.age || '',
        power: currentUnicorn?.power || ''
    }), [currentUnicorn]);

    // Validation schema using Yup
    const validationSchema = useMemo(() => 
        Yup.object().shape({
            name: Yup.string().required('El nombre es requerido'),
            colour: Yup.string().required('El color es requerido'),
            age: Yup.number()
                .required('La edad es requerida')
                .positive('La edad debe ser positiva')
                .integer('La edad debe ser un número entero')
                .typeError('La edad debe ser un número'),
            power: Yup.string().required('El poder es requerido')
        }), 
    []);

    return {
        initialValues,
        validationSchema
    };
};