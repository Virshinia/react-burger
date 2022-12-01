import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'

import './index.css';
import App from './components/app/app';

import { Provider } from 'react-redux';
import burgerReducer from "./services/reducers/index";
import tabReducer from "./services/reducers/tab-section";


const store = configureStore({
  reducer: {
    burger: burgerReducer,
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
