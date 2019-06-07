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
                <DashBoardColumn main={true} image="resources/img/Dashboard_1.png" color="y"
                                 title="Lorem" sections={["Lorem", "ipsum", "sit","Lorem", "ipsum", "sit","Lorem", "ipsum"]}/>
                <DashBoardColumn main={true} image="resources/img/Dashboard_2.png" color="b"
                                 title="Lorem" sections={["ammet", "dolor", "sit","Lorem"]}/>
                <DashBoardColumn main={true} image="resources/img/Dashboard_3.png" color="g"
                                 title="Lorem" sections={["rolando", "josé", "andrade","Lorem"]}/>
            </div>

        </div>
    )
}