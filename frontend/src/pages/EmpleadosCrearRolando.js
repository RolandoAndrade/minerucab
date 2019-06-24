import React from 'react';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {Dropdown} from "../components/Dropdown";
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";
import {GuardarCancelar} from "../components/GuardarCancelar";
// No hace falta aqui, ya esta en el componente
import Swal from "sweetalert2";

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

    storeData()
    {

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
                        />
                        <InputText id="CrearEmpleadoApellido" label="Apellido"/>
                        <InputText id="CrearEmpleadoCedula" label="Número de cédula"/>
                        <Dropdown id="CrearEmpleadoCargo" placeholder="Cargo..."
                                  options={[
                                      {text:"Opción 1",id:1},{text:"Opción 2",id:2},{text:"Opción 3",id:3},
                                      {text:"Opción 4",id:4},{text:"Opción 5",id:5}]}/>
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
                        <Dropdown id="CrearEmpleadoEstado" placeholder="Estado actual..." options={[
                            {text:"Opción 1",id:1},{text:"Opción 2",id:2},{text:"Opción 3",id:3},
                            {text:"Opción 4",id:4},{text:"Opción 5",id:5}]}/>
                        <Dropdown id="CrearEmpleadoMunicipio" placeholder="Municipio actual..." options={[{text:"Opción 1",id:1},{text:"Opción 2",id:2}
                            ,{text:"Opción 3",id:3},{text:"Opción 4",id:4},{text:"Opción 5",id:5}]}/>
                        <Dropdown id="CrearEmpleadoParroquia" placeholder="Parroquia actual..." options={[{text:"Opción 1",id:1},{text:"Opción 2",id:2}
                            ,{text:"Opción 3",id:3},{text:"Opción 4",id:4},{text:"Opción 5",id:5}]}/>
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
                                <InputText styles={{width:"95%"}} id={"CrearEmpleadoUsuarioCorreo"+i} label="Correo electrónico"/>
                            </div>
                            <div className="WideContainer">
                                <InputText styles={{width:"95%"}} id={"CrearEmpleadoUsuarioContra"+i} label="Contraseña inicial"/>
                            </div>
                            <div className="WideContainer">
                                <Dropdown id={"CrearEmpleadoUsuarioRol"+i} placeholder="Rol..." options={[{text:"Opción 1",id:1},{text:"Opción 2",id:2}
                                    ,{text:"Opción 3",id:3},{text:"Opción 4",id:4},{text:"Opción 5",id:5}]}/>
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
            {/*
                Otra forma de colocarlo
                <GuardarCancelar 
                    position="right" 
                    accept={this.saveData} 
                    decline={this.cancelData}
                />

                no hace falta pasar asi accept={ ()=>this.func() }
                ya this.func es una func - acccep={this.func}
            */}

            <GuardarCancelar position="right" accept={()=>this.saveData()} decline={()=>(this.cancelData())}/>
        </div>
    )
}