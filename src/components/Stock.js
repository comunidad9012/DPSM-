import React from 'react';
import s from '@/styles/category.module.css';
import whatsappIcon from '@/../public/assets/icons/whatsapp-icon.png';
import Image from 'next/image';

const Stock = ({ products }) => {
  return (
    <div className={s.categoryWrapper}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <h2 className='text-center'>Inventario de Productos</h2>
      <div className={s.homeGrid}>
        {products.map((product) => (
          <div key={product.id} className={s.homeCard}>
            <img
              src={product.image}
              alt={product.title}
              className={s.cardImage}
            />
            <span className={s.cardPriceText}>${product.price}</span>
            <div className={s.hoverContent}>
              <span>{product.title}</span>
              <span>⋆ Bateria: {product.battery}</span>
              <span>⋆ Cámara: {product.camera}</span>
              <span>⋆ Capacidad: {product.memory}</span>
              <span>⋆ RAM: {product.ram}</span>
              <div className={s.statusWrapper}>
                <span>⋆ Estado:</span>
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`fa fa-star ${index < product.status ? s.checked : ''}`}></span>
                ))}
              </div>

              <div className={s.whatsappButton}>
                <Image src={whatsappIcon} className={s.whatsappButtonIcon} />
                <span>WhatsApp</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stock;
