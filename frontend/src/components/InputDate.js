import React from 'react';

export class InputDate extends React.Component
{
    selectInput()
    {
        /*let label = document.getElementById("InputTextLabel"+this.props.id);
        label.classList.add("BeSmall");*/
    }

    outInput()
    {
        /*let input = document.getElementById("InputText"+this.props.id);
        let label = document.getElementById("InputTextLabel"+this.props.id);
        if(input.value=="")
        {
            label.classList.remove("BeSmall");
        }*/
    }
    render = () => (
        <div className="InputDateContainer" style={this.props.styles||{}}>
            <input
                {...this.props}
                className="InputDate"
                type="date"

            />
        </div>
    )
}

