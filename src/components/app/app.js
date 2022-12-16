import React, {useEffect} from 'react';
import Header from '../header/header'
import Main from "../main/main";
import { getIngredients } from '../../services/reducers/burger-ingredients'
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
    }, [dispatch])

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
