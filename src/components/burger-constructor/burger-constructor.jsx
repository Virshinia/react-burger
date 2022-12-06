import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import burgerConstructorStyle from "./burger-constructor.module.css";
import {isBun} from "../../utils/constatants";
import TotalCost from "../total-cost/total-cost";
import ConstructorItem from "../constructor-item/constructor-item";
import {ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN, GET_INGREDIENTS_IN_CONSTRUCTOR} from "../../services/actions/burger-constructor";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const {ingredients} = useSelector(store => store.ingredients);

  useEffect(() => {
    const bun = ingredients.filter((item) => isBun(item))[0];
    const others = ingredients.filter((item) => !isBun(item));
    dispatch(GET_INGREDIENTS_IN_CONSTRUCTOR({bun, others}))
  }, [ingredients, dispatch])

  const {bun, others} = useSelector(store => store.burgerConstructor)

  const [,dropRef] = useDrop(()=> ({
    accept: "ingredient",
    drop: (item) => {
      isBun(item) ? handleDropBun (item) :
          handleDropOthers(item)
    }
  }))

  const handleDropOthers = item => {
    dispatch(ADD_INGREDIENT(item))
  }

  const handleDropBun = item => {
    dispatch(ADD_BUN(item))
  }

  const deleteItem = (item) => {
    const indexDeletedItem = others.indexOf(item);
    dispatch(DELETE_INGREDIENT(indexDeletedItem))
  }

  const renderFewIngredientsForOrder = (array) => {
    return array.map((item, index) => (
      <ConstructorItem
        key={`${item._id}_${index}`}
        index={index}
        item={item}
        style={burgerConstructorStyle.defaultItem}
        deleteItem={deleteItem}
      />
    ))
  }

  return (
    <section className="mt-25" ref={dropRef}>
      <ul className={burgerConstructorStyle.list} >
        {bun && bun._id &&
          <ConstructorItem
            key={`${bun._id}_top`}
            item={bun}
            style={burgerConstructorStyle.blockedItem}
            type="top"/>}
        {others && renderFewIngredientsForOrder(others)}
        {bun && bun._id &&
          <ConstructorItem
            key={`${bun._id}_bottom`}
            item={bun}
            style={burgerConstructorStyle.blockedItem}
            type="bottom"/>}
      </ul>
      {bun &&
        <TotalCost
          others={others}
          bun={bun}/>}
    </section>
  )
}

export default BurgerConstructor
