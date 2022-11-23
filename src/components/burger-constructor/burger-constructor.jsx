import React, {useContext, useMemo} from 'react';
import burgerConstructorStyle from "./burger-constructor.module.css";
import {isBun} from "../../utils/constatants";
import {IngredientsContext} from "../../services/appContext";
import TotalCost from "../total-cost/total-cost";
import ConstructorItem from "../constructor-item/constructor-item";

const BurgerConstructor = () => {
  const ingredients = useContext(IngredientsContext);
  const categoryOfIngredients = useMemo(() => {
    const bun = ingredients.filter((item) => isBun(item))[0];
    const others = ingredients.filter((item) => !isBun(item));
    return {bun, others}
  },[ingredients])


  const renderFewIngredientsForOrder = (array) => {
    return array.map(item => (
      <ConstructorItem
        key={item._id}
        item={item}
        style={burgerConstructorStyle.defaultItem}
      />
    ))
  }

  return (
    <section className="mt-25">
      <ul className={burgerConstructorStyle.list}>
        {categoryOfIngredients.bun &&
          <ConstructorItem
            key={`${categoryOfIngredients.bun._id}_top`}
            item={categoryOfIngredients.bun}
            style={burgerConstructorStyle.blockedItem}
            type="top"/>}
        {renderFewIngredientsForOrder(categoryOfIngredients.others)}
        {categoryOfIngredients.bun &&
          <ConstructorItem
            key={`${categoryOfIngredients.bun._id}_bottom`}
            item={categoryOfIngredients.bun}
            style={burgerConstructorStyle.blockedItem}
            type="bottom"/>}
      </ul>
      {categoryOfIngredients.bun &&
        <TotalCost
          others={categoryOfIngredients.others}
          bun={categoryOfIngredients.bun}/>}
    </section>
  )
}

export default BurgerConstructor
