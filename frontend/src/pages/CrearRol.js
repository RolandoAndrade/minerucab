import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {InputText} from "../components/InputText";
import {GuardarCancelar} from "../components/GuardarCancelar";

export class CrearRol extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            r_nombre: "",
            permisos: {
                crear_mineral: false,
                consultar_mineral: false,
                modificar_mineral: false,
                eliminar_mineral: false,
                crear_compania:false,
                consultar_compania: false,
                modificar_compania: false,
                eliminar_compania: false,
                crear_empleado: false,
                consultar_empleado: false,
                modificar_empleado: false,
                eliminar_empleado: false,
                crear_producto: false,
                consultar_producto: false,
                modificar_producto: false,
                eliminar_producto: false,
                crear_pedido: false,
                consultar_pedido: false,
                modificar_pedido: false,
                eliminar_pedido: false,
                crear_cliente: false,
                consultar_cliente: false,
                modificar_cliente: false,
                eliminar_cliente: false,
                crear_proyecto: false,
                consultar_proyecto: false,
                modificar_proyecto: false,
                eliminar_proyecto: false,
                crear_yacimiento: false,
                consultar_yacimiento: false,
                modificar_yacimiento: false,
                eliminar_yacimiento: false,
                crear_solicitud: false,
                consultar_solicitud: false,
                modificar_solicitud: false,
                eliminar_solicitud: false,
                crear_inventario: false,
                consultar_inventario: false,
                modificar_inventario: false,
                eliminar_inventario: false,


                crear_aliado: false,
                consultar_aliado: false,
                modificar_aliado:false,
                eliminar_aliado:false,

                crear_configuracion_de_yacimiento: false,
                consultar_configuracion_de_yacimiento: false,
                modificar_configuracion_de_yacimiento: false,
                eliminar_configuracion_de_yacimiento: false,

                crear_rol: false,
                consultar_rol: false,
                modificar_rol: false,
                eliminar_rol: false,

                eliminar_horario: false,
                crear_horario: false,
                consultar_horario: false,
                modificar_horario: false
            },
            goEmpleado: false
        }
    }

    goEmpleado = () =>
    {
        this.setState(
            {
                goEmpleado: true
            }
        )
    }

    componentDidMount = () => {

    }

    handleGuardar = () => {
        console.log(`----> localhost:4000/insertar/rol`)
        return axios.post('http://127.0.0.1:4000/insertar/rol', this.state)
    }

    handleChange = (target) => {
        target=target.target||target;
        this.setState({
                [target.name] : target.value
        })
    };

    handleBool = (target) =>{
        target=target.target||target;
        this.setState({
            permisos: {
                ...this.state.permisos,
                [target.name]: target.checked
            }
        })
        console.log(this.state)
    }


    render = () => (
        <div>
            <MenuDashBoard title="Crear Rol"/>
            <div className="RowContainer" style={{margin: "5% 0"}}>
                <InputText
                        id="CrearRol"
                        label="Nombre"
                        name="r_nombre"
                        onChange={this.handleChange}
                        value={this.state.r_nombre}/>
            </div>
            <div className="RowContainer" style={{margin: "5% 0"}}>
                <div className="WideContainer.Vertical" style={{width: "30%", textAlign: "center", justifyContent:"center"}}>
                    <div className="FormContainer.Edit">
                        Crear mineral
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Crear compañía
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Crear empleado
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Crear pedido
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Crear cliente
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Crear proyecto
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Crear yacimiento
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Crear solicitud
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Consultar mineral
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Consultar compañía
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Consultar empleado
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Consultar pedido
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Consultar cliente
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Consultar proyecto
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Consultar yacimiento
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Consultar solicitud
                    </div>
                     <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Modificar mineral
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Modificar compañía
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Modificar empleado
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Modificar pedido
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Modificar cliente
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Modificar proyecto
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Modificar yacimiento
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Modificar solicitud
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Eliminar mineral
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Eliminar compañía
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Eliminar empleado
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Eliminar pedido
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Eliminar cliente
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Eliminar proyecto
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Eliminar yacimiento
                    </div>
                    <div className="FormContainer.Edit.More" style={{margin: "10px"}}>
                        Eliminar solicitud
                    </div>
                </div>
                                <div className="WideContainer.Vertical" style={{width: "30%"}}>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="crear_mineral"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.crear_mineral}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="crear_compania"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.crear_compania}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="crear_empleado"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.crear_empleado}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="crear_pedido"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.crear_pedido}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="crear_cliente"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.crear_cliente}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="crear_proyecto"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.crear_proyecto}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="crear_yacimiento"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.crear_yacimiento}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="crear_solicitud"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.crear_solicitud}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="consultar_mineral"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.consultar_mineral}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="consultar_compania"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.consultar_compania}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="consultar_empleado"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.consultar_empleado}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="consultar_pedido"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.consultar_pedido}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="consultar_cliente"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.consultar_cliente}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="consultar_proyecto"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.consultar_proyecto}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="consultar_yacimiento"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.consultar_yacimiento}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="consultar_solicitud"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.consultar_solicitud}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="modificar_mineral"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.modificar_mineral}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="modificar_compania"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.modificar_compania}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="modificar_empleado"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.modificar_empleado}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="modificar_pedido"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.modificar_pedido}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="modificar_cliente"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.modificar_cliente}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="modificar_proyecto"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.modificar_proyecto}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="modificar_yacimiento"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.modificar_yacimiento}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="modificar_solicitud"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.modificar_solicitud}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="eliminar_mineral"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.eliminar_mineral}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="eliminar_compania"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.eliminar_compania}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="eliminar_empleado"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.eliminar_empleado}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="eliminar_pedido"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.eliminar_pedido}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="eliminar_cliente"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.eliminar_cliente}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="eliminar_proyecto"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.eliminar_proyecto}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="eliminar_yacimiento"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.eliminar_yacimiento}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                    <div className="FormContainer.Edit">
                        <form action="">
                            <label className="form-switch">
                                <input
                                    type="checkbox"
                                    name="eliminar_solicitud"
                                    onChange={this.handleBool}
                                    checked={this.state.permisos.eliminar_solicitud}
                                />
                                <i></i>
                            </label>
                        </form>
                    </div>
                </div>
                <div className="WideContainer" style={{width: "40%"}}>
                    <div className="FormContainer.Edit">
                        <img src="resources/img/Rol.png" alt="" width="80%" style={{margin: "0 auto"}}/>
                    </div>
                </div>
            </div>


            <GuardarCancelar
                position="right"
                storeData={this.handleGuardar}
                success={this.goEmpleado}
                decline={this.goEmpleado}
            />

            {this.state.goEmpleado && <Redirect push to="../../rol" /> }
        </div>
    )
}