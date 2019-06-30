import React from 'react';
import {DashBoardColumn} from "./DashBoardColumn";
import {Redirect} from "react-router-dom";

export class DashBoardSimple extends React.Component {



    render = () => (
        <div className="DashBoardSimple" id="DashBoardSimple">
            <div className="DashBoardItems">
                <DashBoardColumn main={this.props.main} image="resources/img/Dashboard_1.png" color="y"
                                 title="Administración"
                                 sections={[
                                     {text: "Usuarios", url: "usuarios"},
                                     {text: "Roles", url: "rol"},
                                     {text: "Minerales", url: "mineral"},
                                     {text: "Inventario", url: "inventario"},
                                     {text: "Plantas", url: "planta"},
                                     {text: "Procesos", url: "proceso"},
                                     {text: "Productos", url: "producto"},
                                     {text: "Horarios", url: "horario"},
                                     {text: "Maquinaria", url: "maquinaria"}]}/>
                <DashBoardColumn main={this.props.main} image="resources/img/Dashboard_2.png" color="b"
                                 title="Ventas" sections={
                                     [
                                         {text: "Aliados", url: "aliado"},
                                         {text: "Clientes", url: "cliente"},
                                         {text: "Pedidos", url: "pedido"},
                                         {text: "Solicitudes", url: "solicitud"}]}/>
                <DashBoardColumn main={this.props.main} image="resources/img/Dashboard_3.png" color="g"
                                 title="Proyectos" sections={
                                     [
                                         {text: "Proyectos", url: "proyecto"},
                                         {text: "Configuración explotaciones", url: "yacimiento-configuracion"},
                                         {text: "Yacimientos", url: "yacimiento"},
                                         {text: "Empleados", url: "empleado"}]}/>
            </div>
        </div>
    )
}