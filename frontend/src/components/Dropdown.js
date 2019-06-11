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
    fillSearch(value)
    {
        let search = document.getElementById("DropdownSearch"+this.props.id);
        search.value=value;
    }


    render = () => (
        <div className="DropdownContainer">
            <input className="DropdownSearch" type="text" id={"DropdownSearch"+this.props.id}
                   placeholder={this.props.placeholder} onFocus={() => {this.showOptions()}}
                    onBlur={()=>{this.hideOptions()}}/>
            <i className="zmdi zmdi-chevron-down DropdownIcon"></i>
            <div className="DropdownOptions" id={"DropdownOptions"+this.props.id}>
                <div onClick={()=>this.fillSearch("Prueba")} className="DropdownOption">Prueba</div>
                <div onClick={()=>this.fillSearch("Prueba1")} className="DropdownOption">Prueba1</div>
                <div onClick={()=>this.fillSearch("Prueba2")} className="DropdownOption">Prueba2</div>
                <div onClick={()=>this.fillSearch("Prueba3")} className="DropdownOption">Prueba3</div>
                <div onClick={()=>this.fillSearch("Prueba4")} className="DropdownOption">Prueba4</div>
                <div onClick={()=>this.fillSearch("Prueba5")} className="DropdownOption">Prueba5</div>
            </div>
        </div>
    )
}