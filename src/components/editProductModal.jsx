// EditProductModal.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import firebaseApp from '@/data/firebase';

const EditProductModal = ({ product, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });

    useEffect(() => {
        setEditedProduct({ ...product });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const db = getFirestore(firebaseApp);
            const productRef = doc(db, 'producto', product.id);
            await updateDoc(productRef, editedProduct);
            onClose();
            if (onSave) {
                onSave(editedProduct);
            }
        } catch (error) {
            console.error('Error al guardar los cambios:', error.message);
        }
    };

    return (
        <div className='w-full flex flex-col items-center gap-1 mt-10'>
            <h2>Editar Producto</h2>
            <label className='w-full justify-center flex'>
                <input className='w-2/6 text-center' type="text" name="title" value={editedProduct.title} onChange={handleChange} />
            </label>
            <label className='w-full justify-center flex'>
                <input className='w-2/6 text-center' type="text" name="price" value={editedProduct.price} onChange={handleChange} />
            </label>
            <button onClick={handleSave}>Guardar Cambios</button>
            <button onClick={onClose}>Cancelar</button>
        </div>
    );
};

export default EditProductModal;
