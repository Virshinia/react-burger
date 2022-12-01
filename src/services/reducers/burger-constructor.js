import {handleActions} from "redux-actions";

import {
  GET_INGREDIENTS_IN_CONSTRUCTOR,
  DELETE_INGREDIENT,
  ADD_INGREDIENT_IN_CONSTRUCTOR,
  GET_ORDER_NUMBER,
  GET_INGREDIENTS_FOR_ORDER
} from '../actions/burger-constructor'


const initialState = {
  ingredientsInConstructor: [],
  ingredientsForOrder: [],
  orderId: null
}

const handleGetIngredientsForOrder = (state, {payload}) => ({
  ...state,
  ingredientsForOrder: payload
})

const handleGetIngredientsInConstructor = (state, {payload}) => ({
  ...state,
  ingredientsInConstructor: payload
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

//доработать dnd
const handleAddIngredient = (state, {payload}) => ({
  ...state,
  ingredientsForOrder: state.ingredientsForOrder.filter(item => item !== payload),
  ingredientsInConstructor: state.ingredientsInConstructor.filter(item => item._id !== payload)
})


const constructorReducer = handleActions({
  [GET_INGREDIENTS_FOR_ORDER]: handleGetIngredientsForOrder,
  [GET_INGREDIENTS_IN_CONSTRUCTOR]: handleGetIngredientsInConstructor,
  [GET_ORDER_NUMBER]: handleGetOrderId,
  [DELETE_INGREDIENT]: handleDeleteIngredient,
  [ADD_INGREDIENT_IN_CONSTRUCTOR]: handleAddIngredient
}, initialState)


export default constructorReducer
