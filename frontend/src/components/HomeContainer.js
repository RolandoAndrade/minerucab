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
                    {this.props.left?<img src={this.props.image} className="ImageHome" alt=""/>:
                        <div className="TextHome">{this.props.text}</div>}
                </div>
                <div className="ContainerBox">
                    {!this.props.left?<img src={this.props.image} className="ImageHome" alt=""/>:
                        <div className="TextHome">{this.props.text}</div>}
                </div>
            </div>
    )
}