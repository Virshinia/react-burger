import React from 'react';
import Header from '../header/header'
import Main from "../main/main";
import getIngredients from "../../utils/api";
import {urlForGettingIngredients} from "../../utils/constatants"

const App = () => {

    const [ingredients, setIngredients] = React.useState([])

    React.useEffect(() => {
        getIngredients(urlForGettingIngredients)
            .then(ingredientsFromApi => {
                setIngredients(ingredientsFromApi.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    return (
        <>
            <Header/>
            <Main data={ingredients}/>
        </>
    );
}

export default App;