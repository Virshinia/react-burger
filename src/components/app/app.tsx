import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import Header from '../header/header'
import { getIngredients } from '../../services/reducers/burger-ingredients'
import { getUser } from "../../services/reducers/auth";
import { useAppDispatch} from "../../utils/hooks";
import { ProtectedRoute } from "../protected-route/protected-route";
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage,
  OrderHistoryPage,
  OrdersPage,
  OrderInfoPage
} from "../../pages"
import {getCookie} from "../../utils/cookies";

const App = () => {
  const dispatch = useAppDispatch();
  const refreshToken = getCookie('refreshToken');

  useEffect(() => {
    dispatch(getIngredients());
    }, [dispatch])

  useEffect(() => {
    if (refreshToken) {
      dispatch(getUser());
    }
  }, [dispatch, refreshToken])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile" >
          <Route index element={<ProtectedRoute forAuth={true} element={<ProfilePage/>}/>} />
          <Route path="orders" element={<ProtectedRoute forAuth={true} element={<OrderHistoryPage/>}/>}/>
          <Route path="orders/:id" element={<ProtectedRoute forAuth={true} element={<OrderInfoPage/>}/>}/>
        </Route>
        <Route path="/feed" >
          <Route index element={<OrdersPage/>}/>
          <Route path=":id" element={<OrderInfoPage/>}/>
        </Route>
        <Route path="/login" element={<ProtectedRoute forAuth={false} element={<LoginPage/>}/>}/>
        <Route path="/registration" element={<ProtectedRoute forAuth={false} element={<RegistrationPage/>} />} />
        <Route path="/forgot-password" element={<ProtectedRoute forAuth={false} element={<ForgotPasswordPage/>} />} />
        <Route path="/reset-password" element={<ProtectedRoute forAuth={false} element={<ResetPasswordPage/>} />} />
        <Route path="/ingredients/:id" element={<IngredientPage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
