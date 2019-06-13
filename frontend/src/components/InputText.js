import React from 'react';

export class InputText extends React.Component
{
    selectInput()
    {
        let label = document.getElementById("InputTextLabel"+this.props.id);
        label.classList.add("BeSmall");
    }

    outInput()
    {
        let input = document.getElementById("InputText"+this.props.id);
        let label = document.getElementById("InputTextLabel"+this.props.id);
        if(input.value=="")
        {
            label.classList.remove("BeSmall");
        }
    }
    render = () => (
        <div className="InputTextContainer">
            <input id={"InputText"+this.props.id} onFocus={()=>this.selectInput()} onBlur={()=>this.outInput()} className="InputText" type="text"/>
            <div id={"InputTextLabel"+this.props.id} className="InputTextLabel">{this.props.label}</div>
        </div>
    )
}
