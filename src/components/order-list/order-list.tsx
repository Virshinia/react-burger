import React, {useState, FC} from 'react';
import styles from "./order-list.module.css"
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import { useLocation  } from 'react-router-dom';
import OrderCard from "../order-card/order-card";
import Loader from "../loader/loader";
import Modal from "../modal/modal";
import {OrderInfoDetails} from "../order-info-details/order-info-details";
import {clearOrderInfoDetails, showOrderInfoDetails} from "../../services/reducers/websocket";
import {IOrder} from "../../services/reducers/websocket";

interface IOrderList {
  myOrder?: boolean
}

const OrderList:FC<IOrderList> = ({myOrder}) => {

  const dispatch = useAppDispatch();
  const currentOrder = useAppSelector(store => store.orders.currentOrder)
  const [modalIsVisible, setVisibility] = useState(false);

  const changeVisibilityOrderInfoDetails = () => {
    setVisibility(!modalIsVisible);
  }

  const location = useLocation();

  const openDetails = (data: IOrder) => {
    window.history.replaceState(null, "", `${location.pathname}/${data.number}`)
    dispatch(showOrderInfoDetails(data))
    changeVisibilityOrderInfoDetails();
  }

  const closeDetails = () => {
    changeVisibilityOrderInfoDetails()
    dispatch(clearOrderInfoDetails())
  }

  const {orders} = useAppSelector(store => store.orders);

  const ModalForOrderInfo = () => (
    <Modal title={currentOrder?.number} closeModal={closeDetails}>
      {currentOrder && <OrderInfoDetails currentOrder={currentOrder} />}
    </Modal>
  )

  return (
    <section className="mt-5">
      {orders ? <ul className={styles.list}>
        {orders.map(order => (
          <OrderCard myOrder={myOrder} key={order._id} data={order} openDetails={openDetails} />
        ))
        }
      </ul> : <Loader/>}
      {modalIsVisible && currentOrder && <ModalForOrderInfo />}
    </section>
  )
}


export default OrderList
