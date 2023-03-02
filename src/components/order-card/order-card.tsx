import React, {useMemo, FC}  from 'react';
import {useAppSelector} from "../../utils/hooks";
import style from './order-card.module.css'
import Price from "../price/price";
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import CircleIcon from "../circle-icon/circle-icon";
import {IOrder} from "../../services/reducers/websocket";

interface IOrderCard {
  data: IOrder;
  openDetails: (data: IOrder) => void;
  myOrder?: boolean
}
const OrderCard:FC<IOrderCard> = ({data, openDetails, myOrder}) => {

  const all = useAppSelector(store => store.ingredients.ingredients);
  const {name, number, createdAt, status} = data;

  const ingredients = useMemo(() => {
    const checkedIngredients = data.ingredients.filter(item => Boolean(item));
    return checkedIngredients.map((item) => (
      all.find((ingredient) => ingredient._id === item)
    ))
  }, [data, all]);

  const price = useMemo(()=> {
    return ingredients.reduce(function(total, item) {
      if (item) {return total + item.price}
      else return total
    }, 0)
  }, [ingredients])

  const extraIngredients = (index: number, length: number) => {
    const qty = length - 1 - index;
    if (index === 4 && qty > 0) {
      return qty
    }
    return false
  }

  return (
    <li className={style.card}
        onClick={() => openDetails(data)}>
      <div className={style.info}>
        <span className="text text_type_digits-default">#{number}</span>
        <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date(createdAt)}/>
      </div>
      <p className="text text_type_main-medium mt-6">{name}</p>
      {myOrder && <p className={`text text_type_main-small mt-2 ${status === "done" ? "text_color_success" : ""}`}>
        {status === "done" ? "Выполнен" : status === "pending" ? "Готовится" : "Отменен"}
      </p>}
      <div className={`${style.info} mt-6`}>
        <ul className={style.ingredients}>
          {ingredients.map((item, index) => {
            if (item) {
              return (
                <li key={item._id + index} className={`${style.ingredient} ${index > 4 ? `${style.hidden}` : ''}`}>
                  <CircleIcon qty={extraIngredients(index, ingredients.length)} img={item.image_mobile}/>
                </li>)
            }
          })}
        </ul>
        <Price>{price}</Price>
      </div>
    </li>
  )
}


export default OrderCard
