import Head from 'next/head';
import { useState } from 'react';

// import Note from '../components/Note';

import styles from './Style.module.css'


export default function AppBar(props) {

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
        <h2 className={styles.nome}>{props.nome}</h2>
    </div>
    </>
  )
}