import React from 'react';
import "./index.css";

import Lottie from 'react-lottie';

export default function ButtonWrapper(props) {

    const like= (event)=>{
        const reverseAnimation = -1;
        const normalAnimation = 1;

        props.setAnimationState({
            isStopped: false,
            direction: props.animationState.direction === normalAnimation 
            ? reverseAnimation
            : normalAnimation,
        })
        props.setLikeState(!props.isLiked);
    }
  
  return (
    <button className="botao" onClick={like}>
            <Lottie
                onClick={like}
                options={props.defaultOptions}
                width= {400}
                height= {400}
                direction={props.animationState.direction}
                isStopped={props.animationState.isStopped}
                isPaused={props.animationState.isPaused}/>
    </button>
  );
}