import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {InputText} from "../components/InputText";
import {Dropdown} from "../components/Dropdown";
import {MenuDashBoard} from "../components/MenuDashBoard";

export class CrearVenta extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            minerales: [1]
        }
    }

    render = () => (
        <div>
            <MenuDashBoard title="Crear solicitud"/>


            <div className="Container-90p" style={{margin: "5% auto"}}>

                <div className="WideContainer" style={{position: "static", marginBottom: "2%"}}>
                    <div className="RowContainer Container-100p">
                    <Dropdown id="CrearSolicitudCliente"
                              name="cliente_id"
                              retrieveData={this.handleChange}
                              styles={{width: "100%"}}
                              placeholder="Cliente..."
                              options={[
                                  {text:"Opción 1",id:1},
                                  {text:"Opción 2",id:2},
                                  {text:"Opción 3",id:3},
                                  {text:"Opción 4",id:4},
                                  {text:"Opción 5",id:5}]}/>
                    </div>
                    <div className="RowContainer Container-100p"/>
                    <div className="RowContainer Container-100p"/>
                </div>
                <div className="LabelContainer">
                    Minerales a vender
                </div>

                {
                    this.state.minerales.map( (u,i)=>
                    {
                        return(
                            <div className="RowContainer Container-90p" key={i}>
                                <div className="WideContainer" style={{justifyContent: "right", width: "30%"}}>
                                    <i className="zmdi zmdi-close-circle-o LabelIcon"></i>
                                </div>
                                <div className="WideContainer">
                                    <InputText styles={{width:"95%"}}  id={"CrearSolicitudCantidad"+i} label="Cantidad" type="number"/>
                                </div>
                                <div className="WideContainer">
                                    <InputText styles={{width:"95%"}} id={"CrearSolicitudPrecio"+i} label="Precio" type="number"/>
                                </div>
                                <div className="WideContainer">
                                    <Dropdown id={"CrearSolicitudPresentación"+i}
                                              name={`user_${u.u_id_usuario}`}
                                              placeholder="Cargo..."
                                              options={[
                                                  {text:"Opción 1",id:1},
                                                  {text:"Opción 2",id:2},
                                                  {text:"Opción 3",id:3},
                                                  {text:"Opción 4",id:4},
                                                  {text:"Opción 5",id:5}]}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}