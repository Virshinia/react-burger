import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";

export function ProtectedRouteElement({ element, to }) {
  //Get user
  const {userIsAuthenticated} = useSelector(store => store.user);
  return (
    userIsAuthenticated ? element : (<Navigate to={to}/>)
  );
}
