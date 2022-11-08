import React from 'react';
import ingredientDetailsStyle from "./ingredient-details.module.css";
import PropTypes from "prop-types";


const IngredientDetails = ({img, name, calories, fat, proteins, carbohydrates}) => {
        return (
            <div className={ingredientDetailsStyle.wrapper}>
                <img className={ingredientDetailsStyle.image} src={img} alt={name}/>
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
            </div>)
}

IngredientDetails.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number,
    carbohydrates:PropTypes.number,
    fat: PropTypes.number,
    proteins: PropTypes.number,
};

export default IngredientDetails