import React from 'react';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import mainStyles from './main.module.css'
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Main = () => {

    return (
        <main className={mainStyles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
    );
};

export default Main
