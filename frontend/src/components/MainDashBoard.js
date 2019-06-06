import React from 'react';
import {HeaderLogin} from "./HeaderLogin";

export class MainDashBoard extends React.Component {

    constructor(props){
        super(props);

    }


    render = () => (
        <div className="MainDashBoard">
            <HeaderLogin hideMenuButton={true}/>
        </div>
    )
}