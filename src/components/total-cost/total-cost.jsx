import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import { CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import totalCostStyle from "./total-cost.module.css";
import {urlForPostOrder, ingredientPropTypes} from "../../utils/constatants";
import {postOrder} from "../../utils/api";

const TotalCost = ({others, bun}) => {

    const sumOfPrice = () => {
        return others.reduce((total, item) => total + item.price, 0) + bun.price*2;
    }

    const orderStatusText = "Ваш заказ начали готовить";
    const [orderStatus, setOrder] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [ingredientsIdsForOrder, setIngredientsIds] = useState([]);

    useEffect(() => {
        setTotalPrice(sumOfPrice)
        setIngredientsIds([bun._id, ...others.map((item) => item._id)])
    }, [others, bun])

    const handleSetOrder = () => {
        setOrder(!orderStatus);
    }

    const handlePostOrder = () => {
        postOrder(urlForPostOrder, ingredientsIdsForOrder)
            .then (data => {
                setOrderId(data.order.number)
                handleSetOrder()
            }
            )
            .catch((err) => {
                console.log(err);
            });
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
                    {orderStatus && modalForOrderDetails}
                </Button>
            </div>
    )
}

TotalCost.propTypes = {
    others: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired,
    bun: PropTypes.object.isRequired
};

export default TotalCost