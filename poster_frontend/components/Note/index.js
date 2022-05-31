import ButtonWrapper from '../ButtonWrapper'

import style from './style.module.css'


export default function Note (props) {
  return (
    <div className={style.card} >
      <div className={style.imagem}>
        <div>
        <ButtonWrapper></ButtonWrapper>
        </div>

        <h3 className={style.card_title}>{props.categoria}</h3>
      </div>
      <div className={style.grupo}>
        <div className={style.limitaNome}>
          <h3 className={style.card_contentG}>{props.title}</h3>
        </div>
        <h3 className={style.card_ontent}>{props.ano}</h3>
        <h3 className={style.card_content}>{props.price}</h3>

        {/* <form className="limitador">
          <input
            className="btn-save"
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
  )
}