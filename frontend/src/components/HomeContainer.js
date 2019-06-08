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
                        <div className="TextHome"><h1>{this.props.title}</h1>
                            {!this.props.icons?<p>{this.props.text}</p>:
                            this.props.text.map(function (element,i)
                            {
                                <span><i className={this.props.icons[i]}></i>{element}</span>
                            },this)
                            }</div>}
                </div>
                <div className="ContainerBox">
                    {!this.props.left?<div className="ImageHome" style={this.getStyle()}/>:
                        <div className="TextHome"><h1>{this.props.title}</h1>
                            {!this.props.icons?<p>{this.props.text}</p>:
                                this.props.text.map(function (element,i)
                                {
                                    return <span className="HomeLine"><i className={this.props.icons[i]/*"fas fa-user-circle fa-3x"*/}></i>{element}</span>
                                },this)
                            }</div>}
                </div>
            </div>
    )
}