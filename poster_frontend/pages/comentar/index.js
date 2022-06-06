import Head from 'next/head';
import { useEffect, useState } from 'react';
import moment from 'moment';

import AppBar from '../../components/AppBar';

export default function comentar(props) {
  const [access_token, setToken] = useState('');
  const [comment, setComment]    = useState('');
  const [imagem, setImagem]      = useState('');
  const d = new Date();
  let tempo = d.getTime();
  
  async function adiciona (event) {
    const formData = new FormData();
    formData.append(`${imagem.name.replaceAll(" ", "_")}`, imagem);
    
    const response = await fetch('http://localhost:8000/adiciona/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${access_token}`
      },
      body: JSON.stringify({
        content: comment,
        photo:   formData,
        time:  tempo
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

        <input type="file" onChange={e => setImagem(e.target.files[0])}></input>
        <button onClick={adiciona}>Postar</button>
    </>
  )
}
