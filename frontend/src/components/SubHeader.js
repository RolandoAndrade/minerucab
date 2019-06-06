import React from 'react';



export class SubHeader extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            showDashboard : false
        }
    }

    move(number)
    {
        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': window.outerHeight*number*0.95
        });

    }
    render = () => (
        <div className="SubHeaderHome">
            <div onClick={()=>this.move(0)} className="HeaderSubTitle y">Historia</div>
            <div onClick={()=>this.move(1)} className="HeaderSubTitle b">Nosotros</div>
            <div onClick={()=>this.move(2)} className="HeaderSubTitle g">Contacto</div>
        </div>
    )
}