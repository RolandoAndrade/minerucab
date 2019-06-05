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
            <img src="images/logo.png" className="Logo"/>
            <h1>MinerUCAB</h1>
            <button>Iniciar sesión <i className="fa fa-sign-in-alt"></i></button>
        </div>
    )
}
