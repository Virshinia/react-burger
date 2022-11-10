import React from 'react';
import { CurrencyIcon,Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientStyle from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";


const BurgerIngredient = ({img, price, name, calories, fat, proteins, carbohydrates}) => {

    const [modalIsVisible, setVisibility] = React.useState(false);

    const changeVisibilityIngredientDetails = () => {
        setVisibility(!modalIsVisible);
    }

    const modalForIngredientDetails = (
        <Modal
            title="Детали ингредиента"
            closeModal={changeVisibilityIngredientDetails}>
            <IngredientDetails
                name={name}
                img={img}
                calories={calories}
                fat={fat}
                proteins={proteins}
                carbohydrates={carbohydrates}
            />
        </Modal>)

    return (
        <li className={burgerIngredientStyle.ingredient} onClick={changeVisibilityIngredientDetails}>
            <Counter count={1} size="default"/>
            <img className={burgerIngredientStyle.ingredientImage} src={img} alt={name}/>
            <div className={burgerIngredientStyle.price}>
                <span className="text text_type_digits-default">{price}</span>
                <CurrencyIcon type={"primary"}/>
            </div>
            <span className="text text_type_main-default">{name}</span>
            {modalIsVisible && modalForIngredientDetails}
        </li>

    )
}

BurgerIngredient.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    calories: PropTypes.number,
    fat: PropTypes.number,
    proteins: PropTypes.number,
    carbohydrates: PropTypes.number,
};

export default BurgerIngredient