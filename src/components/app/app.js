import React, {useEffect} from 'react';
import Header from '../header/header'
import Main from "../main/main";
import {getIngredients} from "../../utils/api";
import {BASE_URL} from "../../utils/constatants"
import {IngredientsContext} from "../../services/appContext";

const App = () => {
  const [ingredients, setIngredients] = React.useState([]);

  useEffect(() => {
    getIngredients(`${BASE_URL}/ingredients`)
      .then(ingredientsFromApi => {
        setIngredients(ingredientsFromApi.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }, [])

  return (
    <>
      <Header />
      <IngredientsContext.Provider value={ingredients}>
        <Main />
      </IngredientsContext.Provider>
    </>
  );
}

export default App;
