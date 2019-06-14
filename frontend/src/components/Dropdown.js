import React from 'react';

export class Dropdown extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            searchText: ""
        }

    }

    showOptions(target)
    {
        let options=document.getElementById("DropdownOptions"+this.props.id);
        options.style.height="100px";
        target.target.value="";
        this.fillSearch("");
    }

    hideOptions()
    {
        let options=document.getElementById("DropdownOptions"+this.props.id);
        options.style.height="0px";
    }
    fillSearch(value)
    {
        let search = document.getElementById("DropdownSearch"+this.props.id);
        search.value=value;
        this.setState({
            searchText : value
        })
    }

    handleBuscar  = ({target}) => {
        this.setState({
            searchText : target.value.toLowerCase(),
        })
    };


    render = () => (
        <div className="DropdownContainer">
            <input className="DropdownSearch" type="text" id={"DropdownSearch"+this.props.id}
                   placeholder={this.props.placeholder} onFocus={(t) => {this.showOptions(t)}}
                    onBlur={()=>{this.hideOptions()}}   onChange={this.handleBuscar}/>
            <i className="zmdi zmdi-chevron-down DropdownIcon"/>
            <div className="DropdownOptions" id={"DropdownOptions"+this.props.id}>
                {this.props.options.filter((o)=>o.toLowerCase().includes(this.state.searchText),this).map(function (e,i)
                {
                    return <div key={i} onClick={()=>this.fillSearch(e.toString())} className="DropdownOption">{e}</div>
                },this)}
            </div>
        </div>
    )
}