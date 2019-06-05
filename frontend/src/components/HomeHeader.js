import React from 'react';

export class HomeHeader extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            showDashboard : false
        }
    }


    render = () => (
        <div className="HeaderHome">
            <img src="images/logo.png" className="HeaderHomeLogo"/>
            <div className="HeaderTitle">MinerUCAB</div>
            <div className="LoginButton">Iniciar sesión <i className="fa fa-sign-in-alt"></i></div>
        </div>
    )
}
