import React, {FC} from 'react';
import orderDetailsStyle from "./order-details.module.css";
import imageDone from '../../images/done.png'

interface IOrderDetails {
  orderId: number;
  status: string;
}

const OrderDetails:FC<IOrderDetails> = ({orderId, status}) => {
  return (
    <div className={orderDetailsStyle.wrapper}>
      <h4 className={`text text_type_digits-large ${orderDetailsStyle.orderId}`}>{orderId}</h4>
      <p className="text text_type_main-medium text_color_primary mt-8">идентификатор заказа</p>
      <img className="mt-15 mb-15" src={imageDone} alt={status}/>
      <p className="text text_type_main-default text_color_primary">{status}</p>
      <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь ваш заказ на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails
