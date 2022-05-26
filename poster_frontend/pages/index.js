import Head from 'next/head'
// import Link from 'next/link'
// import Image from 'next/image'
import { useState } from 'react'

import Note from '../components/Note'
import ButtonWrapper from '../components/ButtonWrapper'
import animationData from '../components/ButtonWrapper/lottie-heart.json'


export default function Home() {
  const [isLiked, setLikeState] = useState(false)
  const [animationState, setAnimationState] = useState({
    isStopped: true, isPaused: false,
    direction: -1
  })
  const defaultOptions = {
    loop: false,
    autoplay: false, 
    animationData: animationData,
    rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <>
      <Head>
        <title>Poster</title>
      </Head>
      
      <div className="App">
        <Note key={`note__${1}`}
          setAnimationState= {setAnimationState}
          animationState= {animationState}
          setLikeState= {setLikeState}
          defaultOptions= {defaultOptions}
          isLiked= {isLiked}
          categoria  = {'boal'}
          nome       = {'boal'}
          ano        = {'boal'}
          price      = {'boal'}
        >
        </Note>
        <span>
          {isLiked ? 1 : 0}
        </span>
      </div>
    </>
  )
}
