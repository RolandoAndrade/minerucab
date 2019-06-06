import React from 'react';

export class HomeHeader extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            showDashboard : false
        }
    }


    render = () => (
        <div className="HeaderContainer">
        <div className="HeaderHome">
            <div className="HeaderContent align-left">
                <img src="images/logo.png" className="HeaderHomeLogo"/>
            </div>
            <div className="HeaderContent align-center">
                <div className="HeaderTitle">MinerUCAB</div>
            </div>
            <div className="HeaderContent align-right">
                <div className="LoginButton">Ingresar<i className="fa fa-sign-in-alt"></i></div>
            </div>
        </div>
        </div>
    )
}
