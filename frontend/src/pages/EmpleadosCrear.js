import React from 'react';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {Dropdown} from "../components/Dropdown";
import {InputText} from "../components/InputText";
import {SectionTitle} from "../components/Header/SectionTitle";
import {InputDate} from "../components/InputDate";
import {Button} from "react-bootstrap";
import {GuardarCancelar} from "../components/GuardarCancelar";

export class EmpleadosCrear extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            users: [1]
        }
    }

    addUser()
    {
        let users=this.state.users;
        users.push(1);
        this.setState(
            {
                users: users
            }
        )
    }

    removeUser(i)
    {
        let users=this.state.users;
        users.splice(i,1);
        this.setState(
            {
                users: users
            }
        )
    }

    render = () => (
        <div>
            <MenuDashBoard title="Crear empleado"/>
            <div className="RowContainer">
                <div className="WideContainer">
                    <div className="FormContainer">
                        <InputText id="CrearEmpleadoNombre" label="Nombre"/>
                        <InputText id="CrearEmpleadoApellido" label="Apellido"/>
                        <InputText id="CrearEmpleadoCedula" label="Número de cédula"/>
                        <Dropdown id="CrearEmpleadoCargo" placeholder="Cargo..." options={["Opción 1","Opción 2","Opción 3","Opción 4","Opción 5"]}/>
                    </div>
                </div>
                <div className="WideContainer">
                    <div className="FormContainer">
                        <div className="RowContainer center" style={{width: "80%"}}>
                            <div className="LabelContainer">
                                Fecha de nacimiento:
                            </div>
                            <InputDate/>
                        </div>
                        <Dropdown id="CrearEmpleadoEstado" placeholder="Estado actual..." options={["Opción 1","Opción 2","Opción 3","Opción 4","Opción 5"]}/>
                        <Dropdown id="CrearEmpleadoMunicipio" placeholder="Municipio actual..." options={["Opción 1","Opción 2","Opción 3","Opción 4","Opción 5"]}/>
                        <Dropdown id="CrearEmpleadoParroquia" placeholder="Parroquia actual..." options={["Opción 1","Opción 2","Opción 3","Opción 4","Opción 5"]}/>
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
                    Usuarios asociados al empleado
                </div>
                {
                    this.state.users.map((e,i)=>
                    {
                        return<div className="RowContainer" key={i}>
                            <div className="WideContainer" style={{justifyContent: "right", width: "30%"}}>
                                <i className="zmdi zmdi-close-circle-o LabelIcon" onClick={()=>this.removeUser(i)}></i>
                            </div>
                            <div className="WideContainer">
                                <InputText id={"CrearEmpleadoUsuarioCorreo"+i} label="Correo electrónico"/>
                            </div>
                            <div className="WideContainer">
                                <InputText id={"CrearEmpleadoUsuarioContra"+i} label="Contraseña inicial"/>
                            </div>
                            <div className="WideContainer">
                                <Dropdown id={"CrearEmpleadoUsuarioRol"+i} placeholder="Rol..." options={["Opción 1","Opción 2","Opción 3","Opción 4","Opción 5"]}/>
                            </div>
                        </div>
                    },this)
                }
            </div>

            <div className="Container-90p">
                <div className="ButtonAddUser" onClick={()=>this.addUser()}>
                    Agregar usuario
                </div>
            </div>

            <GuardarCancelar position="right"/>
        </div>
    )
}