import { createAction } from 'redux-actions'

const SHOW_INGREDIENT_DETAILS = createAction('SHOW_INGREDIENT_DETAILS');
const RESET_INGREDIENT_DETAILS = createAction('RESET_INGREDIENT_DETAILS');
const GET_INGREDIENTS = createAction('GET_INGREDIENTS');
const GET_INGREDIENTS_REQUEST = createAction('GET_INGREDIENTS_REQUEST')
const GET_INGREDIENTS_SUCCESS = createAction('GET_INGREDIENTS_SUCCESS')
const GET_INGREDIENTS_ERROR = createAction('GET_INGREDIENTS_ERROR');

export {
  SHOW_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS,
  GET_INGREDIENTS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
}