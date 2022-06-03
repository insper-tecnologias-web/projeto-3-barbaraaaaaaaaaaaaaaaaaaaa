import { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './Style.module.css'


export default function AppBar(props) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('user'))
  }, [])
  
  return (
    <>
    <div className={styles.appbar}>
        <img src="logo_getit.png" className={styles.logo} alt="logo"/>
            <div className={styles.bnt}>
              <Link href='/inicial'>
                <a>Home</a>
              </Link>
              <Link href='/comentar'>
                <a>Criar Poster</a>
              </Link>
              <Link href='/likes'>
                <a>Likes</a>
              </Link>
              <Link href='/postes'>
                <a>Seus postes</a>
              </Link>
            </div>
        <h2 className={styles.nome}>{name}</h2>
    </div>
    </>
  )
}