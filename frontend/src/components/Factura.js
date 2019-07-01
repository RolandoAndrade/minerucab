import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {InputText} from "../components/InputText";
import {Dropdown} from "../components/Dropdown";
import {MenuDashBoard} from "../components/MenuDashBoard";
import {GuardarCancelar} from "../components/GuardarCancelar";
import {cleanerCliente, cleanerLugar, cleanerMineral, cleanerProducto} from "../utils/cleaner";
import {Loader} from "../components/Loader";

const IVA = 1.16;
const UNIDAD_ID=7;

export class Factura extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            
        }

    }

    componentDidMount = () => {
        const id = parseInt(this.props.location.pathname.split("/")[2]);
        console.log(`----> localhost:4000/consultar/pedido/${id}`)
        axios.post('http://127.0.0.1:4000/consultar/pedido',
            {
                "p_id_pedido" : id,
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultar/pedido`)
                    console.log(res);
                    let q = res.data.rows;
                    let ax={};
                    for(let i=0;i<q.length;i++)
                    {
                        if(ax[q[i].p_id_pedido])
                        {
                            ax[q[i].p_id_pedido].productos.push({cantidad: q[i].p_cantidad, nombre: q[i].p_nombre, precio: (Math.floor(q[i].p_precio_unitario*100)/100).toFixed(2)})
                            ax[q[i].p_id_pedido].total=(Math.floor((parseFloat(ax[q[i].p_id_pedido].total)+parseFloat(q[i].total))*100)/100).toFixed(2);
                        }
                        else
                        {
                            ax[q[i].p_id_pedido]={
                                p_id_pedido: q[i].p_id_pedido, 
                                c_nombre: q[i].c_nombre, 
                                p_fecha_solicitud: q[i].p_fecha_solicitud, 
                                e_nombre: q[i].e_nombre, 
                                total: (Math.floor(q[i].total*100)/100).toFixed(2),
                                productos:[{
                                    cantidad: q[i].p_cantidad, 
                                    nombre: q[i].p_nombre, 
                                    precio: (Math.floor(q[i].p_precio_unitario*100)/100).toFixed(2)}]}
                        }
                    }

                    this.setState(
                    {
                        ...ax[id]
                    })
                }
                console.log(this.state);
            })

        
    }

    handleGuardar = () =>
    {

        

    };

    goSolicitud = () =>
    {
       
    };


   

    handleChange = (target) =>
    {
        target = target.target || target;
        this.setState({
            [target.name]: target.value
        })
    };

   

    getTotal()
    {
        let total=0;
        for(let i=0;i<this.state.minerales.length;i++)
        {
            total+=this.state.minerales[i].precio*this.state.minerales[i].cantidad;
        }
        this.setState({
            subtotal: (Math.floor(total*100)/100).toFixed(2),
            total:(Math.floor(total*IVA*100)/100).toFixed(2)
        });
    }

    render = () => (
        <div>
            <div className="CrearElemento">
                <div className="firstColumn">
                    <div className="mc-atributo">Número de orden: </div>
                </div>
                <div className="secondColumn">
                    <div className="mc-atributo bitContainer blue">{this.state.p_id_pedido&&this.state.p_id_pedido.toString(10).padStart(4, '0')} </div>
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">Fecha de solicitud: </div>
                </div>
                <div className="secondColumn">
                    <div className="mc-atributo bitContainer yellow">{this.state.p_fecha_solicitud&&this.state.p_fecha_solicitud.substring(0,10)} </div>
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">Nombre del cliente: </div>
                </div>
                <div className="secondColumn">
                    <div className="mc-atributo bitContainer green">{this.state.c_nombre} </div>
                </div>
            </div>
            <div className="Container-80p">
                <div className="LabelContainer">
                    Datos de la venta
                </div>
                <div className="RowContainer Container-90p"
                                 style={
                                     {
                                         position: "relative"
                                     }}>
                        <div className="WideContainer" style={{margin: "5px"}}>
                            <div className="mc-atributo bitContainer blue"> Cantidad </div>
                        </div>
                        <div className="WideContainer" style={{margin: "5px"}}>
                            <div className="mc-atributo bitContainer blue"> Producto </div>
                        </div>
                        <div className="WideContainer" style={{margin: "5px"}}>
                            <div className="mc-atributo bitContainer blue"> Precio unitario </div>
                        </div>
                    </div>
                {
                
                    this.state.productos&&this.state.productos.map( (u,i)=>
                    {
                        return(
                            <div className="RowContainer Container-90p" key={i}
                                 style={
                                     {
                                         position: "relative"
                                     }}>
                                <div className="WideContainer" style={{margin: "5px"}}>
                                    <div className="mc-atributo bitContainer grey">{u.cantidad} </div>
                                </div>
                                <div className="WideContainer" style={{margin: "5px"}}>
                                    <div className="mc-atributo bitContainer grey">{u.nombre} </div>
                                </div>
                                <div className="WideContainer" style={{margin: "5px"}}>
                                    <div className="mc-atributo bitContainer grey">{u.precio} </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {this.state.loading && <Loader/>}
        </div>
    )
}