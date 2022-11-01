import React from 'react';
import Header from '../header/header'
import Main from "../main/main";
import {data} from "../../utils/data"

class App extends React.Component {
    state ={data};
    render() {
        return (
            <>
                <Header/>
                <Main data={this.state.data}/>
            </>
        );
    }
}

export default App;