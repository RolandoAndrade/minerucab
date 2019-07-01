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

export class Facturita extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            goBack:false
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
                            ax[q[i].p_id_pedido].subtotal=(Math.floor((parseFloat(ax[q[i].p_id_pedido].subtotal)+parseFloat(q[i].p_precio_unitario*q[i].p_cantidad))*100)/100).toFixed(2);
                            ax[q[i].p_id_pedido].total+=parseFloat(q[i].p_precio_unitario*q[i].p_cantidad)*IVA;
                        }
                        else
                        {
                            ax[q[i].p_id_pedido]={
                                p_id_pedido: q[i].p_id_pedido, 
                                c_nombre: q[i].c_nombre, 
                                p_fecha_solicitud: q[i].p_fecha_solicitud, 
                                e_nombre: q[i].e_nombre, 
                                subtotal: (Math.floor(q[i].p_precio_unitario*q[i].p_cantidad*100)/100).toFixed(2),
                                total: (Math.floor(q[i].p_precio_unitario*q[i].p_cantidad*100)/100).toFixed(2)*IVA,
                                productos:[{
                                    cantidad: q[i].p_cantidad, 
                                    nombre: q[i].p_nombre, 
                                    precio: (Math.floor(q[i].p_precio_unitario*100)/100).toFixed(2)}]}
                        }
                    }

                    this.setState(
                    {
                        ...ax[id],
                        unidad_id: UNIDAD_ID
                    })
                }
                console.log(this.state);
            })

            axios.post('http://127.0.0.1:4000/consultar/pedi_tipo',
            {
                "p_id_pedido" : id,
            }).then((res) => {
                if( res.status === 200) {
                    this.setState(
                    {
                        ...res.data.rows[0]
                    })
                    axios.post('http://127.0.0.1:4000/consultar/tipo',this.state).then((res) => {
                        if( res.status === 200) {
                            this.setState(
                            {
                                ...res.data.rows[0]
                            })
                        }
                        console.log(this.state);
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
        console.log(this.state)
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
            <MenuDashBoard title="Factura"/>
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
            <div className="TotalAmountContainer">
                    <div className="AmountSquare">
                        <div className="Amount">
                            Subtotal: {this.state.subtotal} Bs.S
                        </div>
                        <div className="Amount">
                            Total: {this.state.total} Bs.S (16% IVA)
                        </div>
                    </div>
                </div>
                <div className="Container-80p" style={{marginTop: "5%"}}>
                    <div className="LabelContainer">
                        Datos del pago
                    </div>
                    <div className="CrearElemento">
                        <div className="firstColumn">
                            <div className="mc-atributo">Banco: </div>
                        </div>
                        <div className="secondColumn">
                            <div className="mc-atributo bitContainer grey">
                            {this.state.credito_id?this.state.c_banco:""}
                            {this.state.debito_id?this.state.d_banco:""}
                            {this.state.cheque_id?this.state.c_banco:""}
                            {this.state.transferencia_id?this.state.t_banco:""}
                            </div>
                        </div>
                        <div className="firstColumn">
                            {this.state.credito_id?<div className="mc-atributo">Número de tarjeta de crédito: </div>:""}
                            {this.state.debito_id?<div className="mc-atributo">Número de tarjeta de débito: </div>:""}
                            {this.state.cheque_id?<div className="mc-atributo">Número de cheque: </div>:""}
                            {this.state.transferencia_id?<div className="mc-atributo">Número de transferencia: </div>:""}
                            
                        </div>
                        <div className="secondColumn">
                            <div className="mc-atributo bitContainer grey">
                                {this.state.credito_id?this.state.c_numero_tarjeta:""}
                                {this.state.debito_id?this.state.c_numero_tarjeta:""}
                                {this.state.cheque_id?this.state.c_numero_cheque:""}
                                {this.state.transferencia_id?this.state.c_numero_transferencia:""}
                            </div>
                        </div>
                        {this.state.credito_id?<div className="firstColumn"><div className="mc-atributo">Tipo de tarjeta: </div></div>:""}
                        {this.state.credito_id?<div className="secondColumn"><div className="mc-atributo bitContainer grey">{this.state.c_tipo}</div></div>:""}
                        {this.state.credito_id?<div className="firstColumn"><div className="mc-atributo">Fecha de vencimiento: </div></div>:""}
                        {this.state.credito_id?<div className="secondColumn"><div className="mc-atributo bitContainer grey">{this.state.c_fecha_vencimiento&&this.state.c_fecha_vencimiento.substring(0,10)}</div></div>:""}
                        {this.state.transferencia_id?<div className="firstColumn"><div className="mc-atributo">Número de cuenta: </div></div>:""}
                        {this.state.transferencia_id?<div className="secondColumn"><div className="mc-atributo bitContainer grey">{this.t_numero_cuenta}</div></div>:""}

                        <div className="firstColumn">
                            <div className="mc-atributo">Fecha de pago: </div>
                        </div>
                        <div className="secondColumn">
                            <div className="mc-atributo bitContainer blue">{this.state.p_fecha_pago&&this.state.p_fecha_pago.substring(0,10)} </div>
                        </div>


                    </div>



                </div>
                <div className="GuardarCancelar">
                    <div className="GC ButtonPrimary" onClick={()=>this.setState({goBack: true})}>
                        Aceptar
                    </div>
                </div>
            {this.state.goBack && <Redirect push to="../../pedido" /> }
            {this.state.loading && <Loader/>}
        </div>
    )
}