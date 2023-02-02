import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wsInit: false,
  wsConnected: false,
  error: '',
  orders: [],
  currentOrder: {},
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
    startConnection: (state, action) => {
      state.wsConnected = true;
    },
    endConnection: (state, action) => {
      state.wsConnected = false;
      state.wsInit = false;
      state.orders = [];
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
      state.currentOrder = {};
    }
  }
})

export const { wsInit, startConnection, endConnection, closeConnection, getOrders, showOrderInfoDetails, clearOrderInfoDetails } = ordersSlice.actions
export default ordersSlice.reducer;
