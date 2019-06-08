import React from 'react';

export class DashBoardColumn extends React.Component {


    render = () => (
        <div className={"DashBoardColumn "+this.props.color} style={(!this.props.main?{height: "50vh"}:{})}>
            <div className={"ColumnTitle"+(this.props.main?" "+this.props.color:"")}>
                {this.props.title}
            </div>
            <div className="SectionsContainer" style={(!this.props.main?{height: "100%"}:{})}>
                <div className="SectionsDashboard">
                    {
                        this.props.sections.map(
                        function(element)
                        {
                            return <div key={element} className={"DisplayedSection "+this.props.color}>{element}</div>
                        },this)
                    }
                </div>
            </div>

            {this.props.main?<div className="ColumnImage"><img src={this.props.image} alt=""/></div>:""}

        </div>
    )
}