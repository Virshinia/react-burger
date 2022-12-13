import {handleActions} from "redux-actions";

import {
  GET_INGREDIENTS,
  SHOW_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from '../actions/burger-ingredients'

const initialState = {
  ingredients: [],
  ingredientDetails: {},
  ingredientsRequested: false,
  requestSucceed: false,
  requestError: false,
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
  ingredientDetails: {}
})


const handleIngredientsRequest = (state) => ({
  ...state,
  ingredientsRequested: true
})

const handleIngredientsSuccess = (state) => ({
  ...state,
  ingredientsRequested: false,
  requestSucceed: true
})

const handleIngredientsError = (state) => ({
  ...state,
  ingredientsRequested: false,
  requestSucceed: false,
  requestError: true,
  ingredients: initialState.ingredients,
  ingredientsInConstructor: initialState.ingredientsInConstructor
})


const ingredientsReducer = handleActions({
  [GET_INGREDIENTS]: handleGetIngredients,
  [SHOW_INGREDIENT_DETAILS]: handleShowIngredientDetails,
  [RESET_INGREDIENT_DETAILS]: handleResetIngredientDetails,
  [GET_INGREDIENTS_REQUEST]: handleIngredientsRequest,
  [GET_INGREDIENTS_SUCCESS]: handleIngredientsSuccess,
  [GET_INGREDIENTS_ERROR]: handleIngredientsError,
}, initialState)


export default ingredientsReducer

