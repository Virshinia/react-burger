import React, {useMemo, FC} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientStyle from "./burger-ingredient.module.css";
import {useDrag} from "react-dnd";
import {useAppSelector} from "../../utils/hooks";
import {IIngredientPropTypes} from "../../utils/common-interfaces";

interface IBurgerIngredient {
  item: IIngredientPropTypes;
  openModal: (item:IIngredientPropTypes) => void
}

const BurgerIngredient:FC<IBurgerIngredient> = ({item, openModal}) => {
  const {image, price, name, _id} = item;
  const ingredientsForOrder = useAppSelector(store => store.burgerConstructor.ingredientsForOrder);

  const counter = useMemo(() => {
    const qty = ingredientsForOrder.filter((itemForOder) => itemForOder === _id).length;
    return {qty}
  },[ingredientsForOrder, _id])

  const [, dragRef] = useDrag(() => ({
    type: "ingredient",
    item: () => { return {item} }
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


export default BurgerIngredient
