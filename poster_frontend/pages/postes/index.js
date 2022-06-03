import Head from 'next/head'
import { useState, useEffect } from 'react'

import AppBar from '../../components/AppBar'
import Note from '../../components/Note'

export default function postes(props) {
  const [notes, setNotes] = useState([]) // Remova o array de notes que existia na versão anterior
  const [token, setToken] = useState('')
  
  async function fetchNotes () {
    const response = await fetch('http://localhost:8000/api/notes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    const notes = await response.json()

    console.log(notes)

    const _response = await fetch('http://localhost:8000/favorita/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      }
    })

    console.log(await _response.json())

    setNotes(notes)
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
            <Note key={`note__${note.id}`} id= {note.id}>{note.content}</Note>
          ))
        }
      </main>
    </>
  )
}
