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
            minerales: [{mineral_id: -1, cantidad: 0, precio: 0, presentacion_id: -1}]
        }
    }
    addMineral=()=>
    {
        let newMinerales = this.state.minerales;
        newMinerales.push(
            {
                mineral_id: -1,
                cantidad: 0,
                precio: 0,
                presentacion_id: -1}
        );

        this.setState(
            {
                minerales: newMinerales,
            }
        );
        console.log(this.state);
    };

    removeMineral = (id) =>
    {
        const newMinerales= this.state.minerales.splice(id,1);
        this.setState(
            {
                users: newMinerales
            }
        )
    }
    handleChange = (target) => {
        target=target.target||target;
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
                                    <i className="zmdi zmdi-close-circle-o LabelIcon" onClick={()=>this.removeMineral(i)}></i>
                                </div>
                                <div className="WideContainer">
                                    <Dropdown id={"CrearSolicitudMineral"+i}
                                              name={`user_${u.u_id_usuario}`}
                                              placeholder="Mineral..."
                                              onChange={this.handleChange}
                                              options={[
                                                  {text:"Opción 1",id:1},
                                                  {text:"Opción 2",id:2},
                                                  {text:"Opción 3",id:3},
                                                  {text:"Opción 4",id:4},
                                                  {text:"Opción 5",id:5}]}
                                    />
                                </div>
                                <div className="WideContainer">
                                    <InputText
                                        styles={{width:"95%"}}
                                        id={"CrearSolicitudCantidad"+i}
                                        label="Cantidad"
                                        type="number"
                                        onChange={this.handleChange}
                                        value={""+this.state.minerales[i].cantidad}
                                    />
                                </div>
                                <div className="WideContainer" style={{width: "50%"}}>
                                    <div className="LabelSimple">Toneladas</div>
                                </div>
                                <div className="WideContainer">
                                    <InputText styles={{width:"95%"}}
                                               id={"CrearSolicitudPrecio"+i}
                                               label="Precio"
                                               onChange={this.handleChange}
                                               type="number"
                                               value={""+this.state.minerales[i].cantidad}
                                    />

                                </div>
                                <div className="WideContainer" style={{width: "20%"}}>
                                    <div className="LabelSimple">Bs.S</div>
                                </div>
                                <div className="WideContainer">
                                    <Dropdown id={"CrearSolicitudPresentación"+i}
                                              name={`user_${u.u_id_usuario}`}
                                              placeholder="Presentación..."
                                              onChange={this.handleChange}
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
                    },this)
                }
                <div className="ButtonAddUser" onClick={this.addMineral} style={{marginLeft: "13%", width: "80%"}}>
                    Agregar mineral
                </div>
            </div>

        </div>
    )
}