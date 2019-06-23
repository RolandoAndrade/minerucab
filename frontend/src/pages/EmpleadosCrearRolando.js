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
        let name = document.getElementById("InputTextCrearEmpleadoNombre");
        let surname = document.getElementById("InputTextCrearEmpleadoApellido");
        let ci = document.getElementById("InputTextCrearEmpleadoCedula");
        let position = document.getElementById("DropdownSearchCrearEmpleadoCargo");
        if(name.value.length===0)
        {
            Swal.fire({title: "Error", text: "Hace falta establecer un nombre", type:"error"});
            name.classList.add("error");
            return false;
        }
        else if(surname.value.length===0)
        {
            Swal.fire({title: "Error", text: "Hace falta establecer un apellido", type:"error"});
            surname.classList.add("error");
            return false;
        }
        else if(ci.value.length===0)
        {
            Swal.fire({title: "Error", text: "Hace falta establecer una cédula", type:"error"});
            ci.classList.add("error");
            return false;
        }
        return true;
    }

    saveData()
    {
        // No hace falta aqui, ya esta en el componente
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Se guardará los datos del empleado con la información dada',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'No, editar',
            confirmButtonColor: "#1CA1DC",
            cancelButtonColor: "#dc3832"
        }).then((result) => {
            if (result.value) {
                if(this.storeData())
                    Swal.fire(
                        'Guardado',
                        'Los datos fueron guardados satisfactoriamente',
                        'success'
                    )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Se ha detenido el proceso de guardado',
                    'error'
                )
            }
        })
    }

    cancelData()
    {
        // No hace falta aqui, ya esta en el componente
        Swal.fire({
            title: '¿Está seguro?',
            text: 'Todos los datos introducidos se perderán',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'No, editar',
            confirmButtonColor: "#1CA1DC",
            cancelButtonColor: "#dc3832"
        }).then((result) => {
            if (result.value)
            {
                console.log("volver");
            }
        })
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
                                <InputText styles={{width:"95%"}} id={"CrearEmpleadoUsuarioCorreo"+i} label="Correo electrónico"/>
                            </div>
                            <div className="WideContainer">
                                <InputText styles={{width:"95%"}} id={"CrearEmpleadoUsuarioContra"+i} label="Contraseña inicial"/>
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