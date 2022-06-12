import Head from 'next/head'
import { useState, useEffect } from 'react'

import style from './style.module.css'
import AppBar from '../../components/AppBar'
import Post from '../../components/Post'

export default function postes(props) {
  const [posts, setPosts] = useState([]) // Remova o array de notes que existia na versão anterior
  const [token, setToken] = useState('')
  
  async function fetchPosts () {
    const response = await fetch('http://localhost:8000/notes/', {
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
      setPosts(posts)
    })
  }

  async function deletePost (post) {
    const response = await fetch('http://localhost:8000/notes/' + post.id + '/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
      .then(() => {
        setPosts(posts.filter(({id}) => post.id !== id))
      })
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (token !== '') {
      fetchPosts()
    }
  }, [token])
  
  return (
    <>
      <Head>
        <title>Poster - Suas postagens</title>
      </Head>

      <AppBar />

      <main className={style.main__container}>
        <div className={style.main__header}>
          <h1 className={style.main__header__title}>
          🗂️ Suas postagens
          </h1>
        </div>

        {
          posts.map((post) => (
            <Post key={`post_${post.id}`} post={post} onDelete={() => deletePost(post)} />
          ))
        }
      </main>
    </>
  )
}
