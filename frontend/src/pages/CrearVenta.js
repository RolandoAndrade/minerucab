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

export class CrearVenta extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            cliente_id: -1,
            minerales: [{mineral_id: -1, cantidad: 0, precio: 0, presentacion_id: -1}],
            goSolicitud: false,
            listaMinerales: [],
            listaClientes: [],
            listaProductos: [],
            total: 0,
            subtotal: 0,
            loading: false,
            pedido_id:1
        }

    }

    componentDidMount = () => {
        this.setState(
            {
                loading: true
            }
        )
        console.log(`----> localhost:4000/consultarLista/mineral`)
        axios.get('http://127.0.0.1:4000/consultarLista/mineral')
            .then( (res) => {
                if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/mineral`)

                this.setState({
                    listaMinerales: cleanerMineral.limpiarListaDropdown(res.data.rows),
                })

            });
        axios.get('http://127.0.0.1:4000/consultarLista/producto')
            .then( (res) => {
                if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/producto`);

                this.setState({
                    listaProductos: cleanerProducto.limpiarListaDropdown(res.data.rows),
                })
                console.log(this.state)

            });
        axios.get('http://127.0.0.1:4000/consultarLista/cliente')
            .then( (res) => {
                if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/cliente`);

                this.setState({
                    listaClientes: cleanerCliente.limpiarListaDropdown(res.data.rows),
                    loading: false
                })
                console.log(this.state)

            });


    }

    handleGuardar = () =>
    {

        console.log(`----> localhost:4000/insertar/pedido`);
        return axios.post('http://127.0.0.1:4000/insertar/pedido',
            {
                cliente_id: this.state.cliente_id,
                minerales: this.state.minerales,
                total: this.state.total,
            }
        ).then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/insertar/pedido`)
                }
                return res
            }).catch( (err) => {
            return err
        })
    };

    goSolicitud = () =>
    {
        this.setState({
            goSolicitud: true
        })
    };


    addMineral = () =>
    {
        let newMinerales = this.state.minerales;
        newMinerales.push(
            {
                mineral_id: -1,
                cantidad: 0,
                precio: 0,
                presentacion_id: -1
            }
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
        const newMinerales = this.state.minerales.splice(id, 1);
        this.setState(
            {
                minerales: newMinerales
            }
        )
    };

    handleChange = (target) =>
    {
        target = target.target || target;
        this.setState({
            [target.name]: target.value
        })
    };

    handleRemovable = (target, i) =>
    {
        target = target.target || target;
        let newMinerales = this.state.minerales;
        newMinerales[i][target.name] = target.value;
        this.setState(
            {
                minerales: newMinerales
            }
        );
        this.getTotal();
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
            <MenuDashBoard title="Crear pedido"/>


            <div className="Container-90p" style={{margin: "5% auto"}}>

                <div className="WideContainer" style={{position: "static", marginBottom: "2%"}}>
                    <div className="RowContainer Container-100p">
                    <Dropdown id="CrearSolicitudCliente"
                              name="cliente_id"
                              retrieveData={this.handleChange}
                              styles={{width: "100%"}}
                              placeholder="Cliente..."
                              options={this.state.listaClientes}/>
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
                            <div className="RowContainer Container-90p" key={i}
                                 style={
                                     {
                                         position: "relative",
                                         zIndex: this.state.minerales.length-i
                                     }}>
                                <div className="WideContainer" style={{justifyContent: "right", width: "30%"}}>
                                    <i className="zmdi zmdi-close-circle-o LabelIcon" onClick={()=>this.removeMineral(i)}></i>
                                </div>
                                <div className="WideContainer">
                                    <Dropdown id={"CrearSolicitudMineral"+i}
                                              name={"mineral_id"}
                                              placeholder="Mineral..."
                                              retrieveData={(target)=>this.handleRemovable(target,i)}
                                              options={
                                                  this.state.listaMinerales
                                              }
                                    />
                                </div>
                                <div className="WideContainer">
                                    <InputText
                                        styles={{width:"95%"}}
                                        id={"CrearSolicitudCantidad"+i}
                                        label="Cantidad"
                                        type="number"
                                        min="0"
                                        name="cantidad"
                                        onChange={(target)=>this.handleRemovable(target,i)}
                                        value={""+this.state.minerales[i].cantidad}
                                    />
                                </div>
                                <div className="WideContainer" style={{width: "50%"}}>
                                    <div className="LabelSimple">Toneladas</div>
                                </div>
                                <div className="WideContainer">
                                    <InputText styles={{width:"95%"}}
                                               id={"CrearSolicitudPrecio"+i}
                                               label="Precio por unidad"
                                               name="precio"
                                               min="0"
                                               step="500"
                                               onChange={(target)=>this.handleRemovable(target,i)}
                                               type="number"
                                               value={""+this.state.minerales[i].precio}
                                    />

                                </div>
                                <div className="WideContainer" style={{width: "20%"}}>
                                    <div className="LabelSimple">Bs.S</div>
                                </div>
                                <div className="WideContainer">
                                    <Dropdown id={"CrearSolicitudPresentación"+i}
                                              name={"presentacion_id"}
                                              placeholder="Presentación..."
                                              retrieveData={(target)=>this.handleRemovable(target,i)}
                                              options={this.state.listaProductos.filter(
                                                  (t) =>
                                                  {
                                                      return t.mineral == this.state.minerales[i].mineral_id
                                                  }
                                              )}
                                    />
                                </div>
                            </div>
                        )
                    },this)
                }
                <div className="ButtonAddUser" onClick={this.addMineral} style={{marginLeft: "12%", width: "81%"}}>
                    Agregar mineral
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

                <GuardarCancelar
                    position="right"
                    storeData={this.handleGuardar}
                    success={this.goSolicitud}
                    decline={this.goSolicitud}
                />
            </div>
            {this.state.goSolicitud && <Redirect push to="../../pedido" />}
            {this.state.loading && <Loader/>}
        </div>
    )
}