import {createAction} from "redux-actions";
import {postOrder} from "../../utils/api";
import {BASE_URL} from "../../utils/constatants";

const GET_INGREDIENTS_IN_CONSTRUCTOR = createAction('GET_INGREDIENTS_IN_CONSTRUCTOR');
const DELETE_INGREDIENT = createAction('DELETE_INGREDIENT');
const ADD_INGREDIENT = createAction('ADD_INGREDIENT');
const GET_INGREDIENTS_FOR_ORDER = createAction('GET_INGREDIENTS_FOR_ORDER');
const GET_ORDER_NUMBER = createAction('GET_ORDER_NUMBER');
const ADD_BUN = createAction('ADD_BUN');
const MOVE_INGREDIENT = createAction('MOVE_INGREDIENT');

const POST_ORDER_REQUEST = createAction('POST_ORDER_REQUEST');
const POST_ORDER_SUCCEED = createAction('POST_ORDER_SUCCEED');
const POST_ORDER_ERROR = createAction('POST_ORDER_ERROR');


function setOrderId(ids) {
  return function(dispatch) {
    dispatch(POST_ORDER_REQUEST());
    postOrder(`${BASE_URL}/orders`, ids)
      .then(res => {
        if (res.ok) {
          dispatch(POST_ORDER_SUCCEED());
          return res.json();
        } else {
          dispatch(POST_ORDER_ERROR());
          return Promise.reject(`Ошибка: ${res.status}`)
        }})
      .then( res => {
      dispatch(GET_ORDER_NUMBER(res.order.number))
    }).catch( err => {
      console.log(err);
    })
  }
}

export {
  GET_INGREDIENTS_IN_CONSTRUCTOR,
  DELETE_INGREDIENT,
  GET_INGREDIENTS_FOR_ORDER,
  GET_ORDER_NUMBER,
  ADD_INGREDIENT,
  ADD_BUN,
  MOVE_INGREDIENT,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCEED,
  POST_ORDER_ERROR,
  setOrderId
}
