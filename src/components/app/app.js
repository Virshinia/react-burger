import React from 'react';
import Header from '../header/header'
import Main from "../main/main";
import {data} from "../../utils/data"

const App = () => {
    return (
        <>
            <Header/>
            <Main data={data}/>
        </>
    );
}

export default App;