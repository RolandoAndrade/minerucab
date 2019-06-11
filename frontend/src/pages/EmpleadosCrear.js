import React from 'react';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {Dropdown} from "../components/Dropdown";

export class EmpleadosCrear extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    login  = () => {

    }

    render = () => (
        <div>
            <MenuDashBoard/>
            <div className="RowContainer">
                <div className="WideContainer">
                    <Dropdown placeholder="Cargo" id="Cargo" options={["Lorem Ipsum","Dolor sit","Amet consectetur"]}/>
                </div>
                <div className="WideContainer">
                </div>
                <div className="WideContainer">
                </div>
            </div>
        </div>
    )
}