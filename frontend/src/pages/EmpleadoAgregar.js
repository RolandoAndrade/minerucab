import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Button} from "react-bootstrap";

import {MenuDashBoard} from "../components/MenuDashBoard";
import {InputText} from "../components/InputText";
import {SectionTitle} from "../components/Header/SectionTitle";
import {InputDate} from "../components/InputDate";
import {GuardarCancelar} from "../components/GuardarCancelar";
import { DropdownArreglado } from '../components/DropdownArreglado';

export class EmpleadoAgregar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            users: [{
                u_id_usuario : 0,
                u_correo : "",
                u_clave : "",
                rol_id : ""
            }],
            lastIndex : 0,
            nuevo_empleado : {
                e_id_empleado : 0,
                e_cedula : "",
                e_nombre : "",
                e_segundo_nombre : "",
                e_apellido : "",
                e_segundo_apellido : "",
                e_telefono : "",
                e_fecha_nacimiento : "",
                e_fecha_ingreso : "",
                cargo_id : 0,
                lugar_id : 0,
                estado_id : 0
            },
            lugar : {
                estado_id : 0,
                municipio_id : 0
            }
        }
    }

    componentDidMount = () => {
        // !!! OJO !!! FALTA QUERY PARA PEDIR LUGARES
        /*
        console.log(`----> localhost:4000/consultarLista/cliente`)
        axios.get('http://127.0.0.1:4000/consultarLista/cliente')
          .then( (res) => {
            if(res.status === 200)
              console.log(`<---- (OK 200) localhost:4000/consultarLista/cliente`)
    
            this.setState({
                clientes : res.data.rows
            })
    
          })
        */
      }

    handleGuardar = () => {
        console.log(`----> localhost:4000/insertar/empleado`)
        axios.post('http://127.0.0.1:4000/insertar/empleado', 
            this.state.nuevo_empleado
        )
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/insertar/empleado`)
                this.goEmpleado()
            }
        })
    }

    goEmpleado = () => {
        console.log("asdsd")
        this.setState({
            goEmpleado : true
        })
    }


    addUser = () =>
    {
        let newUsers= this.state.users;
        newUsers.push({
            u_id_usuario : this.state.lastIndex +1,
            u_correo : "",
            u_clave : ""
        });

        this.setState(
            {
                users: newUsers,
                lastIndex : this.state.lastIndex +1
            }
        )
    }

    removeUser = (id) =>
    {
        const newUsers = this.state.users.filter( u => u.u_id_usuario !== id)
        this.setState(
            {
                users: newUsers
            }
        )
    }

    handleChange = ({target}) => {
        console.log(`nuevo_empleado.${target.name} = ${target.value}`)
        this.setState({
            nuevo_empleado :{
                ...this.state.nuevo_empleado,
                [target.name] : target.value
            }
        })
      }

    handleChangeLugar = ({target}) => {
        console.log(`lugar.${target.name} = ${target.value}`)
        this.setState({
            lugar :{
                ...this.state.lugar,
                [target.name] : target.value
            }
        })
    }

    render = () => (
        <div>
            <MenuDashBoard title="Crear empleado"/>
            <div className="RowContainer">
                <div className="WideContainer">
                    <div className="FormContainer">
                        <InputText 
                            id="CrearEmpleadoNombre" 
                            label="Nombre"
                            name="e_nombre"
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoNombre2"
                            label="Segundo Nombre"
                            name="e_segundo_nombre"
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoApellido" 
                            label="Apellido" 
                            name="e_apellido"
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoApellido2" 
                            label="Segundo Apellido"
                            name="e_segundo_apellido"
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoCedula" 
                            label="Número de cédula" 
                            name="e_cedula"
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoTelefono" 
                            label="Número de teléfono" 
                            name="e_telefono"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="WideContainer">
                    <div className="FormContainer">
                        <DropdownArreglado
                            name="cargo_id"
                            onChange={this.handleChange}
                            options={[
                                {text: "Cargo ...", value: 0},
                                {text: "Opción 1", value: 1},
                                {text: "Opción 2", value: 2},
                                {text: "Opción 3", value: 3},
                                {text: "Opción 4", value: 4}
                            ]}
                        />
                        <DropdownArreglado
                            name="estado_id"
                            onChange={this.handleChange}
                            options={[
                                {text: "Status ...", value: 0},
                                {text: "Opción 1", value: 1},
                                {text: "Opción 2", value: 2},
                                {text: "Opción 3", value: 3},
                                {text: "Opción 4", value: 4}
                            ]}
                        />
                        <div className="RowContainer center" style={{width: "80%"}}>
                            <div className="LabelContainer">
                                Fecha de nacimiento : &nbsp;
                            </div>
                            <InputDate 
                                name="e_fecha_nacimiento"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="RowContainer center" style={{width: "80%"}}>
                            <div className="LabelContainer">
                                Fecha de ingreso :
                            </div>
                            <InputDate
                                name="e_fecha_ingreso"
                                onChange={this.handleChange}
                                style={{float: "right"}}
                            />
                        </div>
                        <DropdownArreglado
                            name="estado_id"
                            onChange={this.handleChangeLugar}
                            options={[
                                {text: "Estado donde vive ...", value: 0},
                                {text: "Opción 1", value: 1},
                                {text: "Opción 2", value: 2},
                                {text: "Opción 3", value: 3},
                                {text: "Opción 4", value: 4}
                            ]}
                        />
                        <DropdownArreglado
                            name="municipio_id"
                            onChange={this.handleChangeLugar}
                            options={[
                                {text: "Municipio donde vive...", value: 0},
                                {text: "Opción 1", value: 1},
                                {text: "Opción 2", value: 2},
                                {text: "Opción 3", value: 3},
                                {text: "Opción 4", value: 4}
                            ]}
                        />
                        <DropdownArreglado
                            name="lugar_id"
                            onChange={this.handleChange}
                            options={[
                                {text: "Parroquia donde vive...", value: 0},
                                {text: "Opción 1", value: 1},
                                {text: "Opción 2", value: 2},
                                {text: "Opción 3", value: 3},
                                {text: "Opción 4", value: 4}
                            ]}
                        />
                    </div>
                </div>
                <div className="WideContainer">
                    <div className="FormContainer">
                        <img src="resources/img/Empleado.png" alt="" width="80%" style={{margin: "0 auto"}}/>
                    </div>
                </div>
            </div>

            <div className="Container-90p">
                <div className="LabelContainer">
                    Usuarios asociados al empleado (SEGUNDA ENTREGA)
                </div>
                {
                    this.state.users.map( (u,i)=>
                    {
                        return(
                            <div className="RowContainer" key={i}>
                                <div className="WideContainer" style={{justifyContent: "right", width: "30%"}}>
                                    <i className="zmdi zmdi-close-circle-o LabelIcon" onClick={()=>this.removeUser(u.u_id_usuario)}></i>
                                </div>
                                <div className="WideContainer">
                                    <InputText id={"CrearEmpleadoUsuarioCorreo"+i} label="Correo electrónico"/>
                                </div>
                                <div className="WideContainer">
                                    <InputText id={"CrearEmpleadoUsuarioContra"+i} label="Contraseña inicial"/>
                                </div>
                                <div className="WideContainer">
                                    <DropdownArreglado
                                        name={`user_${u.u_id_usuario}`}
                                        style={{}} 
                                        options={[
                                            {text: "Rol ...", value: 0},
                                            {text: "Opción 1", value: 1},
                                            {text: "Opción 2", value: 2},
                                            {text: "Opción 3", value: 3},
                                            {text: "Opción 4", value: 4}
                                        ]} 
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="Container-90p">
                <div className="ButtonAddUser" onClick={this.addUser}>
                    Agregar usuario
                </div>
            </div>

            <GuardarCancelar 
                position="right"
                guardar={this.handleGuardar}
                cancelar={this.goEmpleado}
            />

            {this.state.goEmpleado && <Redirect to="/empleado" /> }
        </div>
    )
}