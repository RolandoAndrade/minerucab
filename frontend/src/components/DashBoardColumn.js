import React from 'react';
import {Redirect} from "react-router-dom";

export class DashBoardColumn extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            whereToGo: undefined
        }
    }

    setUrlToGo(url)
    {
        this.setState(
            {
                whereToGo: "../../../"+url
            }
        )
    }

    render = () => (
        <div className={"DashBoardColumn "+this.props.color} style={(!this.props.main?{height: "50vh"}:{})}>
            <div className={"ColumnTitle"+(this.props.main?" "+this.props.color:"")}>
                {this.props.title}
            </div>
            <div className="SectionsContainer" style={(!this.props.main?{height: "100%"}:{})}>
                <div className="SectionsDashboard">
                    {
                        this.props.sections.map(
                        function(element,i)
                        {
                            return <div key={i}
                                        className={"DisplayedSection "+this.props.color}
                                        onClick={()=>this.setUrlToGo(element.url)}>{element.text} </div>
                        },this)
                    }
                </div>
            </div>

            {this.props.main?<div className="ColumnImage"><img src={this.props.image} alt=""/></div>:""}

            {this.state.whereToGo&&<Redirect push to={this.state.whereToGo} />}
        </div>
    )
}