import { createSlice } from '@reduxjs/toolkit'

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number
}

interface IOrderState {
  wsInit: boolean,
  wsConnected: boolean,
  error: string,
  orders: IOrder[],
  currentOrder: IOrder | null,
  total: number,
  totalToday: number
}

export interface IWsActions {
  wsInit: typeof wsInit;
  endConnection: typeof endConnection;
  startConnection: typeof startConnection;
  getOrders: typeof getOrders;
}

const initialState: IOrderState = {
  wsInit: false,
  wsConnected: false,
  error: '',
  orders: [],
  currentOrder: null,
  total: 0,
  totalToday: 0
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    wsInit: (state, action) => {
      state.wsInit = true;
    },
    startConnection: (state) => {
      state.wsConnected = true;
    },
    endConnection: (state) => {
      state.wsConnected = false;
      state.wsInit = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    getOrders: (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    showOrderInfoDetails: (state, action) => {
      state.currentOrder = action.payload
    },
    clearOrderInfoDetails: (state) => {
      state.currentOrder = null;
    }
  }
})

export const { wsInit, startConnection, endConnection, getOrders, showOrderInfoDetails, clearOrderInfoDetails } = ordersSlice.actions
export default ordersSlice.reducer;
