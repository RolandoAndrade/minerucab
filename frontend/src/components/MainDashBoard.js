import React from 'react';
import {HeaderLogin} from "./HeaderLogin";
import {DashBoardColumn} from "./DashBoardColumn";

export class MainDashBoard extends React.Component {

    constructor(props){
        super(props);

    }


    render = () => (
        <div className="MainDashBoard">
            <HeaderLogin hideMenuButton={true}/>
            <div className="DashBoardItems">
                <DashBoardColumn color="y" title="Lorem" sections={["Lorem", "ipsum", "sit"]}/>
                <DashBoardColumn color="b" title="Lorem" sections={["ammet", "dolor", "sit"]}/>
                <DashBoardColumn color="g" title="Lorem" sections={["rolando", "josé", "andrade"]}/>
            </div>

        </div>
    )
}