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
                <DashBoardColumn title="Lorem" sections={["Hola", "Como", "Estas"]}/>
                <DashBoardColumn title="Lorem" sections={["Hola", "Como", "Estas"]}/>
                <DashBoardColumn title="Lorem" sections={["Hola", "Como", "Estas"]}/>
            </div>

        </div>
    )
}