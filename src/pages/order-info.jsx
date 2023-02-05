import React, { useEffect } from 'react';
import style from './order-info.module.css';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import {endConnection, wsInit} from "../services/reducers/websocket";
import {WS_ORDERS} from "../utils/constatants";
import Loader from "../components/loader/loader";
import {OrderInfoDetails} from "../components/order-info-details/order-info-details";

export const OrderInfoPage = () => {

  let {id} = useParams();
  id = Number(id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsInit({
      url: `${WS_ORDERS}/all`
    }));
    return () => {
      dispatch(endConnection())
    };
  }, [dispatch]);

  const {orders} = useSelector(store => store.orders);
  const currentOrder = orders.find((item) => item.number === id);

  return (
    <main className={style.wrapper}>
      <h1 className={`text text_type_digits-default ${style.number}`}>#{id}</h1>
      { currentOrder ? <OrderInfoDetails currentOrder={currentOrder} /> : <Loader text="Загружаем детали заказа..." />}
    </main>
  );
}
