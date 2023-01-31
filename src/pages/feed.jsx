import React from 'react';
import styles from './feed.module.css';
import OrderList from "../components/order-list/order-list";
import OrderBoard from "../components/order-board/order-board";

export const OrdersPage = () => {

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-medium text_color_primary">Лента заказов</h1>
      <div className={styles.wrapper}>
        <OrderList/>
        <OrderBoard/>
      </div>
    </main>
  );
}
