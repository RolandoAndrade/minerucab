import React from 'react';
import {DashBoardSimple} from "./DashBoardSimple";
import {HeaderLogin} from "./HeaderLogin";

export class MenuDashBoard extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    static clickMenu()
    {
        let element = document.getElementById("DashboardMenu");
        if(element.classList.contains("Up"))
        {
            element.classList.remove("Up");
            element.classList.add("Down");
        }
        else
        {
            element.classList.remove("Down");
            element.classList.add("Up");
        }

    }
    render = () => (
        <div className="TestPlayGround">
            <HeaderLogin hideMenuButton={this.props.main}/>
            <div id="DashboardMenu" className="DashBoardMenu Up">
                <DashBoardSimple main={false}/>
            </div>
        </div>
    )
}