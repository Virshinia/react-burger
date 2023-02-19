import React from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {useDrop} from "react-dnd";
import burgerConstructorStyle from "./burger-constructor.module.css";
import {isBun} from "../../utils/constatants";
import TotalCost from "../total-cost/total-cost";
import ConstructorItem from "../constructor-item/constructor-item";
import {
  addBun,
  addIngredient,
  deleteIngredient,
  TConstructorIngredient
} from "../../services/reducers/burger-constructor";
import ConstructorMessage from "../constructor-message/constructor-message";
import { v4 as uuid } from 'uuid';
import {IIngredientPropTypes} from "../../utils/common-interfaces";

interface DragItem {
  type: string;
  item: IIngredientPropTypes;
}

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const {bun, others} = useAppSelector(store => store.burgerConstructor)

  const [,dropRef] = useDrop<DragItem, void>(()=> ({
    accept: "ingredient",
    drop: ({item}) => {
      isBun(item) ? handleDropBun(item) :
          handleDropOthers(item)
    }
  }))

  const handleDropOthers = (item: IIngredientPropTypes) => {
    dispatch(addIngredient({...item, uuid: uuid()}));
  }

  const handleDropBun = (item: IIngredientPropTypes) => {
    dispatch(addBun({...item, uuid: uuid()}))
  }

  const deleteItem = (item: TConstructorIngredient) => {
    dispatch(deleteIngredient(item.uuid))
  }

  const renderFewIngredientsForOrder = (array: TConstructorIngredient[]) => {
    return array.map((item, index) => (
      <ConstructorItem
        key={item.uuid}
        index={index}
        item={item}
        style={burgerConstructorStyle.defaultItem}
        deleteItem={deleteItem}
      />
    ))
  }

  return (
    <section className="mt-25" ref={dropRef}>

      {!others[0] && !bun && <ConstructorMessage/>}
      <ul className={burgerConstructorStyle.list} >
        {bun &&
          <ConstructorItem
            key={`${bun.uuid}_top`}
            item={bun}
            style={burgerConstructorStyle.blockedItem}
            type="top"/>}
        {others && renderFewIngredientsForOrder(others)}
        {bun &&
          <ConstructorItem
            key={`${bun.uuid}_bottom`}
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
