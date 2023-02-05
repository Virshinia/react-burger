import {getCookie, saveCookie} from "./cookies";
import {BASE_URL} from "./constatants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

function requestWithTokenCheck(url, options, func, data) {
  return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 403)  {
        return refreshTokenAPI(`${BASE_URL}/auth/token`)
          .then(res => {func(url, data)})
      }})
}


const getIngredientsAPI = (baseUrl) => {
  return request(baseUrl)
}

const postOrderAPI = (baseUrl, orderedIngredients) => {
  return request(baseUrl, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' +  getCookie('accessToken')
    },
    body: JSON.stringify({
      "ingredients": orderedIngredients
    })
  });
}

const loginAPI = (baseUrl, form) => {
  return request(baseUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('refreshToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })

}

const logoutAPI = (baseUrl) => {
  return request(baseUrl,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"token": getCookie('refreshToken')})
  })
}

const getUserAPI = (baseUrl) => {
  return requestWithTokenCheck(baseUrl, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' +  getCookie('accessToken')
    }
  }, getUserAPI);
}

const registerRequestAPI = (baseUrl, form) => {
  return request(baseUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
}

const changeUserInfoAPI = (baseUrl, form) => {
  return requestWithTokenCheck(baseUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' +  getCookie('accessToken')
    },
    body: JSON.stringify(form)
  }, changeUserInfoAPI, form);
}

const passwordChangeRequestAPI = (baseUrl, email) => {
  return request(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
}

const resetPasswordAPI = (baseUrl, password) => {
  return request(baseUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(password)
  })
}

const refreshTokenAPI = (baseUrl) => {
  return request(baseUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"token": getCookie('refreshToken')}),
  })
    .then (data => {
      return saveCookie(data)
    })
}



export {
  getIngredientsAPI,
  postOrderAPI,
  loginAPI,
  registerRequestAPI,
  getUserAPI,
  logoutAPI,
  changeUserInfoAPI,
  passwordChangeRequestAPI,
  resetPasswordAPI,
  refreshTokenAPI
}
