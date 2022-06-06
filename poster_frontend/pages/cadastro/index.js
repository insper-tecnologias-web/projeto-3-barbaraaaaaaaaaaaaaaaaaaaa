import Head from 'next/head';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router'
import { useState } from 'react';

import animationData from '../login.json';
import Lottie from 'react-lottie';

import style from './style.module.css'



export default function cadastra() {
  const rounter = useRouter()
  const [email, setEmail]= useState('');
  const [username, setUsername]= useState('');
  const [first_name, setFirst_name]= useState('');
  const [last_name, setLast_name]= useState('');
  const [password, setPassword]= useState('');

  const [animationState, setAnimationState] = useState({
    isStopped: true, isPaused: false,
    direction: -1,
  });

  const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
  preserveAspectRatio: 'xMidYMid slice'
  }
  };

  async function cadastrar (event) {
      const response = await fetch('http://localhost:8000/cadastra/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
                username:   username, 
                email:      email, 
                password:   password, 
                first_name: first_name, 
                last_name:  last_name
              })
            })
            .then((response) => {
              console.log(response.err);
              if (response.status !== 200){
                const divMessage = document.querySelector(".alert");
                let msg = "Preencha todos os campos";
                
                if (!email.endsWith('@al.insper.edu.br'))
                  msg = "Apenas e-mail insper";

                const message = document.createElement("div");
                message.classList.add(style.message);
                message.innerText = msg;
                divMessage.appendChild(message);
          
                setTimeout(() => {
                  message.style.display = "none";
                }, 3000);

              } else {
                localStorage.setItem('user', username);
                rounter.push('./inicial');
              }
            })
  }

  return (
    <>
      <Head>
        <title>Poster</title>
      </Head>

      <div className='body'>
        <div className='alert'></div>
      </div>

      <div className='animation'>
            <Lottie
                options={defaultOptions}
                width= {150}
                height= {150}
                direction={animationState.direction}
                isStopped={animationState.isStopped}
                isPaused={animationState.isPaused}/>
        </div>

        <div className='form-card'>

            <input
                className="login-senha"
                name="login"
                placeholder="E-mail Insper"
                onChange={({ target }) => setEmail(target.value)}
            />
            <input
                className="login-senha"
                name="tag"
                placeholder="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
            <input
                className="login-senha"
                name="tag"
                placeholder="Primeiro nome"
                onChange={({ target }) => setFirst_name(target.value)}
            />
            <input
                className="login-senha"
                name="tag"
                placeholder="Último nome"
                onChange={({ target }) => setLast_name(target.value)}
            />
            <input
                className="login-senha"
                name="tag"
                type= "password"
                placeholder="Senha"
                onChange={({ target }) => setPassword(target.value)}
            />

            <div className= 'bnt'>
                <button className="" onClick={cadastrar} type="submit">cadastre-se</button>
                <Link href= './pages/index.js'>
                  <button >conecte-se</button>
                </Link>
            </div>

        </div>
    </>
  )
}