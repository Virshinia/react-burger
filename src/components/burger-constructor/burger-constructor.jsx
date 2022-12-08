import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import burgerConstructorStyle from "./burger-constructor.module.css";
import {isBun} from "../../utils/constatants";
import TotalCost from "../total-cost/total-cost";
import ConstructorItem from "../constructor-item/constructor-item";
import {ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN} from "../../services/actions/burger-constructor";
import ConstructorMessage from "../constructor-message/constructor-message";
import { v4 as uuid } from 'uuid';



const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const {bun, others} = useSelector(store => store.burgerConstructor)

  const [,dropRef] = useDrop(()=> ({
    accept: "ingredient",
    drop: (item) => {
      isBun(item) ? handleDropBun (item) :
          handleDropOthers(item)
    }
  }))

  const handleDropOthers = item => {
    dispatch(ADD_INGREDIENT({...item, uuid: uuid()}));
  }

  const handleDropBun = item => {
    dispatch(ADD_BUN({...item, uuid: uuid()}))
  }

  const deleteItem = (item) => {
    const indexDeletedItem = others.indexOf(item);
    dispatch(DELETE_INGREDIENT(indexDeletedItem))
  }

  const renderFewIngredientsForOrder = (array) => {
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

      {!others[0] && !bun._id && <ConstructorMessage/>}
      <ul className={burgerConstructorStyle.list} >
        {bun._id &&
          <ConstructorItem
            key={`${bun.uuid}_top`}
            item={bun}
            style={burgerConstructorStyle.blockedItem}
            type="top"/>}
        {others && renderFewIngredientsForOrder(others)}
        {bun._id &&
          <ConstructorItem
            key={`${bun.uuid}_bottom`}
            item={bun}
            style={burgerConstructorStyle.blockedItem}
            type="bottom"/>}
      </ul>
      {bun._id &&
        <TotalCost
          others={others}
          bun={bun}/>}
    </section>
  )
}

export default BurgerConstructor
