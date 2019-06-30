import React from 'react';
import axios from 'axios';

import {Modal, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {Scheduler} from "../components/Scheduler";
import {InputText} from "../components/InputText";
import {GuardarCancelar} from "../components/GuardarCancelar";

export class EditarHorario extends React.Component {
    constructor(props){
        super(props)

        this.state  = {
            h_nombre: "",
            goBack : false,
            horario_id: 1
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
                    console.log(`<---- (OK 200) localhost:4000/consultar/horario`)

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
                console.log(nuevoHorario)
                for(let i in nuevoHorario)
                {
                    console.log(nuevoHorario[i].j_dia)
                    jor[nuevoHorario[i].j_dia].push(
                        {
                            hora_entrada: nuevoHorario[i].j_hora_entrada,
                            hora_salida: nuevoHorario[i].j_hora_salida
                        });
                }

                this.setState({
                    h_nombre: nuevoHorario[0].h_nombre,
                    horario_id: id,
                    jornadas: jor
                })

                console.log(this.state);

            })
    }

    handleChange = (target) => {
        target=target.target||target;
        this.setState({
            [target.name]: target.value
        })
    }

    changesOnScheduler = (e) =>
    {
        this.setState(
            {
                jornadas: e
            }
        );
    };

    goHorario = () =>
    {
        this.setState(
            {goBack: true}
        )
    }

    handleGuardar = () => {
        console.log(`----> localhost:4000/editar/horario`)
        return axios.post('http://127.0.0.1:4000/editar/horario', this.state)
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/editar/horario`)
                }
                return res
            })
            .catch( (err) => err)
    };


    render = () => (
        <div>
            <MenuDashBoard title="Modificar horario"/>
            <div className="WideContainer" style={{maxWidth: "500px", margin:"3% 0"}}>
                <InputText
                    id="CrearHorarioNombre"
                    label="Nombre"
                    name="h_nombre"
                    onChange={this.handleChange}
                    value={this.state.h_nombre}/>
            </div>
            {this.state.jornadas&&<Scheduler editable={true} onChange={this.changesOnScheduler} setData={this.state.jornadas}/>}
            <GuardarCancelar
                position="center"
                storeData={this.handleGuardar}
                success={this.goHorario}
                decline={this.goHorario}
            />
            {this.state.goBack && <Redirect to="../../horario" /> }

        </div>
    )
}