import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";

const BurgerIngredients = ({ingredients}) => {
        const [current, setCurrent] = React.useState('булки');
        return (
            <section className="mt-10">
                <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
                <div style={{ display: 'flex' }}>
                    <Tab value="булки" active={current === 'булки'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="соусы" active={current === 'соусы'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="начинки" active={current === 'начинки'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <article className={burgerIngredientsStyle.ingredients}>
                    <h3 className="text text_type_main-medium">Булки</h3>
                    <ul className={burgerIngredientsStyle.category}>
                        {
                        ingredients.map(item => (
                           item.type === 'bun' && <BurgerIngredient key={item._id} img={item.image_large} name={item.name} price={item.price}/>
                        ))}
                    </ul>
                    <h3 className="text text_type_main-medium">Соусы</h3>
                    <ul className={burgerIngredientsStyle.category}>
                        {
                            ingredients.map(item => (
                                item.type === 'sauce' && <BurgerIngredient key={item._id} img={item.image_large} name={item.name} price={item.price}/>
                            ))}
                    </ul>
                    <h3 className="text text_type_main-medium">Начинки</h3>
                    <ul className={burgerIngredientsStyle.category}>
                        {
                            ingredients.map(item => (
                                item.type === 'main' && <BurgerIngredient key={item._id} img={item.image_large} name={item.name} price={item.price}/>
                            ))}
                    </ul>

                </article>
            </section>)
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngredients