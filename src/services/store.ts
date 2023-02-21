import { configureStore } from '@reduxjs/toolkit'

import {socketMiddleware} from "./middleware/socketMiddleware";

import {tabSlice} from "./reducers/tab-section";
import {ingredientsSlice} from "./reducers/burger-ingredients";
import {constructorSlice} from "./reducers/burger-constructor";
import {formSlice} from "./reducers/auth";
import {ordersSlice} from "./reducers/websocket";
import {wsInit, startConnection, endConnection, getOrders} from "./reducers/websocket";

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
