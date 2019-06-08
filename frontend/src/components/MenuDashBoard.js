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
        let back = document.getElementById("DarkBackground");
        if(element.classList.contains("Up"))
        {
            element.classList.remove("Up");
            element.classList.add("Down");
            back.style.visibility="visible";
        }
        else
        {
            element.classList.remove("Down");
            element.classList.add("Up");
            back.style.visibility="hidden";
        }

    }
    render = () => (
        <div>
            <div className="DarkBackground" id="DarkBackground">
            </div>
            <HeaderLogin hideMenuButton={this.props.main}/>
            <div id="DashboardMenu" className="DashBoardMenu Up">
                <DashBoardSimple main={false}/></div>

        </div>
    )
}