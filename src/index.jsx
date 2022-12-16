import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'

import './index.css';
import App from './components/app/app';

import { Provider } from 'react-redux';
import {tabSlice} from "./services/reducers/tab-section";
import {ingredientsSlice} from "./services/reducers/burger-ingredients";
import {constructorSlice} from "./services/reducers/burger-constructor";

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    burgerConstructor: constructorSlice.reducer,
    tab: tabSlice.reducer,
  }
});


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
);
