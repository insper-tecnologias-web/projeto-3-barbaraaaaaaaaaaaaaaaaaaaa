import { useEffect, useState } from 'react'

import LikeButton from '../LikeButton'
import style from './style.module.css'


export default function Note ({ note }) {
  const [token, setToken] = useState('')
  const like = note.likes

  async function updateLike (value) {
    const response = await fetch('http://localhost:8000/favorita/', {
      method: value ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        id_card: note.id,
      })
    })
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <div className={style.card} >
      <div className={style.imagem}>
        <div>
          <LikeButton like={like} onLike={updateLike} />
        </div>

        <h3 className={style.card_title}>{note.categoria}</h3>
      </div>
      <div className={style.grupo}>
        <div className={style.limitaNome}>
          <h3 className={style.card_contentG}>{note.content}</h3>
        </div>
      </div>
    </div>
  )
}
