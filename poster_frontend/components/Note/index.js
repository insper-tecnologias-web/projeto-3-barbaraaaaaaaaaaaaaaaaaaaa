import ButtonWrapper from '../ButtonWrapper'

import style from './style.module.css'


export default function Note (props) {
  return (
    <div className={style.card} >
      <div className={style.imagem}>
        <div>
        <ButtonWrapper id= {props.id}></ButtonWrapper>
        </div>

        <h3 className={style.card_title}>{props.categoria}</h3>
      </div>
      <div className={style.grupo}>
        <div className={style.limitaNome}>
          <h3 className={style.card_contentG}>{props.title}</h3>
        </div>
        <h3 className={style.card_ontent}>{props.ano}</h3>
        <h3 className={style.card_content}>{props.price}</h3>
      </div>
    </div>
  )
}