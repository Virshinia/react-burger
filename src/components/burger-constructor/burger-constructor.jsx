import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import burgerConstructorStyle from "./burger-constructor.module.css";
import {isBun} from "../../utils/constatants";
import TotalCost from "../total-cost/total-cost";
import ConstructorItem from "../constructor-item/constructor-item";
import {DELETE_INGREDIENT} from "../../services/actions/burger-constructor";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const ingredientsInConstructor = useSelector(store => store.burgerConstructor.ingredientsInConstructor);

  const categoryOfIngredients = useMemo(() => {
    const bun = ingredientsInConstructor.filter((item) => isBun(item))[0];
    const others = ingredientsInConstructor.filter((item) => !isBun(item));
    return {bun, others}
  },[ingredientsInConstructor])


  const deleteItem = (id) => {
    dispatch(DELETE_INGREDIENT(id))
    console.log(test)
  }


  const renderFewIngredientsForOrder = (array) => {
    return array.map(item => (
      <ConstructorItem
        key={item._id}
        item={item}
        style={burgerConstructorStyle.defaultItem}
        deleteItem={deleteItem}
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
