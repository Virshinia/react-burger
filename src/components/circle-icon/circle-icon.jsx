import React  from 'react';
import style from './circle-icon.module.css'

const CircleIcon = ({img}) => {
  return (
    <span className={style.gradient} >
      <span
        style={{backgroundImage: `url(${img})`}}
        className={style.image} />
    </span>
  )
}

export default CircleIcon
