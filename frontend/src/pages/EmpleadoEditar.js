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
import {Dropdown} from "../components/Dropdown"

import {cleanerLugar, cleanerCargo} from "../utils/cleaner"

export class EmpleadoEditar extends React.Component {
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
                estado_id : 0
            },
            lugar : {
                estado_id : 0,
                municipio_id : 0,
                parroquia_id : 0
            },
            lugares : []
        }
    }

    componentDidMount = () => {
        const id = Number.parseInt(this.props.location.pathname.split("/")[3] , 10)

        console.log(`----> localhost:4000/consultar/empleado`)
        axios.post('http://127.0.0.1:4000/consultar/empleado', 
            { e_id_empleado : id }
        )
            .then( (res) => {
                if(res.status === 200)
                console.log(`<---- (OK 200) localhost:4000/consultar/empleado`)
                
                const nuevo_empleado = {
                    ...res.data.rows[0],
                    e_fecha_nacimiento : res.data.rows[0].e_fecha_nacimiento.split('T')[0],
                    e_fecha_ingreso : res.data.rows[0].e_fecha_ingreso.split('T')[0]
                }

                this.setState({
                    nuevo_empleado : nuevo_empleado
                })
                
                return nuevo_empleado
                
            })
            .then( (nuevo_empleado) => {
                
                console.log(`----> localhost:4000/consultarLista/lugar`)
                axios.get('http://127.0.0.1:4000/consultarLista/lugar')
                .then( (res) => {
                    if(res.status === 200)
                        console.log(`<---- (OK 200) localhost:4000/consultarLista/lugar`)
            
                    this.setState({
                        lugares : res.data.rows
                    },
                        () => this.establecerLugar()
                    )

                })

            })
            .then( () => {
                
                console.log(`----> localhost:4000/consultarLista/cargo`)
                axios.get('http://127.0.0.1:4000/consultarLista/cargo')
                .then( (res) => {
                    if(res.status === 200)
                        console.log(`<---- (OK 200) localhost:4000/consultarLista/cargo`)
                    const cargos = res.data.rows
                    this.setState({
                        cargos : cargos,
                        nuevo_empleado : {
                            ...this.state.nuevo_empleado,
                            cargo_inicial : cargos.find( c => c.c_id_cargo === this.state.nuevo_empleado.cargo_id).c_nombre
                        }
                    })
            
                })

            })
      }

    establecerLugar = () => {
        const parroquia = this.state.lugares.filter( 
            l => l.l_id_lugar === this.state.nuevo_empleado.lugar_id 
        )[0]
        const municipio = this.state.lugares.filter( 
            l => l.l_id_lugar === parroquia.lugar_id 
        )[0]

        const estado = this.state.lugares.filter( 
            l => l.l_id_lugar === municipio.lugar_id 
        )[0]
        
        this.setState({
            lugar : {
                estado_id : estado.l_id_lugar,
                municipio_id : municipio.l_id_lugar,
                parroquia_id : parroquia.l_id_lugar,
                estado, municipio, parroquia
            }
        })

    }


    handleGuardar = () => {
        console.log(`----> localhost:4000/modificar/empleado`)
        return axios.post('http://127.0.0.1:4000/modificar/empleado', 
            {
                ...this.state.nuevo_empleado,
                lugar_id : this.state.lugar.parroquia_id,
                e_genero : this.state.nuevo_empleado.e_genero === 1 || this.state.nuevo_empleado.e_genero === "m"
                    ? "m" : "f"
            }
        )
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/modificar/empleado`)
            }
            return res
        })
        .catch( (err) => err)
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

    handleChange = (target) => {
        target = target.target || target
        console.log(`nuevo_empleado.${target.name} = ${target.value}`)
        this.setState({
            nuevo_empleado :{
                ...this.state.nuevo_empleado,
                [target.name] : target.value
            }
        })
      }

    handleChangeLugar = (target) => {
        console.log(`lugar.${target.name} = ${target.value}`)
        this.setState({
            lugar : {
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
                            value={this.state.nuevo_empleado.e_nombre}
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoNombre2"
                            label="Segundo Nombre"
                            name="e_segundo_nombre"
                            value={this.state.nuevo_empleado.e_segundo_nombre}
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoApellido" 
                            label="Apellido" 
                            name="e_apellido"
                            value={this.state.nuevo_empleado.e_apellido}
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoApellido2" 
                            label="Segundo Apellido"
                            name="e_segundo_apellido"
                            value={this.state.nuevo_empleado.e_segundo_apellido}
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoCedula" 
                            label="Número de cédula" 
                            name="e_cedula"
                            value={this.state.nuevo_empleado.e_cedula}
                            onChange={this.handleChange}
                        />
                        <InputText 
                            id="CrearEmpleadoTelefono" 
                            label="Número de teléfono" 
                            name="e_telefono"
                            value={this.state.nuevo_empleado.e_telefono}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="WideContainer">
                    <div className="FormContainer">
                        {this.state.cargos &&
                        <Dropdown id="CrearEmpleadoCargo"
                                  name="cargo_id"
                                  defaultText={this.state.nuevo_empleado.cargo_inicial}
                                  defaultID={this.state.nuevo_empleado.cargo_id}
                                  retrieveData={this.handleChange}
                                  placeholder="Cargo ..."
                                  options={
                                      cleanerCargo.limpiarListaDropdown(
                                          this.state.cargos
                                        )
                                    }
                        />
                        }
                        {this.state.nuevo_empleado.e_genero &&
                        <Dropdown id="CrearEmpleadoGenero"
                                  name="e_genero"
                                  defaultText={this.state.nuevo_empleado.e_genero === "m" || this.state.nuevo_empleado.e_genero === 1
                                     ? "Hombre" : "Mujer"}
                                  defaultID={this.state.nuevo_empleado.e_genero === "m" || this.state.nuevo_empleado.e_genero === 1
                                     ? 1 : 2}
                                  retrieveData={this.handleChange}
                                  placeholder="Género.."
                                  options={[
                                      {text:"Hombre",id:1},
                                      {text:"Mujer", id:2}]}
                        />}
                        <div className="RowContainer center" style={{width: "80%"}}>
                            <div className="LabelContainer">
                                Fecha de nacimiento : &nbsp;
                            </div>
                            <InputDate 
                                name="e_fecha_nacimiento"
                                value={this.state.nuevo_empleado.e_fecha_nacimiento}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="RowContainer center" style={{width: "80%"}}>
                            <div className="LabelContainer">
                                Fecha de ingreso :
                            </div>
                            <InputDate
                                name="e_fecha_ingreso"
                                value={this.state.nuevo_empleado.e_fecha_ingreso}
                                onChange={this.handleChange}
                                style={{float: "right"}}
                            />
                        </div>
                        {this.state.lugar.estado &&
                        <Dropdown id="CrearEmpleadoLugarEstado"
                                  name="estado_id"
                                  defaultText={this.state.lugar.estado.l_nombre}
                                  defaultID={this.state.lugar.estado_id}
                                  retrieveData={this.handleChangeLugar}
                                  placeholder="Estado donde vive..."
                                  options={
                                      cleanerLugar.limpiarListaDropdown(
                                          this.state.lugares.filter( l => l.l_tipo === "estado")
                                        )
                                    }
                        />
                        }
                        {this.state.lugar.municipio &&
                        <Dropdown id="CrearEmpleadoLugarMunicipio"
                                  name="municipio_id"
                                  defaultText={this.state.lugar.municipio.l_nombre}
                                  defaultID={this.state.lugar.municipio_id}
                                  retrieveData={this.handleChangeLugar}
                                  placeholder="Municipio donde vive..."
                                  options={
                                    cleanerLugar.limpiarListaDropdown(
                                        this.state.lugares.filter( l => l.lugar_id === this.state.lugar.estado_id)
                                      )
                                  }
                        />
                        }
                        {this.state.lugar.parroquia &&
                        <Dropdown id="CrearEmpleadoLugarParroquia"
                                  name="parroquia_id"
                                  defaultText={this.state.lugar.parroquia.l_nombre}
                                  defaultID={this.state.lugar.parroquia_id}
                                  retrieveData={this.handleChangeLugar}
                                  placeholder="Parroquia donde vive..."
                                  options={
                                    cleanerLugar.limpiarListaDropdown(
                                        this.state.lugares.filter( l => l.lugar_id === this.state.lugar.municipio_id)
                                      )
                                  }
                        />
                        }
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
                storeData={this.handleGuardar}
                success={this.goEmpleado}
                decline={this.goEmpleado}
            />

            {this.state.goEmpleado && <Redirect push to="/empleado" /> }
        </div>
    )
}