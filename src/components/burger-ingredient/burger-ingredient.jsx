import React, {useMemo} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientStyle from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/constatants";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux"


const BurgerIngredient = ({item, openModal}) => {
  const {image, price, name} = item;
  const ingredientsForOrder = useSelector(store => store.burgerConstructor.ingredientsForOrder);

  const counter = useMemo(() => {
    const qty =  ingredientsForOrder.filter((itemForOder) => itemForOder === item._id).length;
    return {qty}
  },[ingredientsForOrder])

  const [, dragRef] = useDrag(() => ({
    type: "ingredient",
    item: item
  }))

  return (
    <li
      ref={dragRef}
      className={burgerIngredientStyle.ingredient}
      onClick={() => openModal(item)}
    >
      {counter.qty > 0 && <Counter count={counter.qty} size="default"/>}
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
