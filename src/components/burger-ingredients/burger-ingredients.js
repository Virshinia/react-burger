import React, {useContext, useState, useMemo} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {INGREDIENT_TYPES} from '../../utils/constatants';
import {IngredientsContext} from "../../services/appContext";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";


const BurgerIngredients = () => {
  const [current, setCurrent] = useState(INGREDIENT_TYPES.bun);
  const [modalIsVisible, setVisibility] = useState(false);
  const [detailsForModal, setDetails] = useState({});
  const ingredients = useContext(IngredientsContext);

  const changeVisibilityIngredientDetails = (item) => {
    setVisibility(!modalIsVisible);
    setDetails(item);
  }

  const ModalForIngredientDetails = () => {
    return (
      <Modal title="Детали ингредиента"
             closeModal={changeVisibilityIngredientDetails}>
        <IngredientDetails item={detailsForModal} />
      </Modal>
    )
  }

  const createCategory = (array, categoryName) => {
    return array.map(item => (
      item.type === categoryName &&
      <BurgerIngredient key={item._id} item={item} openModal={changeVisibilityIngredientDetails}/>
    ))
  }

  const renderCategory = useMemo(() => {
    const buns = createCategory(ingredients, INGREDIENT_TYPES.bun);
    const sauces = createCategory(ingredients, INGREDIENT_TYPES.sauce);
    const mains = createCategory(ingredients, INGREDIENT_TYPES.main);
    return {buns, sauces, mains}
  }, [ingredients])

  const tabClick = (tab) => {
    setCurrent(tab);
    document.querySelector(`#${tab}`).scrollIntoView({behavior: "smooth"});
  };


  return (
    <section className="mt-10">
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div style={{ display: 'flex' }}>
        <Tab value={INGREDIENT_TYPES.bun} active={current === `${INGREDIENT_TYPES.bun}`} onClick={tabClick}>
          Булки
        </Tab>
        <Tab value={INGREDIENT_TYPES.sauce} active={current === `${INGREDIENT_TYPES.sauce}`} onClick={tabClick}>
          Соусы
        </Tab>
        <Tab value={INGREDIENT_TYPES.main} active={current === `${INGREDIENT_TYPES.main}`} onClick={tabClick}>
          Начинки
        </Tab>
      </div>
      <article className={burgerIngredientsStyle.ingredients}>
        <h3 id={INGREDIENT_TYPES.bun} className="text text_type_main-medium">Булки</h3>
        <ul className={burgerIngredientsStyle.category}>
          {renderCategory.buns}
        </ul>
        <h3 id={INGREDIENT_TYPES.sauce} className="text text_type_main-medium">Соусы</h3>
        <ul className={burgerIngredientsStyle.category}>
          {renderCategory.sauces}
        </ul>
        <h3 id={INGREDIENT_TYPES.main} className="text text_type_main-medium">Начинки</h3>
        <ul className={burgerIngredientsStyle.category}>
          {renderCategory.mains}
        </ul>
      </article>
      {modalIsVisible && <ModalForIngredientDetails/>}
    </section>
  )
};


export default BurgerIngredients
