import React, {useState, useEffect, FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import { useNavigate }  from 'react-router-dom';
import { CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Loader from "../loader/loader";
import totalCostStyle from "./total-cost.module.css";
import { checkUser } from "../../utils/constatants";
import {clearAllIngredients, getIngredientsForOder, postOrder} from "../../services/reducers/burger-constructor";
import OrderError from "../order-error/order-error";
import {TConstructorIngredient} from "../../services/reducers/burger-constructor";

interface ITotalCostProps {
  others: Array<TConstructorIngredient>;
  bun: TConstructorIngredient
}

const TotalCost: FC<ITotalCostProps> = ({others, bun}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector((store) => store.burgerConstructor.postOrderError);
  const userIsAuthenticated = useAppSelector(checkUser);

  const sumOfPrice = () => {
    return others.reduce((total, item) => total + item.price, 0) + bun.price*2;
  }

  const orderStatusText = "Ваш заказ начали готовить";
  const [modalIsVisible, setVisibility] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(sumOfPrice)
    dispatch((getIngredientsForOder([bun._id, ...others.map((item) => item._id), bun._id])))
  }, [others, bun, dispatch])

  const {ingredientsForOrder, orderId} = useAppSelector(store => store.burgerConstructor)

  const handleCloseModal = () => {
    setVisibility(!modalIsVisible);
    dispatch(clearAllIngredients())
  }

  const handlePostOrder = () => {
    if (userIsAuthenticated) {
      dispatch(postOrder(ingredientsForOrder));
      setVisibility(!modalIsVisible);
    } else {
     navigate('/login')
    }
  }

  const handleModalContent = () => {
    if (orderId === null && !error) {
      return <Loader text="Мы обрабатываем ваш заказ..."/>
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
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={handlePostOrder}
      >
        Оформить заказ
      </Button>
      {modalIsVisible && modalForOrderDetails}
    </div>
  )
}

export default TotalCost
