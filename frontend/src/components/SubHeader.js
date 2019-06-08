import React from 'react';

/*
window.addEventListener("wheel",function (event)
{
    if(event.deltaY>50)
    {
        SubHeader.move(Math.min(2,SubHeader.number+1));
    }
    else if(event.deltaY<-50)
    {
        SubHeader.move(Math.max(0,SubHeader.number-1));
    }
});*/

export class SubHeader extends React.Component {

    constructor(props){
        super(props);
        SubHeader.number=0;
        this.state = {
            showDashboard : false
        }
    }

    static move(number)
    {
        let a=document.getElementsByClassName("HomeContainer")[number];
        console.log(a.offsetTop);
        window.scrollTo({
            'behavior': 'smooth',
            'left': 0,
            'top': a.offsetTop-35
        });
        SubHeader.number=number;

    }
    render = () => (
        <div className="SubHeaderHome">
            <div onClick={()=> SubHeader.move(0)} className="HeaderSubTitle y">Historia</div>
            <div onClick={()=> SubHeader.move(1)} className="HeaderSubTitle b">Nosotros</div>
            <div onClick={()=> SubHeader.move(2)} className="HeaderSubTitle g">Contacto</div>
        </div>
    )
}