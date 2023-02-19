import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'

import './index.css';
import App from './components/app/app';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import {socketMiddleware} from "./services/middleware/socketMiddleware";

import {tabSlice} from "./services/reducers/tab-section";
import {ingredientsSlice} from "./services/reducers/burger-ingredients";
import {constructorSlice} from "./services/reducers/burger-constructor";
import {formSlice} from "./services/reducers/auth";
import {ordersSlice} from "./services/reducers/websocket";
import {wsInit, startConnection, endConnection, getOrders} from "./services/reducers/websocket";

const wsActions = {
  wsInit,
  startConnection,
  endConnection,
  getOrders
};

const webSocketMiddleWare = socketMiddleware(wsActions);

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: constructorSlice.reducer,
    tab: tabSlice.reducer,
    user: formSlice.reducer,
    orders: ordersSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(webSocketMiddleWare)
  }
});

export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
