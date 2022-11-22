const _checkRes = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const request = (baseUrl, options) => {
  return fetch(baseUrl, options).then(res => _checkRes(res));
};

const getIngredients = (baseUrl) => {
  return request(baseUrl);
}

const postOrder = (baseUrl, orderedIngredients) => {
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

export {getIngredients, postOrder}
