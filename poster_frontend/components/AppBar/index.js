import { useEffect, useState } from 'react';

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
                <a href='/Inicial'>Home</a>
                <a href='/Comentar'>Criar Poster</a>
                <a href='/Likes'>Likes</a>
                <a href='/Postes'>Seus postes</a>
            </div>
        <h2 className={styles.nome}>{name}</h2>
    </div>
    </>
  )
}