import React, {useEffect} from 'react';
import styles from './profile.module.css';
import { useDispatch } from "react-redux";
import AsideMenu from "../components/aside-menu/aside-menu";
import OrderList from "../components/order-list/order-list";
import {endConnection, wsInit} from "../services/reducers/websocket";
import {WS_ORDERS} from "../utils/constatants";

export const OrderHistoryPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsInit({
      url: `${WS_ORDERS}/orders`,
      userIsAuthenticated: true
    }));
    return () => {
      dispatch(endConnection())
    };
  }, [dispatch]);

  return (
    <main className={styles.wrapper}>
      <AsideMenu/>
      <OrderList myOrder={true}/>
    </main>
  );
}
