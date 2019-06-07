import React from 'react';

export class DashBoardColumn extends React.Component {


    render = () => (
        <div className={"DashBoardColumn "+this.props.color}>
            <div className={"ColumnTitle"+(this.props.main?" "+this.props.color:"")}>
                {this.props.title}
            </div>
            <div className="SectionsContainer">
                <div className="SectionsDashboard">
                    {
                        this.props.sections.map(
                        function(element)
                        {
                            return <div key={element}>{element}</div>
                        })
                    }
                </div>
            </div>
            <div className="ColumnImage">
                <img src={this.props.image} alt=""/>
            </div>
        </div>
    )
}