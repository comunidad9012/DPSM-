// StockPage.jsx
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firebaseApp from '@/data/firebase';
import Layout from '../components/Layout';
import styles from '@/styles/StockPage.module.css'
import EditProductModal from '@/components/EditProductModal'; 

const StockPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const db = getFirestore(firebaseApp);
            const productsCollection = collection(db, 'producto');
            const productsSnapshot = await getDocs(productsCollection);
            const productsData = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
        };

        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        const db = getFirestore();
        const productRef = doc(db, 'producto', productId);
        await deleteDoc(productRef);
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
    };

    const handleUpdateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
        setSelectedProduct(null);
    };

    return (
        <Layout>
            <div className={styles.stockWrapper}>
                <h1 className={styles.title}>Stock de Productos</h1>
                <ul className={styles.mainList}>
                    <li className={styles.listItemTitle}>
                        <span className={`${styles.proditem} ${styles.proditemTitle}`}>Nombre</span>
                        <span className={`${styles.proditem} ${styles.proditemTitle}`}>Precio</span>
                        <div className={styles.buttonContainer}></div>
                    </li>
                    {products.map((product) => (
                        <li className={styles.listItem} key={product.id}>
                            <span className={styles.proditem}>{product.title}</span>
                            <span className={styles.proditem}>{product.price}</span>
                            <div className={styles.buttonContainer}>
                                <button
                                    className={`${styles.genButton} ${styles.actionButton} ${styles.deleteButton}`}
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Eliminar
                                </button>
                                <button
                                    className={`${styles.genButton} ${styles.actionButton} ${styles.editButton}`}
                                    onClick={() => handleEdit(product)}
                                >
                                    Editar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {selectedProduct && (
                    <EditProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onSave={handleUpdateProduct}
                    />
                )}
            </div>
        </Layout>
    );
};

export default StockPage;
