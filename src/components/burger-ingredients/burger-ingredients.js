import React, {useState, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {BUN, SAUCE, MAIN} from '../../utils/constatants';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {showIngredientDetails, resetIngredientDetails} from "../../services/reducers/burger-ingredients";
import TabSection from "../tab-section/tab-section";
import {setCurrentTab} from "../../services/reducers/tab-section"


const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const [modalIsVisible, setVisibility] = useState(false);
  const {ingredients, ingredientDetails} = useSelector(store => store.ingredients);

  const refs = {
    bunRef: useRef(null),
    sauceRef: useRef(null),
    mainRef: useRef(null)
  }

  const changeVisibilityIngredientDetails = () => {
    setVisibility(!modalIsVisible);
  }

  const openIngredientDetails = (item) => {
    window.history.replaceState(null, "", `/ingredients/${item._id}`)
    changeVisibilityIngredientDetails();
    dispatch(showIngredientDetails(item));
  }

  const closeIngredientDetails = () => {
    window.history.replaceState(null, '', "/")
    changeVisibilityIngredientDetails();
    dispatch(resetIngredientDetails());
  }

  const ModalForIngredientDetails = () => {
    return (
      <Modal title="Детали ингредиента"
             closeModal={closeIngredientDetails}>
        <IngredientDetails item={ingredientDetails} />
      </Modal>
    )
  }

  const createCategory = (array, categoryName) => {
    return array.map(item => (
      item.type === categoryName &&
      <BurgerIngredient key={item._id} item={item} openModal={openIngredientDetails}/>
    ))
  }

  const renderCategory = useMemo(() => {
    const buns = createCategory(ingredients, BUN);
    const sauces = createCategory(ingredients, SAUCE);
    const mains = createCategory(ingredients, MAIN);
    return {buns, sauces, mains}
  }, [ingredients])

  const handleScroll = event => {
    const scrollPosition = event.currentTarget.scrollTop
    const childrenOfScrollArea = event.currentTarget.children
    if (scrollPosition < childrenOfScrollArea.bun.clientHeight) {
      dispatch(setCurrentTab(BUN))
    } else if (scrollPosition < childrenOfScrollArea.sauce.clientHeight){
      dispatch(setCurrentTab(SAUCE))
    } else {
      dispatch(setCurrentTab(MAIN))
    }
  }


  return (
    <section className="mt-10">
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      {refs && <TabSection refs={refs}/>}
      <article className={burgerIngredientsStyle.ingredients} onScroll={handleScroll}>
        <h3 id={`${BUN}-heading`} ref={refs.bunRef} className="text text_type_main-medium">Булки</h3>
        <ul id={BUN} className={burgerIngredientsStyle.category}>
          {renderCategory.buns}
        </ul>
        <h3 id={`${SAUCE}-heading`} ref={refs.sauceRef} className="text text_type_main-medium">Соусы</h3>
        <ul id={SAUCE} className={burgerIngredientsStyle.category}>
          {renderCategory.sauces}
        </ul>
        <h3 id={`${MAIN}-heading`} ref={refs.mainRef} className="text text_type_main-medium">Начинки</h3>
        <ul id={MAIN} className={burgerIngredientsStyle.category}>
          {renderCategory.mains}
        </ul>
      </article>
      {modalIsVisible && <ModalForIngredientDetails/>}
    </section>
  )
};


export default BurgerIngredients
