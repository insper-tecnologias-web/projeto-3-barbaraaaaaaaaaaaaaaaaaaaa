import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import ButtonWrapper from "../ButtonWrapper";

export default function Note(props) {

  return (
    <div className="card" >
      <div className= "imagem">
        <div>
        <ButtonWrapper
          setAnimationState= {props.setAnimationState}
          animationState= {props.animationState}
          setLikeState= {props.setLikeState}
          defaultOptions= {props.defaultOptions}
          isLiked= {props.isLiked}
        ></ButtonWrapper>
        </div>

        <h3 className="card-title">{props.categoria}</h3>
      </div>
      <div class="grupo">
        <div class="limitaNome">
          <h3 className="card-contentG">Laureate: {props.nome}</h3>
        </div>
        <h3 className="card-content">Year: {props.ano}</h3>
        <h3 className="card-content">Prize: ${props.price}</h3>

        {/* <form className= "limitador">
          <input
            className= "btn-save"
            type="image"
            name="save"
            src={props.salvos}
          />
          <input type="hidden" name="save" value={props.salvos}></input>
          <input type="hidden" name="categoria" value={props.categoria}></input>
          <input type="hidden" name="nome" value={props.nome}></input>
          <input type="hidden" name="ano" value={props.ano}></input>
          <input type="hidden" name="price" value={props.price}></input>
        </form>  */}
      </div>
    </div>
  );
}