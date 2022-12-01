import {createAction} from "redux-actions";
import {postOrder} from "../../utils/api";
import {BASE_URL} from "../../utils/constatants";

const GET_INGREDIENTS_IN_CONSTRUCTOR = createAction('GET_INGREDIENTS_IN_CONSTRUCTOR');
const DELETE_INGREDIENT = createAction('DELETE_INGREDIENT');
const ADD_INGREDIENT_IN_CONSTRUCTOR = createAction('ADD_INGREDIENT_IN_CONSTRUCTOR');
const GET_INGREDIENTS_FOR_ORDER = createAction('GET_INGREDIENTS_FOR_ORDER');
const GET_ORDER_NUMBER = createAction('GET_ORDER_NUMBER');


function setOrderId(ids) {
  return function(dispatch) {
    postOrder(`${BASE_URL}/orders`, ids).then( res => {
      dispatch(GET_ORDER_NUMBER(res.order.number))
    }).catch( err => {
      console.log(err);
    })
  }
}

export {
  GET_INGREDIENTS_IN_CONSTRUCTOR,
  DELETE_INGREDIENT,
  ADD_INGREDIENT_IN_CONSTRUCTOR,
  GET_INGREDIENTS_FOR_ORDER,
  GET_ORDER_NUMBER,
  setOrderId
}
