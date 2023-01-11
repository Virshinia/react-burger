import React from 'react';
import styles from './ingredient.module.css';
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Loader from "../components/loader/loader";

export const IngredientPage = () => {

  const {ingredients} = useSelector(store => store.ingredients);
  const {id} = useParams()
  const itemOnPage = ingredients.find((item) => item._id === id);

  return (
    <main className={styles.wrapper}>
      <h1 className="text_type_main-large">Детали ингредиента</h1>
      {itemOnPage? <IngredientDetails item={itemOnPage} /> : <Loader text="Загрузка..."/>}
    </main>
  );
}
