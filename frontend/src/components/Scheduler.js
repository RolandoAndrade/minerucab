import React from 'react';

export class Scheduler extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    saveHours(h,d,t)
    {
        t.target.classList.add("clicked")
    }

    render = () => (
        <div className="WideContainer">
            <div className="Scheduler">
                <div className="Hora">Hora</div>
                <div className="Dia">Lunes</div>
                <div className="Dia">Martes</div>
                <div className="Dia">Miércoles</div>
                <div className="Dia">Jueves</div>
                <div className="Dia">Viernes</div>
                <div className="Dia">Sábado</div>
                <div className="Dia">Domingo</div>
                <div className="Hora">00:00-01:00</div>
                <div onClick={(target)=>this.saveHours(0,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(0,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(0,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(0,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(0,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(0,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(0,6,target)} className="SelectHora"></div>
                <div className="Hora">01:00-02:00</div>
                <div onClick={(target)=>this.saveHours(1,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(1,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(1,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(1,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(1,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(1,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(1,6,target)} className="SelectHora"></div>
                <div className="Hora">02:00-03:00</div>
                <div onClick={(target)=>this.saveHours(2,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(2,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(2,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(2,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(2,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(2,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(2,6,target)} className="SelectHora"></div>
                <div className="Hora">03:00-04:00</div>
                <div onClick={(target)=>this.saveHours(3,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(3,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(3,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(3,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(3,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(3,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(3,6,target)} className="SelectHora"></div>
                <div className="Hora">04:00-05:00</div>
                <div onClick={(target)=>this.saveHours(4,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(4,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(4,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(4,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(4,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(4,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(4,6,target)} className="SelectHora"></div>
                <div className="Hora">05:00-06:00</div>
                <div onClick={(target)=>this.saveHours(5,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(5,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(5,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(5,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(5,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(5,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(5,6,target)} className="SelectHora"></div>
                <div className="Hora">06:00-07:00</div>
                <div onClick={(target)=>this.saveHours(6,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(6,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(6,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(6,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(6,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(6,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(6,6,target)} className="SelectHora"></div>
                <div className="Hora">07:00-08:00</div>
                <div onClick={(target)=>this.saveHours(7,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(7,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(7,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(7,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(7,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(7,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(7,6,target)} className="SelectHora"></div>
                <div className="Hora">08:00-09:00</div>
                <div onClick={(target)=>this.saveHours(8,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(8,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(8,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(8,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(8,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(8,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(8,6,target)} className="SelectHora"></div>
                <div className="Hora">09:00-10:00</div>
                <div onClick={(target)=>this.saveHours(9,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(9,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(9,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(9,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(9,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(9,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(9,6,target)} className="SelectHora"></div>
                <div className="Hora">10:00-11:00</div>
                <div onClick={(target)=>this.saveHours(10,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(10,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(10,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(10,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(10,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(10,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(10,6,target)} className="SelectHora"></div>
                <div className="Hora">11:00-12:00</div>
                <div onClick={(target)=>this.saveHours(11,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(11,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(11,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(11,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(11,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(11,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(11,6,target)} className="SelectHora"></div>
                <div className="Hora">12:00-13:00</div>
                <div onClick={(target)=>this.saveHours(12,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(12,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(12,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(12,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(12,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(12,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(12,6,target)} className="SelectHora"></div>
                <div className="Hora">13:00-14:00</div>
                <div onClick={(target)=>this.saveHours(13,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(13,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(13,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(13,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(13,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(13,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(13,6,target)} className="SelectHora"></div>
                <div className="Hora">14:00-15:00</div>
                <div onClick={(target)=>this.saveHours(14,0,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(14,1,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(14,2,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(14,3,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(14,4,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(14,5,target)} className="SelectHora"></div>
                <div onClick={(target)=>this.saveHours(14,6,target)} className="SelectHora"></div>
                <div className="Hora">15:00-16:00</div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                <div className="Hora">16:00-17:00</div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                <div className="Hora">17:00-18:00</div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                <div className="Hora">18:00-19:00</div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                <div className="Hora">19:00-20:00</div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                <div className="Hora">20:00-21:00</div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                <div className="Hora">21:00-22:00</div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                <div className="Hora">22:00-23:00</div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                <div className="Hora">23:00-00:00</div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>
                    <div className="SelectHora"></div>

            </div>
        </div>
    )
}

