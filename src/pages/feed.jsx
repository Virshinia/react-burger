import React, {useEffect} from 'react';
import styles from './feed.module.css';
import { useDispatch } from "react-redux";
import {wsInit, endConnection} from "../services/reducers/websocket";
import {WS_ORDERS} from "../utils/constatants";
import OrderList from "../components/order-list/order-list";
import OrderBoard from "../components/order-board/order-board";

export const OrdersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsInit({
      url: `${WS_ORDERS}/all`
    }));
    return () => {
      dispatch(endConnection())
    };
  }, [dispatch]);

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
