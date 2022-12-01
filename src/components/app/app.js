import React, {useEffect} from 'react';
import Header from '../header/header'
import Main from "../main/main";
import { setIngredients } from '../../services/actions/index'
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIngredients())
    }, [])

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
