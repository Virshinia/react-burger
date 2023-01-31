import React  from 'react';
import {useSelector} from "react-redux";
import style from './order-card.module.css'
import Price from "../price/price";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import CircleIcon from "../circle-icon/circle-icon";

const OrderCard = ({openDetails}) => {

  const {ingredients} = useSelector(store => store.ingredients);
  const img = ingredients[1].image_mobile;

  const number = 34535;
  const name = 'Stellar Burger deluxe'
  const price = 123;

  return (
    <li className={style.card}
        onClick={() => openDetails(number)}>
      <div className={style.info}>
        <span className="text text_type_digits-default">#{number}</span>
        <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date()}/>
      </div>
      <span className="text text_type_main-medium">{name}</span>
      <div className={style.info}>
        <ul className={style.ingredients}>
          <li className={style.ingredient}><CircleIcon img={img}/></li>
          <li className={style.ingredient}><CircleIcon img={img}/></li>
          <li className={style.ingredient}><CircleIcon img={img}/></li>
        </ul>
        <Price>{price}</Price>
      </div>
    </li>
  )
}

export default OrderCard
