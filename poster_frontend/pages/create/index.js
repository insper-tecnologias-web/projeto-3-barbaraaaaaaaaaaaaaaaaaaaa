import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

import style from './style.module.css'
import AppBar from '../../components/AppBar'

export default function comentar(props) {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [asset, setAsset] = useState(null)
  const now = new Date().getTime()

  function selectAsset () {
    const input = Object.assign(document.createElement('input'), {
      type: 'file'
    })

    input.addEventListener('change', () => {
      setAsset(input.files[0])
    })

    input.click()
  }

  async function submit (event) {
    const formData = new FormData()

    try{
      formData.append('myFile', asset, asset.name)
    } catch {
      formData.append('myFile', null)
    }

    formData.append('time', now)
    formData.append('content', title)
    
    axios.post('http://localhost:8000/adiciona/', formData, {
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${token}`
      }
    })
    .then(() => router.push('/'))
  }

  useEffect(() => {
    setUser(localStorage.getItem('user'))
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <>
      <Head>
        <title>Poster - Criar postagem</title>
      </Head>

      <AppBar />

      <main className={style.main__container}>
        <div className={style.main__header}>
          <h1 className={style.main__header__title}>
           🧭 Criar postagem
          </h1>
        </div>

        <div className={style.post}>
          <div className={style.post__header}>
            <div className={style.post__header__user}>
              <span className={style.post__header__user__name}>@{user}</span> ({moment(now).fromNow()})
            </div>

            <h2
              placeholder="Insira um título para seu post"
              onInput={({ target }) => setTitle(target.innerText)}
              contentEditable="true"
              className={style.post__header__title}
            />
          </div>

          { asset === null ? (
            <div className={style.post__image_placeholder}>
              <button onClick={selectAsset} className={style.button}>
                Inserir imagem
              </button>
            </div>
          ) : (
            <>
              { asset.type.startsWith('video/') ? (
                <video
                  src={URL.createObjectURL(asset)}
                  onClick={selectAsset}
                  className={style.post__image}
                  autoPlay={true}
                  loop={true}
                  muted={true}
                />
              ) : (
                <img
                  src={URL.createObjectURL(asset)}
                  onClick={selectAsset}
                  className={style.post__image}
                />
              ) }
            </>
          ) }

          <div className={style.post__footer}>
            <button onClick={submit} className={[style.button, style.button_primary].join(' ')}>
              Publicar
            </button>
          </div>
        </div>
      </main>
    </>
  )

  return (
    <>
        <Head>
          <title>Poster</title>
        </Head>

        <AppBar></AppBar>
    </>
  )
}
