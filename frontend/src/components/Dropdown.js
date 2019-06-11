import React from 'react';

export class Dropdown extends React.Component {


    render = () => (
        <div className="DropdownContainer">
            <input className="DropdownSearch" type="text" placeholder={this.props.placeholder}/>
            <div className="DropdownOptions">
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