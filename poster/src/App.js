import React, { useState } from 'react';
import './index.css';

import animationData from './animation.json';
import ButtonWrapper from './components/ButtonWrapper';
import Note from './components/Note';

export default function App() {
  const [isLiked, setLikeState] = useState(false);
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
  
  return (
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
  );
}
