import {getIngredientsAPI} from "../../utils/api";
import {BASE_URL} from "../../utils/constatants";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS
} from "./burger-ingredients";


export function getIngredients() {
  return function (dispatch) {
    dispatch(GET_INGREDIENTS_REQUEST());
    getIngredientsAPI(`${BASE_URL}/ingredients`)
      .then( res => {
        dispatch(GET_INGREDIENTS_SUCCESS());
        dispatch(GET_INGREDIENTS(res.data))}
      ).catch(err => {
      dispatch(GET_INGREDIENTS_ERROR());
      console.log(err);
    })
  }
}

