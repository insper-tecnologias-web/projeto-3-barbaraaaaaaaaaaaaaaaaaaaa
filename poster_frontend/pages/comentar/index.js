import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';
import axios from 'axios';

import AppBar from '../../components/AppBar';

export default function comentar(props) {
  const router = useRouter()
  const [access_token, setToken]      = useState('');
  const [comment, setComment]         = useState('');
  const [imagem, setImagem]           = useState('');
  const d = new Date();
  let tempo = d.getTime();
  
  async function adiciona (event) {
    const formData = new FormData();
    try{
      formData.append('myFile', imagem, imagem.name);
    } catch{
      formData.append('myFile', null);
    }
    formData.append('time', tempo);
    formData.append('content', comment);
    
    axios
    .post('http://localhost:8000/adiciona/', formData, {
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${access_token}`
      },
    })
    .then(() => router.push('/home'))
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
