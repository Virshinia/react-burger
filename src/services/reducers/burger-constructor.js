import {handleActions} from "redux-actions";

import {
  DELETE_INGREDIENT,
  ADD_INGREDIENT,
  GET_ORDER_NUMBER,
  GET_INGREDIENTS_FOR_ORDER,
  ADD_BUN,
  MOVE_INGREDIENT,
  CLEAR_ALL_IN_CONSTRUCTOR,
  POST_ORDER_SUCCEED, POST_ORDER_REQUEST, POST_ORDER_ERROR,
} from '../actions/burger-constructor'
import {isBun} from "../../utils/constatants";


const initialState = {
  bun: {},
  others: [],
  ingredientsForOrder: [],
  orderId: null,
  postOrderRequested: false,
  postOrderSucceed: false,
  postOrderError: false,
}

const handleGetIngredientsForOrder = (state, {payload}) => ({
  ...state,
  ingredientsForOrder: payload
})


const handleGetOrderId = (state, {payload}) => ({
  ...state,
  orderId: payload
})

const handleDeleteIngredient = (state, {payload}) => ({
  ...state,
  ingredientsForOrder: state.ingredientsForOrder.filter( (item, index) => index !== payload),
  others: state.others.filter( (item, index) => index !== payload),
})

const handleAddIngredient = (state, {payload}) => ({
  ...state,
  ingredientsForOrder: [payload._id, ...state.ingredientsForOrder ],
  others: [ ...state.others, payload]
})

function handleMoveIngredient (state, {payload}) {
  const copyArr = [...state.others];
  copyArr.splice(payload.hoverIndex, 0, copyArr.splice(payload.dragIndex, 1)[0]);
  return {
    ...state,
    others: copyArr
  }
}

const handleAddBun = (state, {payload}) => ({
  ...state,
  ingredientsForOrder: [...state.ingredientsForOrder.filter( (item) => !isBun(item)), payload._id],
  bun: payload
})

const handleClearAllIngredients = (state) => ({
  ...state,
  ingredientsForOrder: initialState.ingredientsForOrder,
  others: initialState.others,
  bun: initialState.bun,
})

const handlePostOrderRequest = (state) => ({
  ...state,
  orderId: initialState.orderId,
  postOrderRequested: true
})

const handlePostOrderSucceed = (state) => ({
  ...state,
  postOrderRequested: false,
  postOrderSucceed: true
})

const handlePostOrderError = (state) => ({
  ...state,
  postOrderRequested: false,
  postOrderError: true
})


const constructorReducer = handleActions({
  [GET_INGREDIENTS_FOR_ORDER]: handleGetIngredientsForOrder,
  [GET_ORDER_NUMBER]: handleGetOrderId,
  [DELETE_INGREDIENT]: handleDeleteIngredient,
  [ADD_INGREDIENT]: handleAddIngredient,
  [ADD_BUN]: handleAddBun,
  [MOVE_INGREDIENT]: handleMoveIngredient,
  [CLEAR_ALL_IN_CONSTRUCTOR]: handleClearAllIngredients,
  [POST_ORDER_REQUEST]: handlePostOrderRequest,
  [POST_ORDER_SUCCEED]: handlePostOrderSucceed,
  [POST_ORDER_ERROR]: handlePostOrderError,
}, initialState)


export default constructorReducer
