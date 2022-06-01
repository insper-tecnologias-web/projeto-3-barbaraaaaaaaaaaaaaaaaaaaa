import Lottie from 'react-lottie'
import { useEffect, useState } from 'react'

import animationState from './lottie-heart.json'


export default function ButtonWrap (props) {
  const [autoplay, setAutoplay] = useState(true);
  const [like, setLike] = useState(true);
  const [access_token, setToken]  = useState('')
  const [favoritos, setFavoritos] = useState([]);

  
  async function verifica(event) {
      setLike(!like);
      if (like) {
        const response = await fetch('http://localhost:8000/favorita/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${access_token}`
          },
          body: JSON.stringify({
            id_card: props.id,
          })
        })
      } else {
        const response = await fetch('http://localhost:8000/favorita/', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${access_token}`
          },
          body: JSON.stringify({
            id_card: props.id,
          })
        })
      }
  }
  
  useEffect(() => {
    setFavoritos(localStorage.getItem('favoritos'));
    setLike(!favoritos.includes(props.id));
    setToken(localStorage.getItem('token'));
  }, [])
  
  return (
    <button className="botao" onClick={verifica}>
      <Lottie
        options={{
          loop: false,
          autoplay: autoplay,
          animationData: animationState,
            rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        width={400}
        height={400}
        direction={like ? -1 : 1}
        isStopped={false}
        isPaused={false}
      />
    </button>
  )
}
