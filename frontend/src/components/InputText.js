import React from 'react';

export class InputText extends React.Component
{
    selectInput()
    {
        let label = document.getElementById("InputTextLabel"+this.props.id);
        label.style.fontSize="8px";
        label.style.paddingTop="1px";
    }

    outInput()
    {
        let input = document.getElementById("InputText"+this.props.id);
        let label = document.getElementById("InputTextLabel"+this.props.id);
        if(input.value=="")
        {
            label.style.removeProperty("font-size");
            label.style.removeProperty("padding-top");
        }
    }
    render = () => (
        <div className="InputTextContainer">
            <input id={"InputText"+this.props.id} onFocus={()=>this.selectInput()} onBlur={()=>this.outInput()} className="InputText" type="text"/>
            <div id={"InputTextLabel"+this.props.id} className="InputTextLabel">{this.props.label}</div>
        </div>
    )
}
