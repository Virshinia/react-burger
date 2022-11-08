import React from 'react';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import mainStyles from './main.module.css'
import BurgerConstructor from "../burger-constructor/burger-constructor";
import PropTypes from "prop-types";
import {ingredientPropTypes} from "../../utils/constatants";


const Main = ({data}) => {
    return (
        <main className={mainStyles.main}>
            <BurgerIngredients ingredients={data}/>
            <BurgerConstructor/>
        </main>
    );
}

Main.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired,
};

export default Main