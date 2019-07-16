import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerMineral, cleanerRoles} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Rol extends React.Component {
    constructor(props){
        super(props)

        this.state  = {
            roles
                : [],
            textoBuscardor : "",
            consultarRoles : null,
            agregarPresionado : null,
            permisos : []
        }
    }

    componentDidMount = () => {
        // API REQUEST GET
        console.log(`----> localhost:4000/consultarLista/roles`)
        axios.get('http://127.0.0.1:4000/consultarLista/roles')
            .then( (res) => {
                if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/roles`)

                this.setState({
                    roles: res.data.rows
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
        console.log(`consultarMineral(${id})`)
        const consultarRoles = this.state.roles
            .find( m => m.r_id_rol == id)


        console.log(`----> localhost:4000/consultar/rol`)
        axios.post('http://127.0.0.1:4000/consultar/rol',
            { r_id_rol : consultarRoles.r_id_rol }
        )
            .then( (res) => {
                if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultar/rol`)

                this.setState({
                    permisos : res.data.rows,
                    consultarRoles : consultarRoles
                })

            })

    }

    handleModificar = () => {
        console.log(`modificarMineral(${this.state.consultarRoles.m_id_mineral})`)
        this.setState({
            modificarRol : this.state.consultarRoles.r_id_rol
        })
    }

    handleEliminar = () => {
        console.log(`eliminarMineral(${this.state.consultarRoles.r_id_rol})`)

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
        console.log(`----> localhost:4000/eliminar/rol/${this.state.consultarRoles.r_id_rol}`)
        axios.post('http://127.0.0.1:4000/eliminar/rol',
            {
                "r_id_rol" : this.state.consultarRoles.r_id_rol,
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/eliminar/rol`)
                    this.handleCloseModal()
                    this.handleCloseEliminar()
                    location.reload()
                }
            })
    }

    handleCloseModal = () => {
        this.setState({
            consultarRoles: null,
            permisos : []
        })
    }

    render = () => (
        <div>
            <MenuDashBoard title={"Roles" +
            ""}/>

            <div className="ConsultarLista">
                { this.state.roles
                &&
                <MaterialTable
                    style={{margin: "0 5%"}}
                    columns={[
                        {
                            title: 'ID', field: 'r_id_rol', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                        },
                        {
                            title: 'Nombre', field: 'r_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                        }
                    ]}
                    data={ cleanerRoles.limpiarLista( this.state.roles) }
                    title={null}

                    options={{
                        headerStyle: {
                            backgroundColor: '#0C5426',
                            color: "white",
                            fontSize: "large"
                        },
                        searchFieldAlignment: "left",
                        exportButton: true,
                        exportFileName: "roles" +
                            "",

                    }}

                    onRowClick={(event, rowData) => this.handleConsultar(rowData.r_id_rol)}
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

                {!!this.state.consultarRoles &&
                <Modal
                    size="lg"
                    show={!!this.state.consultarRoles}
                    onHide={this.handleCloseModal}
                    centered
                    scrollable
                    dialogClassName="ModalConsultar"
                >
                    <Modal.Header closeButton className="mc-header">
                        <div></div>
                        <h1>{this.state.consultarRoles.r_nombre.toUpperCase()}</h1>
                    </Modal.Header>

                    <Modal.Body className="mc-body">

                        <p><span className="mc-atributo">Permisos</span><span> :</span></p>
                        { this.state.permisos.length !== 0 ?
                            this.state.permisos.map( (permiso, i) => (
                                <p className="mc-multivalor" key={i}>- {permiso.a_descripcion}</p>
                            )) :
                            <p className="mc-multivalor">El rol no tiene permisos
                                .</p>
                        }

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
                            <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar el ${this.state.consultarRoles && this.state.consultarRoles.r_nombre}?`}</p>
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

                {!!this.state.modificarRol
                && <Redirect push to={`/editar/rol/${this.state.modificarRol}`} />
                }
                {this.state.agregarPresionado && <Redirect push to="/crear/rol" />}
            </div>
        </div>
    )
}
