import React from 'react';

export class Dropdown extends React.Component {

    showOptions()
    {
        let options=document.getElementById("DropdownOptions"+this.props.id);
        options.style.height="100px";
        options.classList.add("WithBorder");
    }

    hideOptions()
    {
        let options=document.getElementById("DropdownOptions"+this.props.id);
        options.style.height="0";
        options.classList.remove("WithBorder");
    }


    render = () => (
        <div className="DropdownContainer">
            <input className="DropdownSearch" type="text"
                   placeholder={this.props.placeholder} onFocus={() => {this.showOptions()}}
                    onBlur={()=>{this.hideOptions()}}/>
            <i className="zmdi zmdi-chevron-down DropdownIcon"></i>
            <div className="DropdownOptions" id={"DropdownOptions"+this.props.id}>
                <div className="DropdownOption">Prueba</div>
                <div className="DropdownOption">Prueba1</div>
                <div className="DropdownOption">Prueba2</div>
                <div className="DropdownOption">Prueba3</div>
                <div className="DropdownOption">Prueba4</div>
                <div className="DropdownOption">Prueba5</div>
            </div>
        </div>
    )
}