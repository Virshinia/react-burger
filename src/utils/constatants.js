import PropTypes from "prop-types";

export const BASE_URL = 'https://norma.nomoreparties.space/api'

export const INGREDIENT_TYPES = {
  bun: "bun",
  sauce: "sauce",
  main: "main",
}

export const isBun = (item) => {
  return item.type === INGREDIENT_TYPES.bun
}

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
