import React  from 'react';
import style from './price.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

const Price = ({children, qty}) => {
  return (
    <div className={style.price}>
      <span className="text text_type_digits-default">
        {qty && `${qty} x `}
        {children}
      </span>
      <CurrencyIcon type={"primary"}/>
    </div>
  )
}

Price.propTypes ={
  children: PropTypes.number.isRequired,
  qty: PropTypes.number
}

export default Price
