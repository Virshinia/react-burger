import {handleActions} from "redux-actions";

import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FOR_ORDER,
  GET_INGREDIENTS_IN_CONSTRUCTOR,
  SHOW_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
  GET_ORDER_NUMBER,
  DELETE_INGREDIENT,
  ADD_INGREDIENT_IN_CONSTRUCTOR,
} from '../actions'

const initialState = {
  ingredients: [],
  ingredientsInConstructor: [],
  ingredientsForOrder: [],
  ingredientDetails: {},
  orderId: null
}

const handleGetIngredients = (state, {payload}) => ({
  ...state,
  ingredients: payload
})

const handleGetIngredientsForOrder = (state, {payload}) => ({
  ...state,
  ingredientsForOrder: payload
})

const handleGetIngredientsInConstructor = (state, {payload}) => ({
  ...state,
  ingredientsInConstructor: payload
})

const handleShowIngredientDetails = (state, {payload}) => ({
  ...state,
  ingredientDetails: payload
})

const handleResetIngredientDetails = (state) => ({
  ...state,
  ingredientDetail: {}
})

const handleGetOrderId = (state, {payload}) => ({
  ...state,
  orderId: payload
})

const handleDeleteIngredient = (state, {payload}) => ({
  ...state,
  ingredientsForOrder: state.ingredientsForOrder.filter(item => item !== payload),
  ingredientsInConstructor: state.ingredientsInConstructor.filter(item => item._id !== payload)
})

//доработать с dnd
const handleAddIngredient = (state, {payload}) => ({
  ...state,
  ingredientsForOrder: state.ingredientsForOrder.filter(item => item !== payload),
  ingredientsInConstructor: state.ingredientsInConstructor.filter(item => item._id !== payload)
})



const burgerReducer = handleActions({
  [GET_INGREDIENTS]: handleGetIngredients,
  [GET_INGREDIENTS_FOR_ORDER]: handleGetIngredientsForOrder,
  [GET_INGREDIENTS_IN_CONSTRUCTOR]: handleGetIngredientsInConstructor,
  [SHOW_INGREDIENT_DETAILS]: handleShowIngredientDetails,
  [RESET_INGREDIENT_DETAILS]: handleResetIngredientDetails,
  [GET_ORDER_NUMBER]: handleGetOrderId,
  [DELETE_INGREDIENT]: handleDeleteIngredient,
  [ADD_INGREDIENT_IN_CONSTRUCTOR]: handleAddIngredient
}, initialState)


export default burgerReducer

