const _checkRes = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    };

const request = (baseUrl) => {
    return fetch(baseUrl).then(res => _checkRes(res));
    };

const getIngredients = (baseUrl) => {
    return request(baseUrl);
}

export default getIngredients

