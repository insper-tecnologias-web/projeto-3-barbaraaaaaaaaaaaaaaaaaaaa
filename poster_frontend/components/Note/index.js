import { useEffect, useState } from 'react'
import moment from 'moment';
import Image from 'next/image';

import LikeButton from '../LikeButton'
import style from './style.module.css'


export default function Note ({ note }) {
  const [token, setToken] = useState('');
  const like = note.likes;

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

  async function delet (value) {
    const response = await fetch('http://localhost:8000/notes/' + note.id + '/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [])
  
  return (
    <div className={style.card} >
      <div className={style.imagem}>
        <div>
          <LikeButton like={like} onLike={updateLike} />
        <h3>{moment(note.time).fromNow()}</h3>
        <h3>Enviado por {note.username}</h3>
        </div>
        <button onClick={delet}></button>

        <h3 className={style.card_title}>{note.categoria}</h3>
      </div>
      <div className={style.grupo}>
        <div className={style.limitaNome}>
          <h3 className={style.card_contentG}>{note.content}</h3>
        </div>
          <img alt='photo_test' src={note.photo_url} width={500} height={500}/>
      </div>
    </div>
  )
}
