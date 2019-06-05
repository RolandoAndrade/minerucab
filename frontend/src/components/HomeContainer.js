import React from 'react';

export class HomeContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showDashboard : false
        }
    }


    render = () => (
        <div className="HomeContainer">
            <div className="ContainerBox">
                {this.props.left?<img src={this.props.image} alt=""/>:"Hola"}
            </div>
            <div className="ContainerBox">
                {!this.props.left?<img src={this.props.image} alt=""/>:"Hola"}
            </div>
        </div>
    )
}