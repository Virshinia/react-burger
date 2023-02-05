import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import style from './order-info-details.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import Price from "../price/price";
import CircleIcon from "../circle-icon/circle-icon";
import PropTypes from "prop-types";

export const OrderInfoDetails = ({currentOrder}) => {

  const all = useSelector(store => store.ingredients.ingredients);
  const {checkedIngredients, price} = useMemo(() => {
    let checkedIngredients;
    let price = 0;

    if (currentOrder) {
      checkedIngredients = currentOrder.ingredients.filter(item => Boolean(item) === true).map((item) => (
        all.find((ingredient) => ingredient._id === item)))
      price = checkedIngredients.reduce((total, item) => total + item.price, 0)
    }

    return {checkedIngredients, price};

  }, [currentOrder, all]);


  const countedIngredients = useMemo(()=> {
    if (checkedIngredients) {
      const map = new Map();

      checkedIngredients.forEach(ingredient => {
        let qty = 1;
        if(map.has(ingredient)){
          qty = map.get(ingredient) + 1;
        }
        map.set(ingredient, qty)})

      return Array.from(map, ([ingredient, qty]) => ({ ingredient, qty }));
    }}, [checkedIngredients])

  return (
    <>
      <h2 className="text text_type_main-medium mt-10">{currentOrder.name}</h2>
      <p className={`text text_type_main-small mt-3 ${currentOrder.status === "done" ? "text_color_success" : ""}`}>
        {currentOrder.status === "done" ? "Выполнен" : currentOrder.status === "pending" ? "Готовится" : "Отменен"}
      </p>
          <h3 className="text text_type_main-medium mt-15 mb-6">Состав:</h3>
          <ul className={style.list}>
            {countedIngredients.map(item => (
              <li key={item.ingredient._id} className={style.ingredient}>
          <CircleIcon img={item.ingredient.image_mobile} />
            <span className="text text_type_main-default">{item.ingredient.name}</span>
            <Price qty={item.qty}>{item.ingredient.price}</Price>
          </li>
            ))}
          </ul>
          <div className={`mt-10 ${style.info}`}>
            <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(currentOrder.createdAt)}/>
            <Price>{price}</Price>
          </div></>
  );
}

OrderInfoDetails.propTypes = {
  currentOrder: PropTypes.object.isRequired,
}
