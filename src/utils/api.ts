import {getCookie, saveCookie} from "./cookies";
import {BASE_URL} from "./constatants";
import {IPersonalInformationForm, TLoginForm} from "./common-interfaces";

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(endpoint: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse)
}

function requestWithTokenCheck(endpoint: string, options: RequestInit, func: (url: string, data?: any) => any, data?: any) {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 403)  {
        return refreshTokenAPI(`auth/token`)
          .then(res => {func(endpoint, data)})
      }})
}

const getIngredientsAPI = (endpoint: string) => {
  return request(endpoint)
}

const postOrderAPI = (endpoint: string, orderedIngredients: string[]) => {
  return request(endpoint, {
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

const loginAPI = (endpoint: string, form: TLoginForm) => {
  return request(endpoint, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })

}

const logoutAPI = (endpoint: string) => {
  return request(endpoint,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"token": getCookie('refreshToken')})
  })
}

const getUserAPI = (endpoint: string) => {
  return requestWithTokenCheck(endpoint, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' +  getCookie('accessToken')
    }
  }, getUserAPI);
}

const registerRequestAPI = (endpoint: string, form: IPersonalInformationForm) => {
  return request(endpoint, {
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

const changeUserInfoAPI = (endpoint: string, form: IPersonalInformationForm) => {
  return requestWithTokenCheck(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' +  getCookie('accessToken')
    },
    body: JSON.stringify(form)
  }, changeUserInfoAPI, form);
}

const passwordChangeRequestAPI = (endpoint: string, email: {email: string}) => {
  return request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
}

const resetPasswordAPI = (endpoint: string, password: {password: string}) => {
  return request(endpoint, {
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

const refreshTokenAPI = (endpoint: string) => {
  return request(endpoint, {
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
