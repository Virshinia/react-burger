import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import { CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import totalCostStyle from "./total-cost.module.css";
import { ingredientPropTypes } from "../../utils/constatants";
import {GET_INGREDIENTS_FOR_ORDER, setOrderId } from "../../services/actions/burger-constructor";


const TotalCost = ({others, bun}) => {
  const dispatch = useDispatch();

  const sumOfPrice = () => {
    return others.reduce((total, item) => total + item.price, 0) + bun.price*2;
  }

  const orderStatusText = "Ваш заказ начали готовить";
  const [orderStatus, setOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(sumOfPrice)
    dispatch((GET_INGREDIENTS_FOR_ORDER([bun._id, ...others.map((item) => item._id)])))
  }, [others, bun])

  const {ingredientsForOrder, orderId} = useSelector(store => store.burgerConstructor)

  const handleSetOrder = () => {
    setOrder(!orderStatus);
  }

  const handlePostOrder = () => {
    dispatch(setOrderId(ingredientsForOrder));
    handleSetOrder();
  }

  const modalForOrderDetails = <Modal closeModal={handleSetOrder}>
    {orderId !== null && <OrderDetails orderId={orderId} status={orderStatusText}/>}
  </Modal>

  return (
    <div className={totalCostStyle.info}>
      <span className={totalCostStyle.total}>
        <span className="text text_type_digits-medium">{totalPrice}</span>
        <CurrencyIcon type="primary" />
      </span>
      <Button htmlType="button" type="primary" size="medium" onClick={handlePostOrder}>
        Оформить заказ
      </Button>
      {orderStatus && modalForOrderDetails}
    </div>
  )
}

TotalCost.propTypes = {
  others: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired,
  bun: PropTypes.object.isRequired
};

export default TotalCost
