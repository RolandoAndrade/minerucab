import React from 'react';
import axios from 'axios';

import {Modal, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {Scheduler} from "../components/Scheduler";


export class EditarHorario extends React.Component {
    constructor(props){
        super(props)

        this.state  = {
            goBack : false,
        }
    }

    componentDidMount = () => {

        const id = parseInt(this.props.location.pathname.split("/")[3]);
        console.log(id);
        console.log(`----> localhost:4000/consultar/horario`)
        axios.post('http://127.0.0.1:4000/consultar/horario',
            { h_id_horario : id }
        )
            .then( (res) => {
                if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultar/yacimiento`)

                const nuevoHorario = {
                    ...res.data.rows
                }

                let jor={
                    l:[],
                    m:[],
                    x:[],
                    j:[],
                    v:[],
                    s:[],
                    d:[]
                };
                for(let i=0;i<nuevoHorario.length;i++)
                {
                    jor[nuevoHorario[i].j_dia].push(
                        {
                            hora_entrada: nuevoHorario[i].j_hora_entrada,
                            hora_salida: nuevoHorario[i].j_hora_salida
                        });
                }

                this.setState({
                    nuevo_horario: jor
                })

                console.log(this.state);

            })
    }

    render = () => (
        <div>
            <MenuDashBoard title="Agregar horario"/>
            {this.state.nuevo_horario&&<Scheduler fillWith={this.state.nuevo_horario}/>}
            {this.state.goBack && <Redirect to="/dashboard" /> }

        </div>
    )
}