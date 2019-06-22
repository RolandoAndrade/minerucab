import React from 'react';
import {DashBoardSimple} from "./DashBoardSimple";
import {HeaderLogin} from "./HeaderLogin";
import {SectionTitle} from "./Header/SectionTitle";

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
        let icon = document.getElementById("IconoMenu");
        if(element.classList.contains("Up"))
        {
            element.classList.remove("Up");
            element.classList.add("Down");
            back.style.visibility="visible";
            icon.classList.remove("zmdi-menu");
            icon.classList.add("zmdi-close");
        }
        else
        {
            element.classList.remove("Down");
            element.classList.add("Up");
            back.style.visibility="hidden";
            icon.classList.remove("zmdi-close");
            icon.classList.add("zmdi-menu");
        }

    }
    render = () => (
        <div>
            <div className="DarkBackground" id="DarkBackground" onClick={()=>MenuDashBoard.clickMenu()}>
            </div>
            <HeaderLogin hideMenuButton={this.props.main}/>
            <div id="DashboardMenu" className="DashBoardMenu Up">
            <DashBoardSimple main={false}/></div>
            {this.props.title?<SectionTitle title={this.props.title}/>:""}


        </div>
    )
}