import React from 'react';

export class Dropdown extends React.Component {

    constructor(props)
    {
        super(props);

        this.state  = {
            search : "",
        }
    }

    showOptions()
    {
        let options=document.getElementById("DropdownOptions"+this.props.id);
        options.style.height="auto";
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
        console.log("entro")
        let search = document.getElementById("DropdownSearch"+this.props.id);
        search.value=value;
    }

    handleBuscar  = ({target}) => {
        this.setState({
            textoBuscardor : target.value.toLowerCase()||"",
        })
    }

    render = () => (
        <div className="DropdownContainer">
            <input className="DropdownSearch" type="text" id={"DropdownSearch"+this.props.id}
                   placeholder={this.props.placeholder} onFocus={() => {this.showOptions()}}
                    onBlur={()=>{this.hideOptions()}}   onChange={this.handleBuscar}/>
            <i className="zmdi zmdi-chevron-down DropdownIcon"/>
            <div className="DropdownOptions" id={"DropdownOptions"+this.props.id}>
                {
                    this.props.options.filter((a)=>a.toLowerCase().includes(this.state.textoBuscardor||"")).map(function (e,i)
                    {
                        console.log(<div key={i} onClick={()=>{this.fillSearch(e)}} className="DropdownOption">{e}</div>)
                        return  <div key={i} onClick={()=>{this.fillSearch(e)}} className="DropdownOption">{e}</div>
                    },this)
                }
            </div>
        </div>
    )
}