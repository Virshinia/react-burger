import React from 'react';
import styles from './profile.module.css';
import AsideMenu from "../components/aside-menu/aside-menu";
import OrderList from "../components/order-list/order-list";

export const OrderHistoryPage = () => {

  return (
    <main className={styles.wrapper}>
      <AsideMenu/>
      <OrderList/>
    </main>
  );
}
