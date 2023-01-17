import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom"
import Header from '../header/header'
import { getIngredients } from '../../services/reducers/burger-ingredients'
import { getUser } from "../../services/reducers/auth";
import { useDispatch } from "react-redux";
import {ProtectedRoute} from "../protected-route/protected-route";
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage,
  OrderHistoryPage
} from "../../pages"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    }, [dispatch])

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile" >
          <Route index element={<ProtectedRoute forAuth={true} element={<ProfilePage/>}/>} />
          <Route path="orders" element={<ProtectedRoute forAuth={true} element={<OrderHistoryPage/>}/>}/>
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
