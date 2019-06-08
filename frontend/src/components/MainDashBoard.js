import React from 'react';
import {HeaderLogin} from "./HeaderLogin";
import {DashBoardColumn} from "./DashBoardColumn";
import {DashBoardSimple} from "./DashBoardSimple";

export class MainDashBoard extends React.Component {

    constructor(props){
        super(props);

    }


    render = () => (
        <div className="MainDashBoard">
            <HeaderLogin hideMenuButton={this.props.main}/>
            <DashBoardSimple main={true}/>
        </div>
    )
}