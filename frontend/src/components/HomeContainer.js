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
                        <div className="ImageHome" style={this.getStyle()}/>:
                        <div className="TextHome"><h1>{this.props.title}</h1><p>{this.props.text}</p></div>}
                </div>
                <div className="ContainerBox">
                    {!this.props.left?<div className="ImageHome" style={this.getStyle()}/>:
                        <div className="TextHome"><h1>{this.props.title}</h1><p>{this.props.text}</p></div>}
                </div>
            </div>
    )
}