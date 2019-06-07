import React from 'react';
import {MainDashBoard} from "../components/MainDashBoard";

export class TestPlayGround extends React.Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render = () => (
        <div>
            <MainDashBoard main={false}/>
        </div>
    )
}