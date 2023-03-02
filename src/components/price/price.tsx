import React, {FC}  from 'react';
import style from './price.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
interface IPriceProps {
  children: number;
  qty?: number
}

const Price: FC<IPriceProps> = ({children, qty}) => {
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

export default Price
