import React from 'react';

export class Dropdown extends React.Component
{


    constructor(props)
    {
        super(props);
        this.state={
            searchText: this.props.defaultText||"",
            value: this.props.defaultID||-1,
            name: this.props.name
        }

    }

    componentDidMount(){
        setTimeout( () =>
            this.fillSearch( this.state.searchText || "" , this.state.value || -1)
        , 1000 );
    }

    showOptions(target)
    {
        let options=document.getElementById("DropdownOptions"+this.props.id);
        options.style.height="100px";
        target.target.value="";
        this.fillSearch("",-1);
    }

    hideOptions()
    {
        let options=document.getElementById("DropdownOptions"+this.props.id);
        options.style.height="0px";
    }
    fillSearch(value,id)
    {
        let search = document.getElementById("DropdownSearch"+this.props.id);
        search.value=value;
        this.setState({
            searchText : value,
            value: id
        });
        if (this.props.retrieveData)
            this.props.retrieveData({name: this.props.name, value: id, refIndex: this.props.refIndex});
    }

    handleBuscar  = ({target}) => {
        this.setState({
            searchText : target.value.toLowerCase(),
        })
    };


    render = () => (
        <div className="DropdownContainer" style={this.props.styles||{}}>
            <input className="DropdownSearch" type="text" id={"DropdownSearch"+this.props.id}
                   placeholder={this.props.placeholder} onFocus={(t) => {this.showOptions(t)}}
                    onBlur={()=>{this.hideOptions()}}   onChange={this.handleBuscar}
                    value={this.state.searchText}
                    disabled={this.props.disabled}
                    />
            <i className="zmdi zmdi-chevron-down DropdownIcon"/>
            <div className="DropdownOptions" id={"DropdownOptions"+this.props.id}>
                {
                    this.props.options.filter((o)=>o.text.toLowerCase().includes(this.state.searchText),this).map(function (e,i)
                    {
                        return <div key={i} onClick={()=>this.fillSearch(e.text,e.id)} className="DropdownOption">{e.text}</div>
                },this)}
            </div>
        </div>
    )
}