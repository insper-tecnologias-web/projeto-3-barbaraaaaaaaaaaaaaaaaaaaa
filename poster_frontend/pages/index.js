import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import style from './style.module.css'
import animationData from './login.json'
import Lottie from 'react-lottie'
import animationEye from '../components/ShowPasswordButton/showpassword.json'


export default function Home() {
  const rounter = useRouter()
  const [user, setUser] = useState('pedro')
  const [pass, setPass] = useState('123456789')
  const [showPass, setShowPass] = useState(false)
  

  async function login (event) {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    })
    const { token } = await response.json()

    if (token != "Não tem acesso") {
      localStorage.setItem('token', token)
      localStorage.setItem('user', user)
      rounter.push('./inicial')
    } else {
      alert("Senha ou usuário incorretos");
    }
  }

  return (
    <>
      <Head>
        <title>Poster</title>
      </Head>

      <main className={style.container}>
        <div className={style.hello_animation__wrapper}>
          <Lottie
            options={{
              loop: false,
              autoplay: true, 
              animationData: animationData,
                rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            width={150}
            height={150}
          />
        </div>

        <div className={style.login_form__wrapper}>
          <div className={style.login_form__input_field}>
            <input
              className={style.login_form__input}
              type='text'
              placeholder="Usuário"
              value={user}
              onChange={({ target }) => setUser(target.value)}
            />
          </div>
          
          <div className={style.login_form__input_field}>
            <input
              className={style.login_form__input}
              type={showPass ? 'text' : 'password'}
              placeholder="Senha"
              value={pass}
              onChange={({ target }) => setPass(target.value)}
            />

            <button onClick={() => setShowPass(!showPass)}>
              <Lottie
                options={{
                  loop: false,
                  autoplay: true,
                  animationData: animationEye,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                  }
                }}
                speed= {2.5}
                width={50}
                height={50}
                direction={showPass ? -1 : 1}
                isStopped={false}
                isPaused={false}
              />
            </button>
          </div>

          <div className="bnt">
              <button className="" onClick={() => login()} type="submit" >Entrar</button>
            <Link href= "./cadastro">
              <button className="" type="submit" >cadastrar</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
