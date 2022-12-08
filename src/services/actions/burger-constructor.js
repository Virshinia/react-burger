import {createAction} from "redux-actions";
import {postOrderAPI} from "../../utils/api";
import {BASE_URL} from "../../utils/constatants";

const DELETE_INGREDIENT = createAction('DELETE_INGREDIENT');
const ADD_INGREDIENT = createAction('ADD_INGREDIENT');
const GET_INGREDIENTS_FOR_ORDER = createAction('GET_INGREDIENTS_FOR_ORDER');
const GET_ORDER_NUMBER = createAction('GET_ORDER_NUMBER');
const ADD_BUN = createAction('ADD_BUN');
const MOVE_INGREDIENT = createAction('MOVE_INGREDIENT');
const CLEAR_ALL_IN_CONSTRUCTOR = createAction('CLEAR_ALL_INGREDIENTS');

const POST_ORDER_REQUEST = createAction('POST_ORDER_REQUEST');
const POST_ORDER_SUCCEED = createAction('POST_ORDER_SUCCEED');
const POST_ORDER_ERROR = createAction('POST_ORDER_ERROR');


function setOrderId(ids) {
  return function(dispatch) {
    dispatch(POST_ORDER_REQUEST());
    postOrderAPI(`${BASE_URL}/orders`, ids)
      .then(res => {
        dispatch(POST_ORDER_SUCCEED());
        dispatch(GET_ORDER_NUMBER(res.order.number))
      })
      .catch( err => {
        dispatch(POST_ORDER_ERROR());
        console.log(err);
    })
  }
}

export {
  DELETE_INGREDIENT,
  GET_INGREDIENTS_FOR_ORDER,
  GET_ORDER_NUMBER,
  ADD_INGREDIENT,
  ADD_BUN,
  MOVE_INGREDIENT,
  CLEAR_ALL_IN_CONSTRUCTOR,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCEED,
  POST_ORDER_ERROR,
  setOrderId
}
