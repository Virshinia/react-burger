import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom"
import Header from '../header/header'
import { getIngredients } from '../../services/reducers/burger-ingredients'
import { useDispatch } from "react-redux";
import {ProtectedRouteElement} from "../protected-route/protected-route";
import {HomePage, LoginPage, RegistrationPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, NotFoundPage} from "../../pages"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile" element={
          <ProtectedRouteElement element={<ProfilePage/>} to="/login"/>
        }/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/registration" element={<RegistrationPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
        <Route path="/ingredients/:id" element={<IngredientPage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
