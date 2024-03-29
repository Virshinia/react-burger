import React, {useMemo} from 'react';
import style from './order-board.module.css'
import {useAppSelector} from "../../utils/hooks";
import {IOrder} from "../../services/reducers/websocket";

const OrderBoard = () => {

  const {total, totalToday, orders} = useAppSelector(store => store.orders);

  const {done, inProgress} = useMemo(() => {
    const done = orders.filter((order) => order.status === "done");
    const inProgress = orders.filter((order) => order.status !== "done");
    return {done, inProgress}
  },[orders])

  const renderOrderNumbers = (ordersArr: IOrder[]) => {
    return ordersArr.slice(0,20).map(order => {
      return <li key={order.number} className={`text text_type_digits-default ${(order.status === 'done') ? 'text_color_success': ''}`}>{order.number}</li>
    })
  }

  return (
    <section className={`mt-5 ${style.board}`}>
      <article className={style.wrapper}>
        <div>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
            <ul className={style.list}>
              {renderOrderNumbers(done)}
            </ul>
        </div>
        <div>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <ul className={style.list}>
            {renderOrderNumbers(inProgress)}
          </ul>
        </div>
      </article>
      <article>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <span className={`${style.shadow} text text_type_digits-large`}>{total}</span>
      </article>
      <article>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <span className={`${style.shadow} text text_type_digits-large`}>{totalToday}</span>
      </article>
    </section>
  )
}
export default OrderBoard
