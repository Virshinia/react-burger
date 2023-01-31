import React from 'react';
import styles from "./order-list.module.css"
import { useNavigate } from 'react-router-dom';
import OrderCard from "../order-card/order-card";


const OrderList = () => {

  const navigate = useNavigate();
  const openDetails = (number) => {
    navigate(`${number}`)
  }

  return (
    <section className="mt-5">
      <ul className={styles.list}>
        <OrderCard openDetails={openDetails}/>
      </ul>
    </section>
  )
}
export default OrderList
