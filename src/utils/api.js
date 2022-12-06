const getIngredients = (baseUrl) => {
  return fetch(baseUrl)
}

const postOrder = (baseUrl, orderedIngredients) => {
  return fetch(baseUrl, {
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
