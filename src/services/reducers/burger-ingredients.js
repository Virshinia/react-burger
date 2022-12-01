import {handleActions} from "redux-actions";

import {
  GET_INGREDIENTS,
  SHOW_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
} from '../actions/burger-ingredients'


const initialState = {
  ingredients: [],
  ingredientDetails: {}
}

const handleGetIngredients = (state, {payload}) => ({
  ...state,
  ingredients: payload
})

const handleShowIngredientDetails = (state, {payload}) => ({
  ...state,
  ingredientDetails: payload
})

const handleResetIngredientDetails = (state) => ({
  ...state,
  ingredientDetail: {}
})


const ingredientsReducer = handleActions({
  [GET_INGREDIENTS]: handleGetIngredients,
  [SHOW_INGREDIENT_DETAILS]: handleShowIngredientDetails,
  [RESET_INGREDIENT_DETAILS]: handleResetIngredientDetails,
}, initialState)


export default ingredientsReducer
