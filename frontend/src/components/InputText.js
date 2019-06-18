import React from 'react';

export class InputText extends React.Component
{
    selectInput()
    {
        let input = document.getElementById("InputText"+this.props.id);
        let label = document.getElementById("InputTextLabel"+this.props.id);
        label.classList.add("BeSmall");
        label.classList.remove("red");
        input.classList.remove("error");
    }

    outInput()
    {
        let input = document.getElementById("InputText"+this.props.id);
        let label = document.getElementById("InputTextLabel"+this.props.id);
        if(input.value=="")
        {
            label.classList.remove("BeSmall");
            label.classList.remove("grey")
        }
        else
        {
            label.classList.add("grey");
        }
    }

    error()
    {
        let input = document.getElementById("InputText"+this.props.id);
        let label = document.getElementById("InputTextLabel"+this.props.id);
        input.classList.add("error");
        label.classList.add("red");
    }


    render = () => (
        <div className="InputTextContainer">
            <input id={"InputText"+this.props.id} onFocus={()=>this.selectInput()} onBlur={()=>this.outInput()} className="InputText" type="text"
            placeholder={this.props.placeholder||""}/>

            {<div id={"InputTextLabel"+this.props.id} className="InputTextLabel">{this.props.label||""}</div>}
        </div>
    )
}
