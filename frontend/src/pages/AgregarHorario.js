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
            goBack : false
        }
    }
    handleChange = (target) => {
        target=target.target||target;
        this.setState({
            [target.name]: target.value
        })
    }

    handleGua = (target) => {
        target=target.target||target;
        this.setState({
            [target.name]: target.value
        })
    }
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
            <Scheduler editable={true}/>
            <GuardarCancelar
                position="center"
                storeData={this.handleGuardar}
                success={this.goEmpleado}
                decline={this.goEmpleado}
            />
                {this.state.goBack && <Redirect to="/dashboard" /> }

        </div>
    )
}
