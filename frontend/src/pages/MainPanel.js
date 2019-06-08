import React from 'react';
import {MainDashBoard} from "../components/MainDashBoard";

export class MainPanel extends React.Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    login  = () => {

    }

    render = () => (
        <div>
           <MainDashBoard main={true}/>
        </div>
    )
}