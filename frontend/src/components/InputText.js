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
        label.classList.remove("grey");
    }

    outInput()
    {
        let input = document.getElementById("InputText"+this.props.id);
        let label = document.getElementById("InputTextLabel"+this.props.id);
        if(input.value=="")
        {
            label.classList.remove("BeSmall");
            label.classList.remove("grey");
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
        <div className="InputTextContainer" style={this.props.styles||{}}>
            <input
                {...this.props}
                id={"InputText"+this.props.id}
                onFocus={()=>this.selectInput()}
                onBlur={()=>this.outInput()}
                className={"InputText"+(this.props.value?" BeSmall":"")}
                placeholder={this.props.placeholder||""}
            />

            {<div id={"InputTextLabel"+this.props.id} className={`InputTextLabel ${this.props.value && "BeSmall grey"}`}>{this.props.label||""}</div>}
        </div>
    )
}
