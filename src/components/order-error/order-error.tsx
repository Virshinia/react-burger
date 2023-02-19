import React from 'react';
import orderDetailsStyle from "./order-error.module.css";

const OrderError = () => {
  return (
    <div className={orderDetailsStyle.wrapper}>
      <h4 className="text text_type_main-medium mt-4">Упс...</h4>
      <p className="text text_type_main-default text_color_primary mt-8">Что-то пошло не так</p>
      <p className="text text_type_main-default text_color_inactive mt-2">Мы не смогли обработать ваш заказ.<br/> Пожалуйста, попробуйте снова</p>
    </div>
  )
}

export default OrderError
