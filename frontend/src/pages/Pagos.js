import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {InputText} from "../components/InputText";
import {Dropdown} from "../components/Dropdown";
import {MenuDashBoard} from "../components/MenuDashBoard";
import {GuardarCancelar} from "../components/GuardarCancelar";
import {cleanerCliente, cleanerLugar, cleanerMineral, cleanerProducto} from "../utils/cleaner";
import {Loader} from "../components/Loader";
import {InputDate} from "../components/InputDate";
const IVA = 1.16;
const UNIDAD_ID=11;

export class Pagos extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            goBack: false
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

        
    }

    handleGuardar = () =>
    {
        console.log(`----> localhost:4000/insertar/tipo`)
        return axios.post('http://127.0.0.1:4000/insertar/tipo', this.state
        )
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/insertar/tipo`)
                console.log(`----> localhost:4000/insertar/pedi_tipo`);
                this.setState(
                {
                    ...res.data.rows[0]
                })
                console.log(this.state)
                return axios.post('http://127.0.0.1:4000/insertar/pedi_tipo', this.state)
                .then( (res) => {
                    if( res.status === 200) {
                        console.log(`<---- (OK 200) localhost:4000/insertar/pedi_tipo`)
                        console.log(`----> localhost:4000/editarEstado/pedido/${this.state.p_id_pedido}`)
                        axios.post('http://127.0.0.1:4000/editarEstado/pedido',
                        {       
                            "pedido_id" : this.state.p_id_pedido,
                            "estado_id" : 6
                        })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/eliminar/pedido`)
                    this.handleCloseModal()
                    this.handleCloseEliminar()
                    location.reload()
                }
            })
                    }
                    return res
                }).catch( (err) => {
                    return err
                })
                    }
                    return res
        }).catch( (err) => {
            return err
        })

    };

    goToPedidos = () =>
    {
       this.setState(
       {
        goBack:true
       })
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
            <MenuDashBoard title="Pagar"/>
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

                <div className="RowContainer Container-90p"
                                 style={
                                     {
                                         position: "relative"
                                     }}>
                        <div className="WideContainer" style={{margin: "5px"}}>
                         <Dropdown id={"TipoPago"}
                                              name={"tipo_pago"}
                                              retrieveData={this.handleChange}
                                              placeholder="Tipo de Pago..."
                                              options={[
                                                  {text:"Crédito",id:1},
                                                  {text:"Débito",id:2},
                                                  {text:"Cheque",id:3},
                                                  {text:"Transferencia",id:4}]}
                                    />
                        </div>
                        <div className="WideContainer" style={{margin: "5px"}}>
                            
                        </div>
                        <div className="WideContainer" style={{margin: "5px"}}>
                            
                        </div>
                    </div>
            </div>

            {this.state.tipo_pago==1?
                <div className="RowContainer Container-80p"
                                 style={
                                     {
                                         position: "relative"
                                     }}>
                        <div className="WideContainer">
                            <InputText 
                                id="Banco" 
                                label="Banco" 
                                name="c_banco"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="WideContainer">
                            <Dropdown id={"TipoTarjeta"}
                                              name={"c_tipo"}
                                              retrieveData={this.handleChange}
                                              placeholder="Tipo de tarjeta..."
                                              options={[
                                                  {text:"mastercard",id:"mastercard"},
                                                  {text:"visa",id:"visa"},
                                                  {text:"american express",id:"american express"}]}
                                />
                        </div>        
                        <div className="WideContainer">
                            <InputText 
                                id="NumeroCredito" 
                                label="Número" 
                                name="c_numero_tarjeta"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="WideContainer">
                            <InputDate
                                id="VencimientoCredito"
                                name={"c_fecha_vencimiento"}
                                onChange={this.handleChange}
                                styles={{width: "100%"}}
                                style={{background: "white", color: "black"}}
                            />
                        
                        </div>
                </div>:""}
                {this.state.tipo_pago==2?
                <div className="RowContainer Container-80p"
                                 style={
                                     {
                                         position: "relative"
                                     }}>
                        <div className="WideContainer">
                            <InputText 
                                id="Banco" 
                                label="Banco" 
                                name="d_banco"
                                onChange={this.handleChange}
                            />
                        </div>
                 
                        <div className="WideContainer">
                            <InputText 
                                id="NumeroDebito" 
                                label="Número" 
                                name="d_numero_tarjeta"
                                onChange={this.handleChange}
                            />
                        </div>
                </div>:""}
                {this.state.tipo_pago==3?
                <div className="RowContainer Container-80p"
                                 style={
                                     {
                                         position: "relative"
                                     }}>
                        <div className="WideContainer">
                            <InputText 
                                id="Banco" 
                                label="Banco" 
                                name="c_banco"
                                onChange={this.handleChange}
                            />
                        </div>
                 
                        <div className="WideContainer">
                            <InputText 
                                id="NumeroChequeCuenta" 
                                label="Número de cuenta" 
                                name="c_numero_cuenta"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="WideContainer">
                            <InputText 
                                id="NumeroChequeCheque" 
                                label="Número de cheque" 
                                name="c_numero_cheque"
                                onChange={this.handleChange}
                            />
                        </div>
                </div>:""}
                {this.state.tipo_pago==4?
                <div className="RowContainer Container-80p"
                                 style={
                                     {
                                         position: "relative"
                                     }}>
                        <div className="WideContainer">
                            <InputText 
                                id="BancoTrans" 
                                label="Banco" 
                                name="t_banco"
                                onChange={this.handleChange}
                            />
                        </div>
                 
                        <div className="WideContainer">
                            <InputText 
                                id="NumeroTrans" 
                                label="Número de transferencia" 
                                name="t_numero_transferencia"
                                onChange={this.handleChange}
                            />
                        </div>
                </div>:""}
            <GuardarCancelar
                position="center"
                storeData={this.handleGuardar}
                success={this.goToPedidos}
                decline={this.goToPedidos}
            />
            {this.state.goBack && <Redirect push to="../../pedido" /> }
            {this.state.loading && <Loader/>}
        </div>
    )
}