import {getIngredients} from "../../utils/api";
import {BASE_URL} from "../../utils/constatants";
import {GET_INGREDIENTS} from "./burger-ingredients";
import {GET_INGREDIENTS_IN_CONSTRUCTOR} from "./burger-constructor";

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
