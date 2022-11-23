import React from 'react';
import ingredientDetailsStyle from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/constatants";


const IngredientDetails = ({item}) => {
  const {image_large, name, calories, fat, proteins, carbohydrates} = item;

  return (
    <div className={ingredientDetailsStyle.wrapper}>
      <img className={ingredientDetailsStyle.image} src={image_large} alt={name}/>
      <h4 className="text text_type_main-medium mt-4">{name}</h4>
      <dl className={`${ingredientDetailsStyle.nutrition} mt-8`}>
        <div className={ingredientDetailsStyle.nutritionItem}>
          <dt className="text text_type_main-default text_color_inactive">Калории,ккал</dt>
          <dd className="text text_type_digits-default text_color_inactive">{calories}</dd>
        </div>
        <div className={ingredientDetailsStyle.nutritionItem}>
          <dt className="text text_type_main-default text_color_inactive">Белки, г</dt>
          <dd className="text text_type_digits-default text_color_inactive">{proteins}</dd>
        </div>
        <div className={ingredientDetailsStyle.nutritionItem}>
          <dt className="text text_type_main-default text_color_inactive">Жиры, г</dt>
          <dd className="text text_type_digits-default text_color_inactive">{fat}</dd>
        </div>
        <div className={ingredientDetailsStyle.nutritionItem}>
          <dt className="text text_type_main-default text_color_inactive">Углеводы, г</dt>
          <dd className="text text_type_digits-default text_color_inactive">{carbohydrates}</dd>
        </div>
      </dl>
    </div>
  )
}

IngredientDetails.propTypes = {
  item: PropTypes.shape(ingredientPropTypes).isRequired,
};

export default IngredientDetails
