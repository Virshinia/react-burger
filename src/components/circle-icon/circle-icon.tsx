import React, {FC}  from 'react';
import style from './circle-icon.module.css'

interface ICircleIconProps {
  img: string;
  qty?: number | boolean
}

const CircleIcon:FC<ICircleIconProps> = ({img, qty}) => {
  return (
    <span className={style.gradient} >
      <span
        style={{backgroundImage: `url(${img})`}}
        className={style.image}/>
      {qty && <span className={style.last}>{`+${qty}`}</span>}
    </span>
  )
}
export default CircleIcon
