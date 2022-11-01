import React from 'react';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import mainStyles from './main.module.css'
import BurgerConstructor from "../burger-constructor/burger-constructor";


const Main = ({data}) => {
        return (
            <div className={mainStyles.main}>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor/>
            </div>
        );
}


export default Main