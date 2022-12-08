function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}


const getIngredientsAPI = (baseUrl) => {
  return request(baseUrl)
}

const postOrderAPI = (baseUrl, orderedIngredients) => {
  return request(baseUrl, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": orderedIngredients
    })
  });
}

export {getIngredientsAPI, postOrderAPI}
