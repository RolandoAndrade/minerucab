import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerPedido, cleanerYacimiento} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Pedido extends React.Component {
    constructor(props){
        super(props)

        this.state  = {
            pedidos : [],
            agregarPresionado : null,
            consultarPedido: null
        }
    }

    componentDidMount = () => {
        // API REQUEST GET
        console.log(`----> localhost:4000/consultarLista/pedido`);
        axios.get('http://127.0.0.1:4000/consultarLista/pedido')
            .then( (res) => {
                if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/pedido`)

                this.setState({
                    pedidos : res.data.rows
                })
                console.log(this.state)
            })

    }

    handleAgregar = () => {
        console.log("handleAgregar")
        this.setState({
            agregarPresionado : true
        })
    }

    handleConsultar = (id) => {
        console.log(`consultarYacimiento(${id})`)
        const consultarPedido= this.state.pedidos.find( y => y.p_id_pedido == id)

        this.setState({
            consultarPedido
        })
    }

    handleModificar = () => {
        console.log(`modificarYacimiento(${this.state.consultarYacimiento.y_id_yacimiento})`)
        this.setState({
            modificarYacimiento : this.state.consultarYacimiento.y_id_yacimiento
        })
    }

    handleEliminar = () => {
        console.log(`eliminarYacimiento(${this.state.consultarYacimiento.y_id_yacimiento})`)

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
        console.log(`----> localhost:4000/eliminar/yacimiento/${this.state.consultarYacimiento.y_id_yacimiento}`)
        axios.post('http://127.0.0.1:4000/eliminar/yacimiento',
            {
                "y_id_yacimiento" : this.state.consultarYacimiento.y_id_yacimiento,
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/eliminar/yacimiento`)
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
                            title: 'Producto', field: 'p_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                        },
                        {
                            title: 'Total a pagar', field: 'total', type:'string', headerStyle:{ textAlign : "center"},
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
                    data={ cleanerPedido.limpiarLista( this.state.pedidos ) }
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
                        <h1>{this.state.consultarPedido.p_id_pedido.toUpperCase()}</h1>
                    </Modal.Header>

                    <Modal.Body className="mc-body">
                        <p>
                            <span className="mc-atributo">ID</span>
                            <span> : {this.state.consultarYacimiento.y_id_yacimiento.toString(10).padStart(4, '0')}</span>
                        </p>
                        <p>
                            <span className="mc-atributo">Nombre</span>
                            <span> : {this.state.consultarYacimiento.y_nombre}</span>
                        </p>
                        <p>
                            <span className="mc-atributo">Extensión (km2)</span>
                            <span> : {this.state.consultarYacimiento.y_extension}</span>
                        </p>
                        <p>
                            <span className="mc-atributo">Configuración</span>
                            <span> : {this.state.consultarYacimiento.yacimiento_configuracion}</span>
                        </p>
                        <p>
                            <span className="mc-atributo">Tipo de Yacimiento</span>
                            <span> : {this.state.consultarYacimiento.tipo_yacimiento || "No definido."}</span>
                        </p>
                        <p>
                            <span className="mc-atributo">Dirección</span>
                            <span> : {this.state.consultarYacimiento.lugar}</span>
                        </p>

                    </Modal.Body>

                    <Modal.Footer className="mc-footer">
                        <Button variant="primary" className="mc-boton mc-boton-guardar" onClick={this.handleModificar}>
                            Modificar
                        </Button>

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
                            <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar el ${this.state.consultarYacimiento && this.state.consultarYacimiento.y_nombre}?`}</p>
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

                {!!this.state.modificarYacimiento
                && <Redirect push to={`/editar/pedido/${this.state.modificarYacimiento}`} />
                }
                {this.state.agregarPresionado && <Redirect push to="/crear/pedido" />}
            </div>
        </div>
    )
}