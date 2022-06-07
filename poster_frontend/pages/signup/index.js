import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import style from './style.module.css'
import HelloIcon from '../../components/HelloIcon'
import InputText from '../../components/InputText'
import InputPassword from '../../components/InputPassword'


export default function cadastra() {
  const rounter = useRouter()
  const [mail, setMail] = useState('')
  const [user, setUser] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [pass, setPass] = useState('')
  const [passConfirm, setPassConfirm] = useState('')

  async function submit(event) {
    const response = await fetch('http://localhost:8000/cadastra/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        firstName,
        lastName
      })
    })
    .then((response) => {
      if (response.status !== 200) {
        const divMessage = document.querySelector('.alert')
        let msg = 'Preencha todos os campos'

        if (!email.endsWith('@al.insper.edu.br'))
          msg = 'Apenas e-mail insper'

        const message = document.createElement('div')

        message.classList.add(style.message)
        message.innerText = msg

        divMessage.appendChild(message)

        setTimeout(() => message.style.display = 'none', 3000)
      } else {
        localStorage.setItem('user', username)
        rounter.push('./inicial')
      }
    })
  }

  return (
    <>
      <Head>
        <title>Poster - Cadastrar</title>
      </Head>

      <main className={style.container}>
        <div className={style.hello_animation__wrapper}>
          <HelloIcon />

          <h1 className={style.page_title}>
            Cadastrar-se
          </h1>
        </div>

        <div className={style.login_form__wrapper}>
          <div className={style.login_form__input_field}>
            <div className={style.login_form__row}>
              <InputText label="Primeiro nome" value={firstName} onInput={({target}) => setFirstName(target.value)} />

              <InputText label="Sobrenome" value={lastName} onInput={({target}) => setLastName(target.value)} />
            </div>

            <InputText label="E-mail Insper" type="email" value={mail} onInput={({target}) => setMail(target.value)} />

            <InputText label="Usuário" value={user} onInput={({target}) => setUser(target.value)} />

            <InputPassword label="Senha" value={pass} onInput={({target}) => setPass(target.value)} />

            <InputPassword label="Confirmar senha" value={passConfirm} onInput={({target}) => setPassConfirm(target.value)} />
          </div>

          <div className={style.login_form__submit_row}>
            <Link href="/signin">
              <button className={style.login_form__button}>Entrar</button>
            </Link>

            <button className={[style.login_form__button, style.login_form__button_primary].join(' ')} onClick={submit} type="submit" >Cadastrar</button>
          </div>
        </div>
      </main>
    </>
  )
}
