import PropTypes from "prop-types";

export const BASE_URL = 'https://norma.nomoreparties.space/api'

export const BUN = 'bun'
export const SAUCE = 'sauce'
export const MAIN = 'main'

export const INGREDIENT_TYPES = [
  {type: BUN, name: "булка"},
  {type: SAUCE, name: "соус"},
  {type: MAIN, name: "начинка"}
]

export const isBun = (item) => {
  return item.type === BUN
}

export const checkUser = store => store.user.userIsAuthenticated;

export const ingredientPropTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large:PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
}
