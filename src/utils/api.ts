import {getCookie, saveCookie} from "./cookies";
import {BASE_URL} from "./constatants";
import {IPersonalInformationForm, TLoginForm} from "./common-interfaces";

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(url: string, options?: RequestInit) {
  return fetch(url, options).then(checkResponse)
}

function requestWithTokenCheck(url: string, options: RequestInit, func: (url: string, data?: any) => any, data?: any) {
  return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 403)  {
        return refreshTokenAPI(`${BASE_URL}/auth/token`)
          .then(res => {func(url, data)})
      }})
}


const getIngredientsAPI = (baseUrl: string) => {
  return request(baseUrl)
}

const postOrderAPI = (baseUrl: string, orderedIngredients: string[]) => {
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

const loginAPI = (baseUrl: string, form: TLoginForm) => {
  return request(baseUrl, {
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

const logoutAPI = (baseUrl: string) => {
  return request(baseUrl,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"token": getCookie('refreshToken')})
  })
}

const getUserAPI = (baseUrl: string) => {
  return requestWithTokenCheck(baseUrl, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' +  getCookie('accessToken')
    }
  }, getUserAPI);
}

const registerRequestAPI = (baseUrl: string, form: IPersonalInformationForm) => {
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

const changeUserInfoAPI = (baseUrl: string, form: IPersonalInformationForm) => {
  return requestWithTokenCheck(baseUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' +  getCookie('accessToken')
    },
    body: JSON.stringify(form)
  }, changeUserInfoAPI, form);
}

const passwordChangeRequestAPI = (baseUrl: string, email: {email: string}) => {
  return request(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
}

const resetPasswordAPI = (baseUrl: string, password: {password: string}) => {
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

const refreshTokenAPI = (baseUrl: string) => {
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
