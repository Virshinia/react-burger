import React  from 'react';
import style from './circle-icon.module.css'
import PropTypes from "prop-types";

const CircleIcon = ({img, qty}) => {
  return (
    <span className={style.gradient} >
      <span
        style={{backgroundImage: `url(${img})`}}
        className={style.image}/>
      {qty && <span className={style.last}>{`+${qty}`}</span>}
    </span>
  )
}

CircleIcon.propTypes ={
  img: PropTypes.string.isRequired,
  qty: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ])
}
export default CircleIcon
