import React, {FC, ReactComponentElement} from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from "../../utils/hooks";
import {checkUser} from "../../utils/constatants";

interface IProtectedRoute {
  forAuth: boolean;
  element: ReactComponentElement<any>;
}

export const ProtectedRoute:FC<IProtectedRoute> = ({forAuth, element}) => {

  const location = useLocation();
  const userIsAuthenticated = useAppSelector(checkUser);
  const { url } = location.state || {url: { pathname: "/"}};

  if ((forAuth && !userIsAuthenticated)) {
    return <Navigate to="/login" state={{url: location.pathname}}/>
  }
  if ((!forAuth && userIsAuthenticated)) {
    return <Navigate to={url}/>
  }
  return element
}
