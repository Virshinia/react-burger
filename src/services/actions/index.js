import {getIngredients} from "../../utils/api";
import {BASE_URL} from "../../utils/constatants";
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS
} from "./burger-ingredients";


export function setIngredients() {
  return function (dispatch) {
    dispatch(GET_INGREDIENTS_REQUEST());
    getIngredients(`${BASE_URL}/ingredients`).then(res => {
      if (res.ok) {
        dispatch(GET_INGREDIENTS_SUCCESS());
        return res.json();
      } else {
        dispatch(GET_INGREDIENTS_ERROR());
        return Promise.reject(`Ошибка: ${res.status}`)
      }})
      .then( res => {
        dispatch(GET_INGREDIENTS(res.data))}
      ).catch(err => {
      console.log(err);
    })
  }
}

