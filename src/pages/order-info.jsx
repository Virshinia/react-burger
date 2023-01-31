import React from 'react';
import style from './order-info.module.css';
import {useParams} from "react-router-dom";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import {useSelector} from "react-redux";
import Price from "../components/price/price";
import CircleIcon from "../components/circle-icon/circle-icon";

export const OrderInfoPage = () => {
  const {id} = useParams();
  const name = 'Black Hole Singularity острый бургер'

  const {ingredients} = useSelector(store => store.ingredients);
  const img = ingredients[1].image_mobile;

  return (
    <main className={style.wrapper}>
      <h1 className={`text text_type_digits-default ${style.number}`}>#{id}</h1>
      <h2 className="text text_type_main-medium mt-10">{name}</h2>
      <p className="text text_type_main-small text_color_success mt-3">Выполнен</p>
      <h3 className="text text_type_main-medium mt-15">Состав:</h3>
      <ul className={style.list}>
        <li className={style.ingredient}>
          <CircleIcon img={img} />
          <span className="text text_type_main-default">Флюоресцентная булка R2-D3</span>
          <Price qty={2}>20</Price>
        </li>
        <li className={style.ingredient}>
          <CircleIcon img={img} />
          <span className="text text_type_main-default">Флюоресцентная булка R2-D3</span>
          <Price qty={2}>20</Price>
        </li>
      </ul>
      <div className={style.info}><FormattedDate className="text text_type_main-default text_color_inactive" date={new Date()}/><Price>120</Price></div>
    </main>
  );
}
