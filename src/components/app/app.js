import React from 'react';
import Header from '../header/header'
import Main from "../main/main";
import {urlForGettingIngredients} from "../../utils/constatants";

const App = () => {

    const [ingredients, setIngredients] = React.useState([])

    React.useEffect(() => {
        const getIngredients = async () => {
            const res = await fetch(urlForGettingIngredients);
            return await res.json();
        }
        getIngredients()
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