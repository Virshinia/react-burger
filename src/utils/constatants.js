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

function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function saveCookie(data){
  let refreshToken;
  let accessToken;
  accessToken = data.accessToken.split('Bearer ')[1];
  refreshToken = data.refreshToken;

  if (refreshToken && accessToken) {
    setCookie('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);
  }
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
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
