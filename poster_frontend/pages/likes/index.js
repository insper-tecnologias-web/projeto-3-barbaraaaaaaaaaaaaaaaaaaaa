import Head from 'next/head';
import { useEffect, useState } from 'react';

import AppBar from '../../components/AppBar';
import Note from '../../components/Note';

export default function likes(props) {
  const [notes, setNotes] = useState([]) // Remova o array de notes que existia na versão anterior
  const [token, setToken] = useState('')
  const lista= [];

    async function fetchNotes () {
    const response = await fetch('http://localhost:8000/notes/all/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    const notes = await response.json()

    const _response = await fetch('http://localhost:8000/favorita/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    const likes = await _response.json()

    notes.forEach((note) => {
      note.likes = likes.some((like) => like.id_card === note.id)
      if (note.likes)
        lista.push(note)
    })

    setNotes(lista)
  }
  
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (token !== '') {
      fetchNotes()
    }
  }, [token])
  
  return (
    <>
      <Head>
        <title>Poster</title>
      </Head>

      <AppBar />

      <main className="container">
        {
          notes.map((note) => (
            <Note key={`note__${note.id}`} note= {note}>{note.content}</Note>
          ))
        }
      </main>
    </>
  )
}