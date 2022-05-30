import Head from 'next/head';
import { useState } from 'react';

import AppBar from '../../components/AppBar';

export default function comentar(props) {

  return (
    <>
        <Head>
          <title>Poster</title>
        </Head>
        <AppBar nome= "Pedro"></AppBar>
        <h3>Entrou nos comentários</h3>
    </>
  )
}