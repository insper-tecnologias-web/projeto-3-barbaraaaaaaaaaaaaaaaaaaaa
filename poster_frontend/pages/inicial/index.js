import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from "axios"

import AppBar from '../../components/AppBar'
import Note from '../../components/Note'

export default function inicial(props) {
  const [notes, setNotes] = useState([]) // Remova o array de notes que existia na versão anterior
  const [access_token, setToken] = useState('')

  async function updateNotes () {
    console.log(access_token);
    const response = await fetch('http://localhost:8000/api/notes/all/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${access_token}`
      }
    })
    const notes = await response.json()

    setNotes(notes)
    console.log(notes)
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (access_token !== '')
      updateNotes()
  }, [access_token])

  return (
    <>
      <Head>
        <title>Poster</title>
      </Head>

      <AppBar nome= "Pedro"></AppBar>
      <main className="container">
        {
          notes.map((note) => (
            <Note key={`note__${note.id}`} title={note.title}>{note.content}</Note>
          ))
        }
      </main>
    </>
  )
}
