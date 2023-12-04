import { useRouter } from 'next/router';
import React, { useState, FormEvent } from 'react';
import firebaseApp from '@/data/firebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import Layout from '../components/Layout';
import styles from '@/styles/addproduct.module.css';
import { storage } from '@/data/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import Progress from 'antd/es/progress';

const db = getFirestore(firebaseApp)

export default function Formulario() {

  const [imageFile, setImageFile] = useState<File>()
  const [imageURL, setImageURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(undefined);

  const handleStatusSelection = (status: number) => {
    setSelectedStatus(status);
    console.log(status);
  };

  const handleSelectedFile = (files: any) => {
    try {
      if (files[0].size < 10000000) {
        setImageFile(files[0]);
        console.log(files[0])
      } else {
        alert('Archivo demasiado Grande');
      }
    } catch (e) {
      console.error('No se detecto el archivo');
    }

  }
  const handleClickInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleRemoveFile = () => {
    setImageFile(undefined);
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress);

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            setImageURL(url);
            try {
              const docRef = await addDoc(collection(db, 'producto'), {
                ...dato,
                image: url,
                status: selectedStatus,
              });
              console.log('Document written with ID: ', docRef.id);
            } catch (error) {
              console.error('Error adding document: ', error);
            }
            router.push('/');
          });
        },
      );
    } else {
      console.error('File not found');
    }
  }
  const router = useRouter();

  const valorInicial = {
    title: "",
    price: "",
    battery: "",
    memory: "",
    ram: "",
    camera: "",
    status: "",
    image: ""
  }

  const [dato, setDato] = useState(valorInicial);

  const obtenerInputs = (event: any) => {
    const { name, value } = event.target;
    setDato({ ...dato, [name]: value });
  }

  return (
    <Layout>
      <div className={styles.addproductWrapper}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div className={styles.titleContainer}>
          <span className={styles.title}>Añadir Productos</span>
        </div>
        <div className='w-full pt-10' >
          <form className={styles.formMain}>
            <div className={styles.formItemContainer}>
              <input type="text" placeholder='Ingresar producto' className={styles.formItem}
                name='title' value={dato.title} onChange={obtenerInputs} required />
            </div>

            <div className={styles.formItemContainer}>
              <input type="text" placeholder='Ingresar precio' className={styles.formItem}
                name='price' value={dato.price} onChange={obtenerInputs} required />
            </div>

            <div className={styles.formItemContainer}>
              <input type="text" placeholder='Ingresar bateria' className={styles.formItem}
                name='battery' value={dato.battery} onChange={obtenerInputs} required />
            </div>
            <div className={styles.formItemContainer}>
              <input type="text" placeholder='Ingresar memoria ram' className={styles.formItem}
                name='ram' value={dato.ram} onChange={obtenerInputs} required />
            </div>
            <div className={styles.formItemContainer}>
              <input type="text" placeholder='Ingresar memoria' className={styles.formItem}
                name='memory' value={dato.memory} onChange={obtenerInputs} required />
            </div>
            <div className={styles.formItemContainer}>
              <input type="text" placeholder='Ingresar camara' className={styles.formItem}
                name='camera' value={dato.camera} onChange={obtenerInputs} required />
            </div>
            <div className={styles.formItemStatus}>
              <span>Estado:&ensp;</span>
              {[1, 2, 3, 4, 5].map((status) => (
                <span
                  key={status}
                  className={`fa fa-star ${styles.statusItem} ${selectedStatus && status <= selectedStatus ? styles.activeStatus : ''
                    }`}
                  onClick={() => handleStatusSelection(status)}
                >
                </span>
              ))}
            </div>
            <div className={`${styles.formItemContainer} ${styles.formItemImageContainer}`}>
              {!imageFile &&
                <button
                  className={styles.imageButton}
                  onClick={handleClickInput}
                >
                  Elegir Imagen
                </button>
              }
              {imageFile &&
                <button
                  className={`${styles.imageButton} ${styles.deleteImageButton}`}
                  onClick={handleRemoveFile}
                >
                  {imageFile.name} <span className='hidden'>Eliminar</span>
                </button>}
              <input
                className={`${styles.formItem} ${styles.formItemImage}`}
                type='file'
                accept='image/*'
                id='fileInput'
                onChange={(event) => handleSelectedFile(event.target.files)}
              />
            </div>
            {imageFile &&
            <div className=''>
              <button
                type='button'
                className={styles.uploadButton}
                onClick={handleUploadFile}
              >
                Upload
              </button>
            </div>
            }
          </form>
        </div>
        {imageFile && (
          <div className='w-1/2 flex items-center justify-center'>
            <img src={URL.createObjectURL(imageFile)} alt="Vista previa" className='w-[15vw] h-[20vw] object-cover shadow-md'/>
          </div>
        )}
      {imageFile &&
        <>
        <div className='w-full px-6 absolute bottom-0'>
          <Progress percent={progressUpload} strokeColor={{ from: '#a5b4fc', to: '#6366f1' }} trailColor={'#475569'}/>
        </div>
        </>
      }
      </div>
      
    </Layout>
  )
}