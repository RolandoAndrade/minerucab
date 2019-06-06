import React from 'react';

export class HomeContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showDashboard : false
        }
    }


    getStyle()
    {
        return {
            background: "url("+this.props.image+")",
            backgroundPosition: this.props.center,
            backgroundSize: "cover"
        }
    }

    render = () => (
            <div className="HomeContainer">
                <div className="ContainerBox">
                    {this.props.left?
                        <div className="ImageHome" style={this.getStyle()}/>:<div className="TextHome">{this.props.text}</div>}
                </div>
                <div className="ContainerBox">
                    {!this.props.left?<div className="ImageHome" style={this.getStyle()}/>:
                        <div className="TextHome">{this.props.text}</div>}
                </div>
            </div>
    )
}