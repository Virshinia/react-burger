import {RootState} from "../index";
import {IIngredientPropTypes} from "./common-interfaces";

export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const WS_ORDERS = 'wss://norma.nomoreparties.space/orders';

export const BUN = 'bun'
export const SAUCE = 'sauce'
export const MAIN = 'main'

export const INGREDIENT_TYPES = [
  {type: BUN, name: "булка"},
  {type: SAUCE, name: "соус"},
  {type: MAIN, name: "начинка"}
]

export const isBun = (item: IIngredientPropTypes) => {
  return item.type === BUN
}

export const checkUser = (store: RootState) => store.user.userIsAuthenticated;
