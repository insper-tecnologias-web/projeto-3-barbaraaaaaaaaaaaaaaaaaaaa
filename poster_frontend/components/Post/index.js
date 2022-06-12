import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import AnimatedNumber from 'react-animated-number/build/AnimatedNumber'

import LikeButton from '../LikeButton'
import TrashButton from '../TrashButton'
import style from './style.module.css'


export default function Post ({ post, onDelete=null }) {
  const [token, setToken] = useState('')
  const [likesNuber, setLikesNuber] = useState(post.likesNuber)

  moment.locale('pt-br')

  async function updateLike (value) {
    value ? setLikesNuber(likesNuber+1) : setLikesNuber(likesNuber-1);
    const response = await fetch('http://localhost:8000/favorita/', {
      method: value ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        id_card: post.id,
      })
    })
  }

  async function toggletrash (event) {
    setTrash(!trash)

    if (onDelete !== null) onDelete(post)
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <article className={style.post}>
      <div className={style.post__header}>
        <div className={style.post__header__user}>
          <span className={style.post__header__user__name}>@{post.username}</span> ({moment(post.time).fromNow()})
        </div>

        <h2 className={style.post__header__title}>
          {post.content + ' '}
        </h2>
      </div>

      { post.photo_url && !post.photo_url.endsWith('null') ? post.photo_url.endsWith('.mp4') ? (
        <video
          src={post.photo_url}
          className={style.post__image}
          controls={true}
          loop={true}
        />
      ) : ( 
          <img src={post.photo_url} alt='photo_test' className={style.post__image}/>
      ) : (
        <></>
      )}

      <div className={style.post__footer}>
        <LikeButton like={post.likes} onLike={updateLike} />
        <AnimatedNumber
          value={likesNuber}
          formatValue={n=>n.toFixed(0)}
          frameStyle={percentage=>percentage>20 && percentage<80 ? { opacity:0.5 } : { opacity:1 }}
          duration={300}
          />

        { onDelete !== null ? (
          <TrashButton post={post} onDelete={onDelete}/>
        ) : (
          <></>
        ) }
      </div>
    </article>
  )
}
