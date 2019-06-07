import React from 'react';
import {HeaderLogin} from "./HeaderLogin";
import {DashBoardColumn} from "./DashBoardColumn";

export class MainDashBoard extends React.Component {

    constructor(props){
        super(props);

    }


    render = () => (
        <div className="MainDashBoard">
            <HeaderLogin hideMenuButton={true}/>
            <div className="DashBoardItems">
                <DashBoardColumn main={true} image="resources/img/Dashboard_1.png" color="y"
                                 title="Administración" sections={["Usuarios", "Roles", "Minerales","Yacimientos", "Depósitos", "Plantas","Procesos", "Productos", "Maquinaria"]}/>
                <DashBoardColumn main={true} image="resources/img/Dashboard_2.png" color="b"
                                 title="Ventas" sections={["Aliados", "Clientes", "Pedidos","Solicitudes"]}/>
                <DashBoardColumn main={true} image="resources/img/Dashboard_3.png" color="g"
                                 title="Proyectos" sections={["Proyectos", "Explotaciones", "Etapas","Empleados"]}/>
            </div>

        </div>
    )
}