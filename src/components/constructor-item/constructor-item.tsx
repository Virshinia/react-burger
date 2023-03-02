import React, {useRef, FC} from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { isBun } from "../../utils/constatants";
import type { XYCoord } from 'dnd-core'
import {useDrag, useDrop} from "react-dnd";
import {useAppDispatch} from "../../utils/hooks";
import {moveIngredient, TConstructorIngredient} from "../../services/reducers/burger-constructor";

interface IConstructorItemProp {
  item: TConstructorIngredient;
  style: string;
  type?: "top" | "bottom";
  deleteItem?: (item: TConstructorIngredient) => void;
  index?: number
}


interface DragItem {
  index: number;
  type: string;
}

const ConstructorItem:FC<IConstructorItemProp> = ({item, style, type, deleteItem, index}) => {

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  let name = item.name;
  if (type === 'top') {
    name = `${name} (верх)`
  } else if (type === 'bottom') {
    name = `${name} (низ)`
  }


  const [,drop] = useDrop<DragItem, void>({
    accept: "constructorItem",
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      if (hoverIndex === undefined) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(moveIngredient({dragIndex, hoverIndex}));

      item.index = hoverIndex
    }
  })

const [{isDragging}, drag] = useDrag({
    type: "constructorItem",
    item: () => {
      return {index}
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
        handleClose={() => deleteItem && deleteItem(item)}
        isLocked={isBun(item)}
        type={type}
        text={name}
        price={item.price}
        thumbnail={item.image}/>
    </li>
  )
}

export default ConstructorItem
