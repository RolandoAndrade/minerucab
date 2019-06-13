import React from 'react';

export class InputText extends React.Component
{
    selectInput()
    {
        let label = document.getElementById("InputTextLabel");
        label.style.fontSize="8px";
        label.style.paddingTop="1px";
    }

    outInput()
    {
        let input = document.getElementById("InputText");
        let label = document.getElementById("InputTextLabel");
        if(input.value=="")
        {
            console.log("Entro");
            label.style.removeProperty("font-size");
            label.style.removeProperty("padding-top");
        }
    }
    render = () => (
        <div className="InputTextContainer">
            <input id={"InputText"} onFocus={this.selectInput} onBlur={this.outInput} className="InputText" type="text"/>
            <div id={"InputTextLabel"} className="InputTextLabel">Etiqueta</div>
        </div>
    )
}
