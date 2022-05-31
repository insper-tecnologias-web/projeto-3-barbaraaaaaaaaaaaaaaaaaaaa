import Lottie from 'react-lottie'
import { useState } from 'react'

import animationState from './lottie-heart.json'


export default function ButtonWrap (props) {
  const [teste, setTeste] = useState(false);

  return (
    <button className="botao" onClick={() => setTeste(!teste)}>
      <Lottie
        options={{
          loop: false,
          autoplay: true, 
          animationData: animationState,
            rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        width={400}
        height={400}
        direction={teste ? -1 : 1}
        isStopped={false}
        isPaused={false}
      />
    </button>
  )
}
