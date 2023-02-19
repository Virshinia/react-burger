import React, {useState, useMemo, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {BUN, SAUCE, MAIN} from '../../utils/constatants';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {showIngredientDetails, resetIngredientDetails} from "../../services/reducers/burger-ingredients";
import TabSection from "../tab-section/tab-section";
import {setCurrentTab} from "../../services/reducers/tab-section"
import {IIngredientPropTypes} from "../../utils/common-interfaces";

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const [modalIsVisible, setVisibility] = useState(false);
  const {ingredients, ingredientDetails} = useAppSelector(store => store.ingredients);

  const headingRefs = {
    bunRef: useRef<HTMLHeadingElement | null>(null),
    sauceRef: useRef<HTMLHeadingElement | null>(null),
    mainRef: useRef<HTMLHeadingElement | null>(null)
  }

  const categoryRefs = {
    bunCategory: useRef<HTMLUListElement | null>(null),
    sauceCategory: useRef<HTMLUListElement | null>(null),
    mainCategory: useRef<HTMLUListElement | null>(null)
  }

  const changeVisibilityIngredientDetails = () => {
    setVisibility(!modalIsVisible);
  }

  const openIngredientDetails = (item: IIngredientPropTypes) => {
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


  const createCategory = (array: IIngredientPropTypes[], categoryName: string) => {
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

  const handleScroll = (event:React.SyntheticEvent) => {
    const scrollPosition = event.currentTarget.scrollTop;
    const bunCategoryPosition = categoryRefs.bunCategory.current?.clientHeight;
    const sauceCategoryPosition = categoryRefs.sauceCategory.current?.clientHeight;

    if (bunCategoryPosition && sauceCategoryPosition) {
      if (scrollPosition < bunCategoryPosition) {
        dispatch(setCurrentTab(BUN))
      } else if (scrollPosition < sauceCategoryPosition){
        dispatch(setCurrentTab(SAUCE))
      } else {
        dispatch(setCurrentTab(MAIN))
      }
    }
  }


  return (
    <section className="mt-10">
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      {headingRefs && <TabSection refs={headingRefs}/>}
      <article className={burgerIngredientsStyle.ingredients} onScroll={handleScroll}>
        <h3 id={`${BUN}-heading`} ref={headingRefs.bunRef} className="text text_type_main-medium">Булки</h3>
        <ul id={BUN} ref={categoryRefs.bunCategory} className={burgerIngredientsStyle.category}>
          {renderCategory.buns}
        </ul>
        <h3 id={`${SAUCE}-heading`} ref={headingRefs.sauceRef} className="text text_type_main-medium">Соусы</h3>
        <ul id={SAUCE} ref={categoryRefs.sauceCategory} className={burgerIngredientsStyle.category}>
          {renderCategory.sauces}
        </ul>
        <h3 id={`${MAIN}-heading`} ref={headingRefs.mainRef} className="text text_type_main-medium">Начинки</h3>
        <ul id={MAIN} ref={categoryRefs.mainCategory} className={burgerIngredientsStyle.category}>
          {renderCategory.mains}
        </ul>
      </article>
      {modalIsVisible && <ModalForIngredientDetails/>}
    </section>
  )
};


export default BurgerIngredients
