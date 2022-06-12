import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import style from './style.module.css'
import AppBar from '../components/AppBar'
import Post from '../components/Post'


export default function Home(props) {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [token, setToken] = useState('')
  
  async function fetchPosts () {
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
      }
    })
    const likes = await _response.json()

    posts.forEach((post) => {
      post.likes = likes.some((like) => like.id_card === post.id)
    })

    setPosts(posts)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token)
      setToken(token)
    else
      router.push('/signin')
  }, [])

  useEffect(() => {
    if (token !== '') fetchPosts()
  }, [token])
  
  return (
    <>
      <Head>
        <title>Poster - Explorar</title>
      </Head>

      <AppBar />

      <main className={style.main__container}>
        <div className={style.main__header}>
          <h1 className={style.main__header__title}>
           🧭 Explorar
          </h1>
        </div>

        {
          posts.map((post) => (
            <Post key={`post_${post.id}`} post={post} />
          ))
        }

        <div className={style.main__footer}>
          <p className={style.main__footer__text}>
            { posts.length > 0 ? (
              'Você chegou no fim! Não há mais postagens para ver 😢'
            ) : (
              'Não há postagens para ver! Seja o primeiro a postar 😀'
            ) }
          </p>
        </div>
      </main>
    </>
  )
}
