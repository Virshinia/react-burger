import React from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {checkUser} from "../../utils/constatants";

export function ProtectedRoute({forAuth, element}) {

  const location = useLocation();
  const userIsAuthenticated = useSelector(checkUser);
  const { url } = location.state || {url: { pathname: "/"}};

  if ((forAuth && !userIsAuthenticated)) {
    return <Navigate to="/login" state={{url: location.pathname}}/>
  }
  if ((!forAuth && userIsAuthenticated)) {
    return <Navigate to={url}/>
  }
  return element
}
