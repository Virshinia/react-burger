import React from 'react';
import { CurrencyIcon,Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientStyle from "./burger-ingredient.module.css";
import PropTypes from "prop-types";


const BurgerIngredient = ({img, price, name}) => {
        return (
            <li className={burgerIngredientStyle.ingredient}>
                            <Counter count={1} size="default"/>
                            <img className={burgerIngredientStyle.ingredientImage} src={img} alt={name}/>
                            <div className={burgerIngredientStyle.price}>
                                <span className="text text_type_digits-default">{price}</span>
                                <CurrencyIcon type={"primary"}/>
                            </div>
                            <span className="text text_type_main-default">{name}</span>
                        </li>)
}

BurgerIngredient.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default BurgerIngredient