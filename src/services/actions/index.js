import {getIngredients, postOrder} from "../../utils/api";
import { createAction } from 'redux-actions'
import {BASE_URL} from "../../utils/constatants";

const GET_INGREDIENTS = createAction('GET_INGREDIENTS');
const GET_INGREDIENTS_FOR_ORDER = createAction('GET_INGREDIENTS_FOR_ORDER');
const GET_INGREDIENTS_IN_CONSTRUCTOR = createAction('GET_INGREDIENTS_IN_CONSTRUCTOR');
const SHOW_INGREDIENT_DETAILS = createAction('SHOW_INGREDIENT_DETAILS');
const RESET_INGREDIENT_DETAILS = createAction('RESET_INGREDIENT_DETAILS');
const GET_ORDER_NUMBER = createAction('GET_ORDER_NUMBER');
const DELETE_INGREDIENT = createAction('DELETE_INGREDIENT');
const ADD_INGREDIENT_IN_CONSTRUCTOR = createAction('ADD_INGREDIENT_IN_CONSTRUCTOR');


export {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FOR_ORDER,
  GET_INGREDIENTS_IN_CONSTRUCTOR,
  SHOW_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
  GET_ORDER_NUMBER,
  DELETE_INGREDIENT,
  ADD_INGREDIENT_IN_CONSTRUCTOR
}


export function setIngredients() {
  return function (dispatch) {
    getIngredients(`${BASE_URL}/ingredients`).then(res => {
      dispatch(GET_INGREDIENTS(res.data));
      dispatch(GET_INGREDIENTS_IN_CONSTRUCTOR(res.data))

    }).catch(err => {
      console.log(err);
    })
  }
}

export function setOrderId(ids) {
  return function(dispatch) {
    postOrder(`${BASE_URL}/orders`, ids).then( res => {
      dispatch(GET_ORDER_NUMBER(res.order.number))
    }).catch( err => {
      console.log(err);
    })
  }
}
