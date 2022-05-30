import Head from 'next/head';
import { useState } from 'react';

import animationData from '../login.json';
import Lottie from 'react-lottie';



export default function Home() {
  const [animationState, setAnimationState] = useState({
    isStopped: true, isPaused: false,
    direction: -1,
  });

  const defaultOptions = {
  loop: false,
  autoplay: false, 
  animationData: animationData,
  rendererSettings: {
  preserveAspectRatio: 'xMidYMid slice'
  }
  };

  const like= (event)=>{
      const reverseAnimation = -1;
      const normalAnimation = 1;

      setAnimationState({
          isStopped: false,
          direction: animationState.direction === normalAnimation 
          ? reverseAnimation
          : normalAnimation,
      })
  }

  return (
    <>
      <Head>
        <title>Poster</title>
      </Head>

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

            <textarea
                className="login-senha"
                name="login"
                placeholder="Digite o seu e-mail Insper"
            ></textarea>
            <textarea
                className="login-senha"
                name="tag"
                placeholder="Digite a sua senha"
            ></textarea>

            <div className='bnt'>
                <a className="" onClick={like} href= "./Inicial"  type="submit">Entrar</a>
                <a className="" onClick={like} href= "./Cadastro" type="submit">cadastrar</a>
            </div>

        </div>
    </>
  )
}