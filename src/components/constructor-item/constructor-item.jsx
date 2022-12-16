import React, {useRef} from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropTypes, isBun } from "../../utils/constatants";
import PropTypes from "prop-types";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {moveIngredient} from "../../services/reducers/burger-constructor";

const ConstructorItem = ({item, style, type, deleteItem, index}) => {

  const dispatch = useDispatch();
  const ref = useRef(null);

  let name = item.name;
  if (type === 'top') {
    name = `${name} (верх)`
  } else if (type === 'bottom') {
    name = `${name} (низ)`
  }


  const [,drop] = useDrop(()=> ({
    accept: "constructorItem",
    collect (monitor){
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(moveIngredient({dragIndex, hoverIndex}));

      item.index = hoverIndex
    }
  }))

const [{isDragging}, drag] = useDrag({
    type: "constructorItem",
    item: () => {
      return {item, index}
    },
    collect: (monitor) => ({
    isDragging: monitor.isDragging()
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (

    <li className={style} style={{opacity}}
        {...(!isBun(item) ? {draggable: true, ref: ref} : {})}
    >
      {!isBun(item) && <DragIcon type="primary" />}
      <ConstructorElement
        handleClose={() => deleteItem(item)}
        isLocked={isBun(item)}
        type={type}
        text={name}
        price={item.price}
        thumbnail={item.image}/>
    </li>
  )
}
ConstructorItem.propTypes = {
  item: PropTypes.shape(ingredientPropTypes).isRequired,
  style: PropTypes.string.isRequired,
  type: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number
};
export default ConstructorItem
