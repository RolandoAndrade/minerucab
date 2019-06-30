import React from 'react';
import axios from 'axios';

import {Modal, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {Scheduler} from "../components/Scheduler";
import {InputText} from "../components/InputText";
import {GuardarCancelar} from "../components/GuardarCancelar";


export class AgregarHorario extends React.Component {
    constructor(props){
        super(props)

        this.state  = {
            h_nombre: "",
            goBack : false,
            jornadas: {}
        }
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
        console.log(`----> localhost:4000/insertar/horario`)
        return axios.post('http://127.0.0.1:4000/insertar/horario', this.state)
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/insertar/horario`)
                }
                return res
            })
            .catch( (err) => err)
    };
    render = () => (
        <div>
            <MenuDashBoard title="Agregar horario"/>
            <div className="WideContainer" style={{maxWidth: "500px", margin:"3% 0"}}>
                <InputText
                    id="CrearHorarioNombre"
                    label="Nombre"
                    name="h_nombre"
                    onChange={this.handleChange}/>
            </div>
            <Scheduler editable={true} onChange={this.changesOnScheduler}/>
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
