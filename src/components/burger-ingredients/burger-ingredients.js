import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import {INGREDIENT_TYPES, ingredientPropTypes} from '../../utils/constatants';


const BurgerIngredients = ({ingredients}) => {
    const [current, setCurrent] = React.useState(INGREDIENT_TYPES.bun);
    return (
        <section className="mt-10">
            <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
            <div style={{ display: 'flex' }}>
                <Tab value={INGREDIENT_TYPES.bun} active={current === `${INGREDIENT_TYPES.bun}`} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value={INGREDIENT_TYPES.sauce} active={current === `${INGREDIENT_TYPES.sauce}`} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value={INGREDIENT_TYPES.main} active={current === `${INGREDIENT_TYPES.main}`} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <article className={burgerIngredientsStyle.ingredients}>
                <h3 className="text text_type_main-medium">Булки</h3>
                <ul className={burgerIngredientsStyle.category}>
                    {ingredients.map(item => (
                        item.type === INGREDIENT_TYPES.bun &&
                        <BurgerIngredient
                            key={item._id}
                            img={item.image_large}
                            name={item.name}
                            price={item.price}/>
                    ))}
                </ul>
                <h3 className="text text_type_main-medium">Соусы</h3>
                <ul className={burgerIngredientsStyle.category}>
                    {ingredients.map(item => (
                        item.type === INGREDIENT_TYPES.sauce &&
                        <BurgerIngredient
                            key={item._id}
                            img={item.image_large}
                            name={item.name}
                            price={item.price}/>
                    ))}
                </ul>
                <h3 className="text text_type_main-medium">Начинки</h3>
                <ul className={burgerIngredientsStyle.category}>
                    {ingredients.map(item => (
                        item.type === INGREDIENT_TYPES.main &&
                        <BurgerIngredient
                            key={item._id}
                            img={item.image_large}
                            name={item.name}
                            price={item.price}/>
                    ))}
                </ul>
            </article>
        </section>)
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientPropTypes)).isRequired,
};

export default BurgerIngredients