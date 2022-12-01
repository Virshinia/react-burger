import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'

import './index.css';
import App from './components/app/app';

import { Provider } from 'react-redux';
import ingredientsReducer from "./services/reducers/burger-ingredients";
import tabReducer from "./services/reducers/tab-section";
import constructorReducer from "./services/reducers/burger-constructor";


const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    tab: tabReducer
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
