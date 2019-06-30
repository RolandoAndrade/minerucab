import React from 'react';

export class Scheduler extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            jornadas: {
                l:[],
                m:[],
                x:[],
                j:[],
                v:[],
                s:[],
                d:[]
            }
        }
    }

    componentDidMount = () => 
    {
        console.log("entr", this.props.setData)
        if(this.props.setData)
        {
            this.setState({jornadas: this.props.setData})
        }
        this.fill(this.props.setData);

    }


    fill(data)
    {
        let as = {l: 0, m: 1, x: 2, j: 3, v: 4, s: 5, d:6}
        for(let i in data)
        {
            for(let j=0;j<data[i].length;j++)
            {
                let h=data[i][j].hora_entrada;
                while(h<(data[i][j].hora_salida==0?24:data[i][j].hora_salida))
                {
                    let t = document.getElementById(h+""+as[i]);
                    t.classList.add("clicked");
                    h++;
                }
            }
        }
    }

    join(jornada)
    {
        let i=0;
        while(i<jornada.length-1)
        {
            if(jornada[i].hora_salida==jornada[i+1].hora_entrada)
            {
                jornada[i].hora_salida=jornada[i+1].hora_salida;
                jornada.splice(i+1,1);
            }
            else if(jornada[i].hora_entrada==jornada[i+1].hora_salida)
            {
                jornada[i].hora_entrada=jornada[i+1].hora_entrada;
                jornada.splice(i+1,1);
            }
            else
            {
                i++;
            }
        }
        return jornada;
    }

    saveHours(hour,day,t)
    {
        if(this.props.editable)
        {
            let days = ["l", "m", "x", "j", "v", "s", "d"];
            if (t.target.classList.contains("clicked"))
            {
                t.target.classList.remove("clicked");
                let jor = this.state.jornadas[days[day]];
                for (let i = 0; i < jor.length; i++)
                {
                    if (jor[i].hora_entrada == hour && jor[i].hora_salida == hour + 1)
                    {
                        jor.splice(i, 1);
                        break;
                    } else if (jor[i].hora_entrada == hour)
                    {
                        jor[i].hora_entrada++;
                        break;
                    } else if (jor[i].hora_entrada <= hour && hour < jor[i].hora_salida)
                    {
                        let ax = jor[i].hora_salida;
                        jor[i].hora_salida = hour;
                        if (hour + 1 != ax)
                        {
                            jor.push({hora_entrada: hour + 1, hora_salida: ax})
                        }
                    }
                }
                this.setState(
                    {
                        [days[day]]: jor
                    }
                )
            } else
            {
                t.target.classList.add("clicked");
                let jor = this.state.jornadas[days[day]];
                let c = true;
                for (let i = 0; i < jor.length && c; i++)
                {
                    if (jor[i].hora_salida == hour)
                    {
                        jor[i].hora_salida=jor[i].hora_salida+1;
                        c = false;
                        this.setState({
                            [days[day]]: this.join(jor)
                        })
                    } else if (jor[i].hora_entrada == hour + 1)
                    {
                        jor[i].hora_entrada--;
                        c = false;
                        this.setState({
                            [days[day]]: this.join(jor)
                        })
                    }
                }
                if (c)
                {
                    let v = {hora_entrada: hour, hora_salida: hour + 1};
                    jor.push(v);
                    this.setState({
                        [days[day]]: this.join(jor)
                    })
                }
            }
            this.props.onChange(this.state.jornadas)
        }
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
                <div id={"00"} onClick={(target)=>this.saveHours(0,0,target)} className="SelectHora"></div>
                <div id={"01"} onClick={(target)=>this.saveHours(0,1,target)} className="SelectHora"></div>
                <div id={"02"} onClick={(target)=>this.saveHours(0,2,target)} className="SelectHora"></div>
                <div id={"03"} onClick={(target)=>this.saveHours(0,3,target)} className="SelectHora"></div>
                <div id={"04"} onClick={(target)=>this.saveHours(0,4,target)} className="SelectHora"></div>
                <div id={"05"} onClick={(target)=>this.saveHours(0,5,target)} className="SelectHora"></div>
                <div id={"06"} onClick={(target)=>this.saveHours(0,6,target)} className="SelectHora"></div>
                <div className="Hora">01:00-02:00</div>
                <div id={"10"} onClick={(target)=>this.saveHours(1,0,target)} className="SelectHora"></div>
                <div id={"11"} onClick={(target)=>this.saveHours(1,1,target)} className="SelectHora"></div>
                <div id={"12"} onClick={(target)=>this.saveHours(1,2,target)} className="SelectHora"></div>
                <div id={"13"} onClick={(target)=>this.saveHours(1,3,target)} className="SelectHora"></div>
                <div id={"14"} onClick={(target)=>this.saveHours(1,4,target)} className="SelectHora"></div>
                <div id={"15"} onClick={(target)=>this.saveHours(1,5,target)} className="SelectHora"></div>
                <div id={"16"} onClick={(target)=>this.saveHours(1,6,target)} className="SelectHora"></div>
                <div className="Hora">02:00-03:00</div>
                <div id={"20"} onClick={(target)=>this.saveHours(2,0,target)} className="SelectHora"></div>
                <div id={"21"} onClick={(target)=>this.saveHours(2,1,target)} className="SelectHora"></div>
                <div id={"22"} onClick={(target)=>this.saveHours(2,2,target)} className="SelectHora"></div>
                <div id={"23"} onClick={(target)=>this.saveHours(2,3,target)} className="SelectHora"></div>
                <div id={"24"} onClick={(target)=>this.saveHours(2,4,target)} className="SelectHora"></div>
                <div id={"25"} onClick={(target)=>this.saveHours(2,5,target)} className="SelectHora"></div>
                <div id={"26"} onClick={(target)=>this.saveHours(2,6,target)} className="SelectHora"></div>
                <div className="Hora">03:00-04:00</div>
                <div id={"30"} onClick={(target)=>this.saveHours(3,0,target)} className="SelectHora"></div>
                <div id={"31"} onClick={(target)=>this.saveHours(3,1,target)} className="SelectHora"></div>
                <div id={"32"} onClick={(target)=>this.saveHours(3,2,target)} className="SelectHora"></div>
                <div id={"33"} onClick={(target)=>this.saveHours(3,3,target)} className="SelectHora"></div>
                <div id={"34"} onClick={(target)=>this.saveHours(3,4,target)} className="SelectHora"></div>
                <div id={"35"} onClick={(target)=>this.saveHours(3,5,target)} className="SelectHora"></div>
                <div id={"36"} onClick={(target)=>this.saveHours(3,6,target)} className="SelectHora"></div>
                <div className="Hora">04:00-05:00</div>
                <div id={"40"} onClick={(target)=>this.saveHours(4,0,target)} className="SelectHora"></div>
                <div id={"41"} onClick={(target)=>this.saveHours(4,1,target)} className="SelectHora"></div>
                <div id={"42"} onClick={(target)=>this.saveHours(4,2,target)} className="SelectHora"></div>
                <div id={"43"} onClick={(target)=>this.saveHours(4,3,target)} className="SelectHora"></div>
                <div id={"44"} onClick={(target)=>this.saveHours(4,4,target)} className="SelectHora"></div>
                <div id={"45"} onClick={(target)=>this.saveHours(4,5,target)} className="SelectHora"></div>
                <div id={"46"} onClick={(target)=>this.saveHours(4,6,target)} className="SelectHora"></div>
                <div className="Hora">05:00-06:00</div>
                <div id={"50"} onClick={(target)=>this.saveHours(5,0,target)} className="SelectHora"></div>
                <div id={"51"} onClick={(target)=>this.saveHours(5,1,target)} className="SelectHora"></div>
                <div id={"52"} onClick={(target)=>this.saveHours(5,2,target)} className="SelectHora"></div>
                <div id={"53"} onClick={(target)=>this.saveHours(5,3,target)} className="SelectHora"></div>
                <div id={"54"} onClick={(target)=>this.saveHours(5,4,target)} className="SelectHora"></div>
                <div id={"55"} onClick={(target)=>this.saveHours(5,5,target)} className="SelectHora"></div>
                <div id={"56"} onClick={(target)=>this.saveHours(5,6,target)} className="SelectHora"></div>
                <div className="Hora">06:00-07:00</div>
                <div id={"60"} onClick={(target)=>this.saveHours(6,0,target)} className="SelectHora"></div>
                <div id={"61"} onClick={(target)=>this.saveHours(6,1,target)} className="SelectHora"></div>
                <div id={"62"} onClick={(target)=>this.saveHours(6,2,target)} className="SelectHora"></div>
                <div id={"63"} onClick={(target)=>this.saveHours(6,3,target)} className="SelectHora"></div>
                <div id={"64"} onClick={(target)=>this.saveHours(6,4,target)} className="SelectHora"></div>
                <div id={"65"} onClick={(target)=>this.saveHours(6,5,target)} className="SelectHora"></div>
                <div id={"66"} onClick={(target)=>this.saveHours(6,6,target)} className="SelectHora"></div>
                <div className="Hora">07:00-08:00</div>
                <div id={"70"} onClick={(target)=>this.saveHours(7,0,target)} className="SelectHora"></div>
                <div id={"71"} onClick={(target)=>this.saveHours(7,1,target)} className="SelectHora"></div>
                <div id={"72"} onClick={(target)=>this.saveHours(7,2,target)} className="SelectHora"></div>
                <div id={"73"} onClick={(target)=>this.saveHours(7,3,target)} className="SelectHora"></div>
                <div id={"74"} onClick={(target)=>this.saveHours(7,4,target)} className="SelectHora"></div>
                <div id={"75"} onClick={(target)=>this.saveHours(7,5,target)} className="SelectHora"></div>
                <div id={"76"} onClick={(target)=>this.saveHours(7,6,target)} className="SelectHora"></div>
                <div className="Hora">08:00-09:00</div>
                <div id={"80"} onClick={(target)=>this.saveHours(8,0,target)} className="SelectHora"></div>
                <div id={"81"} onClick={(target)=>this.saveHours(8,1,target)} className="SelectHora"></div>
                <div id={"82"} onClick={(target)=>this.saveHours(8,2,target)} className="SelectHora"></div>
                <div id={"83"} onClick={(target)=>this.saveHours(8,3,target)} className="SelectHora"></div>
                <div id={"84"} onClick={(target)=>this.saveHours(8,4,target)} className="SelectHora"></div>
                <div id={"85"} onClick={(target)=>this.saveHours(8,5,target)} className="SelectHora"></div>
                <div id={"86"} onClick={(target)=>this.saveHours(8,6,target)} className="SelectHora"></div>
                <div className="Hora">09:00-10:00</div>
                <div id={"90"} onClick={(target)=>this.saveHours(9,0,target)} className="SelectHora"></div>
                <div id={"91"} onClick={(target)=>this.saveHours(9,1,target)} className="SelectHora"></div>
                <div id={"92"} onClick={(target)=>this.saveHours(9,2,target)} className="SelectHora"></div>
                <div id={"93"} onClick={(target)=>this.saveHours(9,3,target)} className="SelectHora"></div>
                <div id={"94"} onClick={(target)=>this.saveHours(9,4,target)} className="SelectHora"></div>
                <div id={"95"} onClick={(target)=>this.saveHours(9,5,target)} className="SelectHora"></div>
                <div id={"96"} onClick={(target)=>this.saveHours(9,6,target)} className="SelectHora"></div>
                <div className="Hora">10:00-11:00</div>
                <div id={"100"} onClick={(target)=>this.saveHours(10,0,target)} className="SelectHora"></div>
                <div id={"101"} onClick={(target)=>this.saveHours(10,1,target)} className="SelectHora"></div>
                <div id={"102"} onClick={(target)=>this.saveHours(10,2,target)} className="SelectHora"></div>
                <div id={"103"} onClick={(target)=>this.saveHours(10,3,target)} className="SelectHora"></div>
                <div id={"104"} onClick={(target)=>this.saveHours(10,4,target)} className="SelectHora"></div>
                <div id={"105"} onClick={(target)=>this.saveHours(10,5,target)} className="SelectHora"></div>
                <div id={"106"} onClick={(target)=>this.saveHours(10,6,target)} className="SelectHora"></div>
                <div className="Hora">11:00-12:00</div>
                <div id={"110"} onClick={(target)=>this.saveHours(11,0,target)} className="SelectHora"></div>
                <div id={"111"} onClick={(target)=>this.saveHours(11,1,target)} className="SelectHora"></div>
                <div id={"112"} onClick={(target)=>this.saveHours(11,2,target)} className="SelectHora"></div>
                <div id={"113"} onClick={(target)=>this.saveHours(11,3,target)} className="SelectHora"></div>
                <div id={"114"} onClick={(target)=>this.saveHours(11,4,target)} className="SelectHora"></div>
                <div id={"115"} onClick={(target)=>this.saveHours(11,5,target)} className="SelectHora"></div>
                <div id={"116"} onClick={(target)=>this.saveHours(11,6,target)} className="SelectHora"></div>
                <div className="Hora">12:00-13:00</div>
                <div id={"120"} onClick={(target)=>this.saveHours(12,0,target)} className="SelectHora"></div>
                <div id={"121"} onClick={(target)=>this.saveHours(12,1,target)} className="SelectHora"></div>
                <div id={"122"} onClick={(target)=>this.saveHours(12,2,target)} className="SelectHora"></div>
                <div id={"123"} onClick={(target)=>this.saveHours(12,3,target)} className="SelectHora"></div>
                <div id={"124"} onClick={(target)=>this.saveHours(12,4,target)} className="SelectHora"></div>
                <div id={"125"} onClick={(target)=>this.saveHours(12,5,target)} className="SelectHora"></div>
                <div id={"126"} onClick={(target)=>this.saveHours(12,6,target)} className="SelectHora"></div>
                <div className="Hora">13:00-14:00</div>
                <div id={"130"} onClick={(target)=>this.saveHours(13,0,target)} className="SelectHora"></div>
                <div id={"131"} onClick={(target)=>this.saveHours(13,1,target)} className="SelectHora"></div>
                <div id={"132"} onClick={(target)=>this.saveHours(13,2,target)} className="SelectHora"></div>
                <div id={"133"} onClick={(target)=>this.saveHours(13,3,target)} className="SelectHora"></div>
                <div id={"134"} onClick={(target)=>this.saveHours(13,4,target)} className="SelectHora"></div>
                <div id={"135"} onClick={(target)=>this.saveHours(13,5,target)} className="SelectHora"></div>
                <div id={"136"} onClick={(target)=>this.saveHours(13,6,target)} className="SelectHora"></div>
                <div className="Hora">14:00-15:00</div>
                <div id={"140"} onClick={(target)=>this.saveHours(14,0,target)} className="SelectHora"></div>
                <div id={"141"} onClick={(target)=>this.saveHours(14,1,target)} className="SelectHora"></div>
                <div id={"142"} onClick={(target)=>this.saveHours(14,2,target)} className="SelectHora"></div>
                <div id={"143"} onClick={(target)=>this.saveHours(14,3,target)} className="SelectHora"></div>
                <div id={"144"} onClick={(target)=>this.saveHours(14,4,target)} className="SelectHora"></div>
                <div id={"145"} onClick={(target)=>this.saveHours(14,5,target)} className="SelectHora"></div>
                <div id={"146"} onClick={(target)=>this.saveHours(14,6,target)} className="SelectHora"></div>
                <div className="Hora">15:00-16:00</div>
                <div id={"150"} onClick={(target)=>this.saveHours(15,0,target)} className="SelectHora"></div>
                <div id={"151"} onClick={(target)=>this.saveHours(15,1,target)} className="SelectHora"></div>
                <div id={"152"} onClick={(target)=>this.saveHours(15,2,target)} className="SelectHora"></div>
                <div id={"153"} onClick={(target)=>this.saveHours(15,3,target)} className="SelectHora"></div>
                <div id={"154"} onClick={(target)=>this.saveHours(15,4,target)} className="SelectHora"></div>
                <div id={"155"} onClick={(target)=>this.saveHours(15,5,target)} className="SelectHora"></div>
                <div id={"156"} onClick={(target)=>this.saveHours(15,6,target)} className="SelectHora"></div>
                <div className="Hora">16:00-17:00</div>
                <div id={"160"} onClick={(target)=>this.saveHours(16,0,target)} className="SelectHora"></div>
                <div id={"161"} onClick={(target)=>this.saveHours(16,1,target)} className="SelectHora"></div>
                <div id={"162"} onClick={(target)=>this.saveHours(16,2,target)} className="SelectHora"></div>
                <div id={"163"} onClick={(target)=>this.saveHours(16,3,target)} className="SelectHora"></div>
                <div id={"164"} onClick={(target)=>this.saveHours(16,4,target)} className="SelectHora"></div>
                <div id={"165"} onClick={(target)=>this.saveHours(16,5,target)} className="SelectHora"></div>
                <div id={"166"} onClick={(target)=>this.saveHours(16,6,target)} className="SelectHora"></div>
                <div className="Hora">17:00-18:00</div>
                <div id={"170"} onClick={(target)=>this.saveHours(17,0,target)} className="SelectHora"></div>
                <div id={"171"} onClick={(target)=>this.saveHours(17,1,target)} className="SelectHora"></div>
                <div id={"172"} onClick={(target)=>this.saveHours(17,2,target)} className="SelectHora"></div>
                <div id={"173"} onClick={(target)=>this.saveHours(17,3,target)} className="SelectHora"></div>
                <div id={"174"} onClick={(target)=>this.saveHours(17,4,target)} className="SelectHora"></div>
                <div id={"175"} onClick={(target)=>this.saveHours(17,5,target)} className="SelectHora"></div>
                <div id={"176"} onClick={(target)=>this.saveHours(17,6,target)} className="SelectHora"></div>
                <div className="Hora">18:00-19:00</div>
                <div id={"180"} onClick={(target)=>this.saveHours(18,0,target)} className="SelectHora"></div>
                <div id={"181"} onClick={(target)=>this.saveHours(18,1,target)} className="SelectHora"></div>
                <div id={"182"} onClick={(target)=>this.saveHours(18,2,target)} className="SelectHora"></div>
                <div id={"183"} onClick={(target)=>this.saveHours(18,3,target)} className="SelectHora"></div>
                <div id={"184"} onClick={(target)=>this.saveHours(18,4,target)} className="SelectHora"></div>
                <div id={"185"} onClick={(target)=>this.saveHours(18,5,target)} className="SelectHora"></div>
                <div id={"186"} onClick={(target)=>this.saveHours(18,6,target)} className="SelectHora"></div>
                <div className="Hora">19:00-20:00</div>
                <div id={"190"} onClick={(target)=>this.saveHours(19,0,target)} className="SelectHora"></div>
                <div id={"191"} onClick={(target)=>this.saveHours(19,1,target)} className="SelectHora"></div>
                <div id={"192"} onClick={(target)=>this.saveHours(19,2,target)} className="SelectHora"></div>
                <div id={"193"} onClick={(target)=>this.saveHours(19,3,target)} className="SelectHora"></div>
                <div id={"194"} onClick={(target)=>this.saveHours(19,4,target)} className="SelectHora"></div>
                <div id={"195"} onClick={(target)=>this.saveHours(19,5,target)} className="SelectHora"></div>
                <div id={"196"} onClick={(target)=>this.saveHours(19,6,target)} className="SelectHora"></div>
                <div className="Hora">20:00-21:00</div>
                <div id={"200"} onClick={(target)=>this.saveHours(20,0,target)} className="SelectHora"></div>
                <div id={"201"} onClick={(target)=>this.saveHours(20,1,target)} className="SelectHora"></div>
                <div id={"202"} onClick={(target)=>this.saveHours(20,2,target)} className="SelectHora"></div>
                <div id={"203"} onClick={(target)=>this.saveHours(20,3,target)} className="SelectHora"></div>
                <div id={"204"} onClick={(target)=>this.saveHours(20,4,target)} className="SelectHora"></div>
                <div id={"205"} onClick={(target)=>this.saveHours(20,5,target)} className="SelectHora"></div>
                <div id={"206"} onClick={(target)=>this.saveHours(20,6,target)} className="SelectHora"></div>
                <div className="Hora">21:00-22:00</div>
                <div id={"210"} onClick={(target)=>this.saveHours(21,0,target)} className="SelectHora"></div>
                <div id={"211"} onClick={(target)=>this.saveHours(21,1,target)} className="SelectHora"></div>
                <div id={"212"} onClick={(target)=>this.saveHours(21,2,target)} className="SelectHora"></div>
                <div id={"213"} onClick={(target)=>this.saveHours(21,3,target)} className="SelectHora"></div>
                <div id={"214"} onClick={(target)=>this.saveHours(21,4,target)} className="SelectHora"></div>
                <div id={"215"} onClick={(target)=>this.saveHours(21,5,target)} className="SelectHora"></div>
                <div id={"216"} onClick={(target)=>this.saveHours(21,6,target)} className="SelectHora"></div>
                <div className="Hora">22:00-23:00</div>
                <div id={"220"} onClick={(target)=>this.saveHours(22,0,target)} className="SelectHora"></div>
                <div id={"221"} onClick={(target)=>this.saveHours(22,1,target)} className="SelectHora"></div>
                <div id={"222"} onClick={(target)=>this.saveHours(22,2,target)} className="SelectHora"></div>
                <div id={"223"} onClick={(target)=>this.saveHours(22,3,target)} className="SelectHora"></div>
                <div id={"224"} onClick={(target)=>this.saveHours(22,4,target)} className="SelectHora"></div>
                <div id={"225"} onClick={(target)=>this.saveHours(22,5,target)} className="SelectHora"></div>
                <div id={"226"} onClick={(target)=>this.saveHours(22,6,target)} className="SelectHora"></div>
                <div className="Hora">23:00-00:00</div>
                <div id={"230"} onClick={(target)=>this.saveHours(23,0,target)} className="SelectHora"></div>
                <div id={"231"} onClick={(target)=>this.saveHours(23,1,target)} className="SelectHora"></div>
                <div id={"232"} onClick={(target)=>this.saveHours(23,2,target)} className="SelectHora"></div>
                <div id={"233"} onClick={(target)=>this.saveHours(23,3,target)} className="SelectHora"></div>
                <div id={"234"} onClick={(target)=>this.saveHours(23,4,target)} className="SelectHora"></div>
                <div id={"235"} onClick={(target)=>this.saveHours(23,5,target)} className="SelectHora"></div>
                <div id={"236"} onClick={(target)=>this.saveHours(23,6,target)} className="SelectHora"></div>

            </div>
        </div>
    )
}

