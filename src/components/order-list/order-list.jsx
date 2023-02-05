import React, {useState} from 'react';
import styles from "./order-list.module.css"
import { useSelector, useDispatch } from "react-redux";
import { useLocation  } from 'react-router-dom';
import OrderCard from "../order-card/order-card";
import Loader from "../loader/loader";
import Modal from "../modal/modal";
import {OrderInfoDetails} from "../order-info-details/order-info-details";
import {clearOrderInfoDetails, showOrderInfoDetails} from "../../services/reducers/websocket";
import PropTypes from "prop-types";


const OrderList = ({myOrder}) => {

  const dispatch = useDispatch();
  const currentOrder = useSelector(store => store.orders.currentOrder)
  const [modalIsVisible, setVisibility] = useState(false);

  const changeVisibilityOrderInfoDetails = () => {
    setVisibility(!modalIsVisible);
  }

  const location = useLocation();

  const openDetails = (data) => {
    window.history.replaceState(null, "", `${location.pathname}/${data.number}`)
    dispatch(showOrderInfoDetails(data))
    changeVisibilityOrderInfoDetails();
  }

  const closeDetails = () => {
    changeVisibilityOrderInfoDetails()
    dispatch(clearOrderInfoDetails())
  }

  const {orders} = useSelector(store => store.orders);

  const ModalForOrderInfo = () => (
    <Modal title={currentOrder.number} closeModal={closeDetails}>
      <OrderInfoDetails currentOrder={currentOrder} />
    </Modal>
  )

  return (
    <section className="mt-5">
      {orders[1] ? <ul className={styles.list}>
        {orders.map(order => (
          <OrderCard myOrder={myOrder} key={order._id} data={order} openDetails={openDetails} />
        ))
        }
      </ul> : <Loader/>}
      {modalIsVisible && <ModalForOrderInfo />}
    </section>
  )
}

OrderList.propTypes ={
  myOrder: PropTypes.bool
}

export default OrderList
