import React from 'react';

export class DashBoardColumn extends React.Component {


    render = () => (
        <div className="DashBoardColumn">
            <div className="ColumnTitle">
                {this.props.title}
            </div>
            <div className="SectionsContainer">
                <div className="SectionsDashboard">
                    {this.props.sections.map(
                        function(element)
                        {
                            return <div key={element}>{element}</div>
                        })
                    }
                </div>
            </div>
            <div className="ColumnImage">

            </div>
        </div>
    )
}