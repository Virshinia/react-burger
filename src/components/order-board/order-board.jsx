import React from 'react';
import style from './order-board.module.css'

const OrderBoard = () => {
  return (
    <section className={`mt-5 ${style.board}`}>
      <article className={style.wrapper}>
        <div>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <ul className={style.list}>
            <li className="text text_type_digits-default text_color_success">12345</li>
            <li className="text text_type_digits-default text_color_success">12345</li>
          </ul>
        </div>
        <div>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <ul className={style.list}>
            <li className="text text_type_digits-default">12345</li>
          </ul>
        </div>
      </article>
      <article>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <span className={`${style.shadow} text text_type_digits-large`}>1234</span>
      </article>
      <article>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <span className={`${style.shadow} text text_type_digits-large`}>1234</span>
      </article>
    </section>
  )
}
export default OrderBoard
