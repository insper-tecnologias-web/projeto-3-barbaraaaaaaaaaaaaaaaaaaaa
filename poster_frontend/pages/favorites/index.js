import Head from 'next/head'
import { useEffect, useState } from 'react'

import style from './style.module.css'
import AppBar from '../../components/AppBar'
import Post from '../../components/Post'

export default function Favorites(props) {
  const [posts, setPosts] = useState([])
  const [token, setToken] = useState('')

  async function fetchLikes () {
    const response = await fetch('http://localhost:8000/notes/all/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    const posts = await response.json()

    const _response = await fetch('http://localhost:8000/favorita/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${token}`
      },
    })
    const likes = await _response.json()
    const liked = []

    posts.forEach((post) => {
      post.likes = likes.some((like) => like.id_card === post.id)

      if (post.likes)
      liked.push(post)
    })

    setPosts(liked)
  }
  
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (token !== '') {
      fetchLikes()
    }
  }, [token])
  
  return (
    <>
      <Head>
        <title>Poster - Favoritos</title>
      </Head>

      <AppBar />

      <main className={style.main__container}>
        <div className={style.main__header}>
          <h1 className={style.main__header__title}>
          ❤️ Favoritos
          </h1>
        </div>

        {
          posts.map((post) => (
            <Post key={`post_${post.id}`} post={post}/>
          ))
        }
      </main>
    </>
  )
}