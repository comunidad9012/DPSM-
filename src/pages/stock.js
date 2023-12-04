import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import firebaseApp from '@/data/firebase';
import Layout from '../components/Layout';
import Link from 'next/link';
import StockComponent from '../components/Stock';

const db = getFirestore(firebaseApp);

const StockPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'producto'));
            const productsData = [];
            querySnapshot.forEach((doc) => {
                productsData.push({ id: doc.id, ...doc.data() });
            });
            setProducts(productsData);
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <Link href="/stock" passHref>
            </Link>
            <StockComponent products={products} />
        </Layout>
    );
};

export default StockPage;