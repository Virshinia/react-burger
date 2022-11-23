import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientStyle from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/constatants";


const BurgerIngredient = ({item, openModal}) => {
  const {image, price, name} = item;

  return (
    <li className={burgerIngredientStyle.ingredient} onClick={() => openModal(item)}>
      <Counter count={1} size="default"/>
      <img className={burgerIngredientStyle.ingredientImage} src={image} alt={name}/>
      <div className={burgerIngredientStyle.price}>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type={"primary"}/>
      </div>
      <span className="text text_type_main-default">{name}</span>
    </li>
  )
}

BurgerIngredient.propTypes = {
  item: PropTypes.shape(ingredientPropTypes).isRequired,
};

export default BurgerIngredient
