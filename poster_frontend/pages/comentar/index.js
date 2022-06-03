import Head from 'next/head';
import { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';

export default function comentar(props) {
  const [access_token, setToken] = useState('');
  const [comment, setComment]    = useState('');

  async function adiciona (event) {
    const response = await fetch('http://localhost:8000/adiciona/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${access_token}`
      },
      body: JSON.stringify({
        content: comment
      })
    })
    setComment('');
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [])
  
  return (
    <>
        <Head>
          <title>Poster</title>
        </Head>

        <AppBar></AppBar>

        <textarea
        onChange={({ target }) => setComment(target.value)}
        >
        </textarea>
        <button onClick={adiciona}>Postar</button>
    </>
  )
}