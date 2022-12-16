import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import { CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Loader from "../loader/loader";
import totalCostStyle from "./total-cost.module.css";
import { ingredientPropTypes } from "../../utils/constatants";
import {clearAllIngredients, getIngredientsForOder, postOrder} from "../../services/reducers/burger-constructor";
import OrderError from "../order-error/order-error";


const TotalCost = ({others, bun}) => {
  const dispatch = useDispatch();
  const error = useSelector(store => store.burgerConstructor.postOrderError);

  const sumOfPrice = () => {
    return others.reduce((total, item) => total + item.price, 0) + bun.price*2;
  }

  const orderStatusText = "Ваш заказ начали готовить";
  const [modalIsVisible, setVisibility] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(sumOfPrice)
    dispatch((getIngredientsForOder([bun._id, ...others.map((item) => item._id)])))
  }, [others, bun, dispatch])

  const {ingredientsForOrder, orderId} = useSelector(store => store.burgerConstructor)

  const handleCloseModal = () => {
    setVisibility(!modalIsVisible);
    dispatch(clearAllIngredients())
  }

  const handlePostOrder = () => {
    dispatch(postOrder(ingredientsForOrder));
    setVisibility(!modalIsVisible);
  }

  const handleModalContent = () => {
    if (orderId === null && !error) {
      return <Loader/>
    } else if (orderId !== null && !error) {
      return <OrderDetails orderId={orderId} status={orderStatusText}/>
    } else {
      return <OrderError/>
    }
  }

  const modalForOrderDetails = <Modal closeModal={handleCloseModal}>
    {handleModalContent()}
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
      {modalIsVisible && modalForOrderDetails}
    </div>
  )
}

TotalCost.propTypes = {
  others: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired,
  bun: PropTypes.object.isRequired
};

export default TotalCost
