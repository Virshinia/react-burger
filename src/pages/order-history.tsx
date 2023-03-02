import React, {useEffect} from 'react';
import styles from './profile.module.css';
import { useAppDispatch} from "../utils/hooks";
import AsideMenu from "../components/aside-menu/aside-menu";
import OrderList from "../components/order-list/order-list";
import {endConnection, wsInit} from "../services/reducers/websocket";
import {WS_ORDERS} from "../utils/constatants";
import {getCookie} from "../utils/cookies";

export const OrderHistoryPage = () => {

  const dispatch = useAppDispatch();
  const token = getCookie("accessToken");

  useEffect(() => {
    dispatch(wsInit({
      url: `${WS_ORDERS}?token=${token}`
    }));
    return () => {
      dispatch(endConnection())
    };
  }, [dispatch, token]);

  return (
    <main className={styles.wrapper}>
      <AsideMenu/>
      <OrderList myOrder={true}/>
    </main>
  );
}
