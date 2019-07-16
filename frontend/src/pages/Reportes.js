import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerMineral, cleanerRoles} from '../utils/cleaner';
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Reportes extends React.Component {
    constructor(props){
        super(props)

        this.state  = {
           
        }
    }

    handleChange = (target) =>
    {
        target = target.target || target;
        this.setState({
            [target.name]: target.value
        })
    };

    componentDidMount = () => {
        axios.post('http://localhost:8081/jasperserver/login', {
    
                    j_username: "jasperadmin",
                    j_password: "jasperadmin"
                })
    }

    ejecutarReporte = (id) => {
        switch (id) {
            case 1 :
                window.open('http://localhost:8081/jasperserver/rest_v2/reports/Reportes/aliados_mas_compras.pdf')
            break;
            case 2 :
                window.open(`http://localhost:8081/jasperserver/rest_v2/reports/Reportes/fases_retrasos.pdf?fecha_inicio=${this.state.r2_fi}&fecha_fin=${this.state.r2_ff}`)
            break;
            case 3 :
                window.open(`http://localhost:8081/jasperserver/rest_v2/reports/Reportes/proyecto_mas_costoso.pdf`)
            break;
            case 4 :
                window.open(`http://localhost:8081/jasperserver/rest_v2/reports/Reportes/top10_clientes.pdf`)
            break;
            case 5 :
                window.open(`http://localhost:8081/jasperserver/rest_v2/reports/Reportes/lista_fases_etapa.pdf?fecha_inicio=${this.state.r5_fi}&fecha_fin=${this.state.r5_ff}`)
            break;
            case 6 :
                window.open(`http://localhost:8081/jasperserver/rest_v2/reports/Reportes/mas_dos_proyectos_mes.pdf?fecha_inicio=${this.state.r6_fi}&fecha_fin=${this.state.r6_ff}`)
            break;
            case 7 :
                window.open(`http://localhost:8081/jasperserver/rest_v2/reports/Reportes/empleados_disponibles.pdf?fecha_inicio=${this.state.r7_fi}&fecha_fin=${this.state.r7_ff}`)
            break;
            case 8 :
                window.open(`http://localhost:8081/jasperserver/rest_v2/reports/Reportes/presentacion_por_cliente.pdf`)
            break;
            case 9 :
                window.open(`http://localhost:8081/jasperserver/rest_v2/reports/Reportes/maquinaria_mas_usada.pdf?${this.state.r9_fi}&fecha_fin=${this.state.r9_ff}`)
            break;
            case 10 :
                window.open(`http://localhost:8081/jasperserver/rest_v2/reports/Reportes/tipo_pago_preferido.pdf?${this.state.r10_fi}&fecha_fin=${this.state.r10_ff}`)
            break;
            


        }
    }

   

    render = () => (
        <div>
            <MenuDashBoard title={"Reportes"}/>
            <div >
                
                <div className="RowContainer">
                    <div>1.- Empresa aliada a la que se le realizaron más compras.</div>
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(1)}>
                        GO
                    </Button>
                </div>
                <div className="RowContainer">
                    <div>2.- Fases que presentan retrasos (fecha final mayor a la estimada) en un período de tiempo. </div>
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r2_fi`}
                        name="r2_fi"
                    />
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r2_ff`}
                        name="r2_ff"
                    />
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(2)}>
                        GO
                    </Button>
                </div>
                <div className="RowContainer">
                    <div>3.- Proyecto mas costoso por mes.</div>
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(3)}>
                        GO
                    </Button>
                </div>
               
                <div className="RowContainer">
                    <div>4.- Top 10 de mejores clientes.</div>
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(4)}>
                        GO
                    </Button>
                </div>
                <div className="RowContainer">
                    <div>5.- Listado de etapas y fases de los proyectos por período de tiempo.</div>
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r5_fi`}
                        name="r5_fi"
                    />
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r5_ff`}
                        name="r5_ff"
                    />
                    <Button
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(5)}>
                        GO
                    </Button>
                </div>
                <div className="RowContainer">
                    <div>6.- Listado de empleados que han participado mas de 2 veces en proyectos en el mismo mes, indicando el total de participación, el proyecto y el mes. Se debe realizar la consulta por período de tiempo.</div>
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r6_fi`}
                        name="r6_fi"
                    />
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r6_ff`}
                        name="r6_ff"
                    />
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(6)}>
                        GO
                    </Button>
                </div>
                <div className="RowContainer">
                    <div>7.- Listado de empleados disponibles para proyectos por período de tiempo.</div>
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r7_fi`}
                        name="r7_fi"
                    />
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r7_ff`}
                        name="r7_ff"
                    />
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(7)}>
                        GO
                    </Button>
                </div>
                <div className="RowContainer">
                    <div>8.- Presentación del mineral mas solicitada por los clientes por año.</div>
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(8)}>
                        GO
                    </Button>
                </div>
                <div className="RowContainer">
                    <div>8.- Presentación del mineral mas solicitada por los clientes por año.</div>
                    <InputDate
                        onChange={this.handleChange} 
                        id={`NombreConfiguracion4`}
                        name="y_nombre"
                    />
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(8)}>
                        GO
                    </Button>
                </div>
                <div className="RowContainer">
                    <div>9.- Maquinaria mas utilizada en los proyectos por período de tiempo.</div>
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r9_fi`}
                        name="r9_fi"
                    />
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r9_ff`}
                        name="r9_ff"
                    />
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(9)}>
                        GO
                    </Button>
                </div>
                <div className="RowContainer">
                    <div>10.- Tipo de pago mas utilizado en las compras de nuestros clientes por período de tiempo.</div>
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r10_fi`}
                        name="r10_fi"
                    />
                    <InputDate
                        onChange={this.handleChange} 
                        id={`r10_ff`}
                        name="r10_ff"
                    />
                    <Button 
                        variant="danger" 
                        className="mc-boton" 
                        onClick={() => this.ejecutarReporte(10)}>
                        GO
                    </Button>
                </div>
                
            </div>
        </div>
    )
}