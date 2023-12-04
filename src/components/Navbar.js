import React from 'react';
import styles from '@/styles/navbar.module.css';
import Image from 'next/image';
import accesoriesIcon from '../../public/assets/icons/accesories-icon.png';
import airpodsIcon from '../../public/assets/icons/airpods-icon.png';
import energyIcon from '../../public/assets/icons/energy-icon.png';
import iphoneIcon from '../../public/assets/icons/iphone-icon.png';
import iwatchIcon from '../../public/assets/icons/iwatch-icon.png';
import profileIcon from '../../public/assets/icons/profile-icon.png';
import softIcon from '../../public/assets/icons/soft-icon.png';
import Link from 'next/link';


export default function Layout() {
    return (
        <div className='w-full relative'>

            <div className={styles.sideBar}>

                <div className='fixed left-0 pl-2 mt-[-1.8em]'>
                    <Link href='/'>
                        <div className={`${styles.sideSelector}`}>
                            <Image
                                src={softIcon}
                                alt="Main icon"
                            />
                        </div>
                    </Link>
                </div>

                <div className='flex gap-10 justify-center items-center'>

                    <div className={styles.navItem}>
                        <Link href='/stock'>
                            <div className={`${styles.sideSelector} `}>
                                <Image
                                    src={iphoneIcon}
                                    alt="Menu Button"
                                />
                            </div>
                        </Link>
                        <span className={styles.iconDesc}>
                            iPhone
                        </span>
                    </div>

                    <div className={styles.navItem}>
                        <Link href='/stockpage'>
                            <div className={`${styles.sideSelector} `}>
                                <Image src={airpodsIcon} alt="Menu Button" />
                            </div>
                        </Link>
                            <span className={styles.iconDesc}>
                                Airpods
                            </span>
                    </div>

                    <div className={styles.navItem}>
                        <div className={`${styles.sideSelector}`}>
                            <Image src={iwatchIcon} alt="Menu Button" />
                        </div>
                        <span className={styles.iconDesc}>
                            Apple Watch
                        </span>
                    </div>

                    <div className='flex items-center flex-col gap-2'>
                        <div className={`${styles.sideSelector} `}>
                            <Image
                                src={accesoriesIcon}
                                alt="Menu Button"
                            />
                        </div>
                        <span className={styles.iconDesc}>
                            Accesorios
                        </span>
                    </div>

                    <div className='flex items-center flex-col gap-2'>
                        <div className={`${styles.sideSelector} }`}>
                            <Image
                                src={energyIcon}
                                alt="Menu Button"
                                className='scale-[80%]' />
                        </div>
                        <span className={styles.iconDesc}>
                            Cargadores
                        </span>
                    </div>
                </div>

                <div className='fixed right-0 pr-2 mt-[-1.8em]'>
                    <Link href='/addproduct'>
                        <div className={`${styles.sideSelector} `}>
                            <Image src={profileIcon} alt="Navbar button" />
                        </div>
                    </Link>
                </div>

            </div>

            <div className={styles.iconBar}>
                &ensp;
            </div>

        </div>
    )
}