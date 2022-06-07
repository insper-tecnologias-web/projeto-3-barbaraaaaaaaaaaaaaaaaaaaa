import style from './style.module.css'


export default function InputText({label, ...props}) {

  return (
    <div className={style.input_text__input_field}>
      <div className={style.input_text__label}>
        {label}
      </div>

      <input
        className={style.input_text__input}
        type="text"
        {...props}
      />
    </div>
  )
}
