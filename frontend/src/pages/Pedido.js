import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerPedido, cleanerYacimiento} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";
import Swal from "sweetalert2";
export class Pedido extends React.Component {
    constructor(props){
        super(props)

        this.state  = {
            pedidos : [],
            agregarPresionado : null,
            consultarPedido: null,
            ped: {},
            goProyecto: false
        }
    }

    componentDidMount = () => {
        // API REQUEST GET
        console.log(`----> localhost:4000/consultarLista/pedido`);
        axios.get('http://127.0.0.1:4000/consultarLista/pedido')
            .then( (res) => {
                if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/pedido`)
                let q = res.data.rows;
                let ax={};
                for(let i=0;i<q.length;i++)
                {
                    if(ax[q[i].p_id_pedido])
                    {
                        ax[q[i].p_id_pedido].productos.push({cantidad: q[i].p_cantidad, nombre: q[i].p_nombre, precio: (Math.floor(q[i].total*100)/100).toFixed(2)})
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
                            productos:[{mineral: q[i].mineral_id, cantidad: q[i].p_cantidad, nombre: q[i].p_nombre, precio: (Math.floor(q[i].total*100)/100).toFixed(2)}]}
                    }
                }
                this.setState({
                    pedidos : Object.values(ax),
                    ped: ax
                })
            })

    }

    handleAgregar = () => {
        console.log("handleAgregar")
        this.setState({
            agregarPresionado : true
        })
    }

    handleConsultar = (id) => {
        console.log(`consultarPedido(${id})`)
        const consultarPedido= this.state.pedidos.find( y => y.p_id_pedido == id)
        console.log(consultarPedido)
        this.setState({
            consultarPedido
        })
    }

    handleModificar = () => {
        console.log(`modificarYacimiento(${this.state.consultarYacimiento.p_id_pedido})`)
        this.setState({
            modificarYacimiento : this.state.consultarPedido.p_id_pedido
        })
    }

    handlePagar= () => {
        console.log(`pagar(${this.state.consultarPedido.p_id_pedido})`)
        this.setState({
            pagar : this.state.consultarPedido.p_id_pedido
        })
    }

    handleAsignar = () =>
    {
        let total=0;
        for(let i=0;i<this.state.consultarPedido.productos.length;i++)
        {
            total+=this.state.consultarPedido.productos[i].cantidad;
        }
        axios.post('http://127.0.0.1:4000/consultarCantidad/inventario',
        {
            mineral_id: this.state.consultarPedido.productos[0].mineral
        }).then((res)=>{
            try
            {
                console.log(res.data.rows[0]);
                let cant = res.data.rows[0].cantidad_actual;
                if(cant>=total)
                {
                    axios.post('http://127.0.0.1:4000/insertar/inventario',
                    {
                        pedido_id: parseInt(this.state.consultarPedido.p_id_pedido),
                        i_ingresado: false,
                        i_cantidad: total,
                        mineral_id: this.state.consultarPedido.productos[0].mineral,
                        unidad_id: 7
                    }).then((res)=>{
                        axios.post('http://127.0.0.1:4000/editarEstado/pedido',
                        {
                            "pedido_id" : parseInt(this.state.consultarPedido.p_id_pedido),
                            "estado_id" : 5
                        })
                        .then( (res) => {
                            if( res.status === 200) {
                                console.log(`<---- (OK 200) localhost:4000/editarEstado/pedido`)
                                this.handleCloseModal()
                                this.handleCloseEliminar()
                                location.reload()
                            }
                        })
                    })
                }
                else
                {
                    Swal.fire({
                    title: 'Debes crear un proyecto',
                    text: 'No tiene suficiente material, debe generar un proyecto',
                    type: 'info',
                    showCancelButton: false,
                    confirmButtonText: 'Vamos',
                    cancelButtonText: 'No, editar',
                    confirmButtonColor: "#1CA1DC",
                    cancelButtonColor: "#dc3832"
                    }).then((result) => {
                    if (result.value)
                    {
                        this.setState({
                            goProyecto:true
                        })
                    }
                    })
                }

            }
            catch(e)
            {
                console.log(e);
                Swal.fire({
                    title: 'Debes crear un proyecto',
                    text: 'No tiene suficiente material, debe generar un proyecto',
                    type: 'info',
                    showCancelButton: false,
                    confirmButtonText: 'Vamos',
                    cancelButtonText: 'No, editar',
                    confirmButtonColor: "#1CA1DC",
                    cancelButtonColor: "#dc3832"
                    }).then((result) => {
                    if (result.value)
                    {
                        this.setState({
                            goProyecto:true
                        })
                    }
                    })

            }
            
        })
        

    }

    handleFactura= () => {
        this.setState({
            factura : this.state.consultarPedido.p_id_pedido
        })
    }

    handleEliminar = () => {
        console.log(`eliminarYacimiento(${this.state.consultarPedido.p_id_pedido})`)

        this.setState({
            warningEliminar : true
        })

    }

    handleCloseEliminar = () => {
        this.setState({
            warningEliminar : false
        })
    }

    handleEliminarSeguro = () => {
        console.log(`----> localhost:4000/eliminar/pedido/${this.state.consultarPedido.p_id_pedido}`)
        axios.post('http://127.0.0.1:4000/eliminar/pedido',
            {
                "p_id_pedido" : parseInt(this.state.consultarPedido.p_id_pedido),
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

    handleCloseModal = () => {
        this.setState({
            consultarPedido: null
        })
    }

    handleEntregar = () => {
        console.log(`----> localhost:4000/editarEstado/pedido/${this.state.consultarPedido.p_id_pedido}`)
        axios.post('http://127.0.0.1:4000/editarEstado/pedido',
            {
                "pedido_id" : parseInt(this.state.consultarPedido.p_id_pedido),
                "estado_id" : 7

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

    render = () => (
        <div>
            <MenuDashBoard title={"Pedidos"}/>

            <div className="ConsultarLista">
                { this.state.pedidos &&
                <MaterialTable
                    style={{margin: "0 5%"}}
                    columns={[
                        {
                            title: 'ID', field: 'p_id_pedido', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                        },
                        {
                            title: 'Fecha de solicitud', field: 'p_fecha_solicitud', type: 'date', headerStyle:{ textAlign : "center"},
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                        },
                        {
                            title: 'Cliente', field: 'c_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                        },
                        {
                            title: 'Total', field: 'total', type:'string', headerStyle:{ textAlign : "center"},
                            cellStyle : {
                                fontSize : "large",
                                textAlign: "center"
                            },
                        },
                        {
                            title: 'Estado', field: 'e_nombre', type:'string', headerStyle:{ textAlign : "center"},
                            cellStyle : {
                                fontSize : "large",
                                textAlign: "center"
                            },
                        }
                    ]}
                    data={ cleanerPedido.limpiarLista(this.state.pedidos) }
                    title={null}

                    options={{
                        headerStyle: {
                            backgroundColor: '#0C5426',
                            color: "white",
                            fontSize: "large"
                        },
                        searchFieldAlignment: "left",
                        exportButton: true,
                        exportFileName: "Pedidos",

                    }}

                    onRowClick={(event, rowData) => this.handleConsultar(rowData.p_id_pedido)}
                    localization={
                        {
                            toolbar : {
                                searchPlaceholder : "Buscar ..."
                            },
                            pagination:
                                {
                                    labelRowsSelect: "Filas"
                                },
                            body: {
                                emptyDataSourceMessage: "No hay entradas disponibles"
                            }
                        }}

                    actions={[
                        {
                            icon: () => <img
                                src="../resources/icons/Agregar.png"
                                width="25px"
                                onClick={this.handleAgregar}
                                className="IconoAgregar"
                            />,
                            tooltip: 'Agregar',
                            isFreeAction: true
                        }
                    ]}

                />
                }

                {!!this.state.consultarPedido &&
                <Modal
                    size="lg"
                    show={!!this.state.consultarPedido}
                    onHide={this.handleCloseModal}
                    centered
                    scrollable
                    dialogClassName="ModalConsultar"
                >
                    <Modal.Header closeButton className="mc-header">
                        <div></div>
                        <h1>{this.state.consultarPedido.c_nombre.toUpperCase()}</h1>
                    </Modal.Header>

                    <Modal.Body className="mc-body">
                        <p>
                            <span className="mc-atributo">ID</span>
                            <span> : {this.state.consultarPedido.p_id_pedido.toString(10).padStart(4, '0')}</span>
                        </p>
                        <p>
                            <span className="mc-atributo">Fecha de solicitud </span>
                            <span> : {this.state.consultarPedido.p_fecha_solicitud.substring(0,10)}</span>
                        </p>
                        <p>
                            <span className="mc-atributo">Estado </span>
                            <span> : {this.state.consultarPedido.e_nombre}</span>
                        </p>
                        <p><span className="mc-atributo">Productos comprados</span><span> :</span></p>
                            { this.state.consultarPedido.productos.map( (pedido, i) => (
                            <p className="mc-multivalor" key={i}>- {pedido.cantidad} toneladas de {pedido.nombre} a {pedido.precio} BsS</p>)) 
                            }
                        <p>
                            <span className="mc-atributo">Costo total </span>
                            <span> : {this.state.consultarPedido.total} BsS</span>
                        </p>



                    </Modal.Body>

                    <Modal.Footer className="mc-footer">
                        {this.state.consultarPedido.e_nombre=="no pagado"?
                        <Button variant="primary" className="mc-boton mc-boton-guardar" onClick={this.handlePagar}>
                            Pagar
                        </Button>
                        :""}
                        {this.state.consultarPedido.e_nombre=="iniciado"?
                        <Button variant="primary" className="mc-boton mc-boton-guardar" onClick={this.handleAsignar}>
                            Dar recursos
                        </Button>
                        :""}
                        {this.state.consultarPedido.e_nombre=="pagado"?
                        <Button variant="primary" className="mc-boton mc-boton-guardar" onClick={this.handleEntregar}>
                            Entregar
                        </Button>
                        :""}
                        {this.state.consultarPedido.e_nombre=="entregado"?
                        <Button variant="primary" className="mc-boton mc-boton-guardar" onClick={this.handleFactura}>
                            Ver factura
                        </Button>
                        :""}
                        <Button variant="danger" className="mc-boton" onClick={this.handleEliminar}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>
                }

                {!!this.state.warningEliminar &&
                <Modal
                    size="lg"
                    show={!!this.state.warningEliminar}
                    onHide={this.handleCloseEliminar}
                    centered
                    dialogClassName="ModalConsultar"
                >
                    <Modal.Header closeButton className="mc-header">
                        <div></div>
                        <h1>ADVERTENCIA !!</h1>
                    </Modal.Header>

                    <Modal.Body className="mc-body">
                        <div>
                            <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar el pedido ${this.state.consultarPedido && this.state.consultarPedido.p_id_pedido}?`}</p>
                        </div>

                    </Modal.Body>

                    <Modal.Footer className="mc-footer">
                        <Button variant="primary" className="mc-boton mc-boton-guardar" onClick={this.handleCloseEliminar}>
                            No
                        </Button>

                        <Button variant="danger" className="mc-boton" onClick={this.handleEliminarSeguro}>
                            Si
                        </Button>
                    </Modal.Footer>
                </Modal>
                }

                {!!this.state.pagar
                && <Redirect push to={`/pago/${this.state.pagar}`} />
                }
                {!!this.state.factura
                && <Redirect push to={`/factura/${this.state.factura}`} />
                }
                {this.state.goProyecto
                && <Redirect push to={"../../crear/proyecto"} />
                }
                {this.state.agregarPresionado && <Redirect push to="/crear/pedido" />}
            </div>
        </div>
    )
}