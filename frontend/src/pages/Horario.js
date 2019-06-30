import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerHorario} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {Scheduler} from "../components/Scheduler";

export class Horario extends React.Component {
    constructor(props){
        super(props)

        this.state  = {
            horarios : [],
            agregarPresionado : null,
            consultarHorario: null
        }
    }

    componentDidMount = () => {
        // API REQUEST GET
        console.log(`----> localhost:4000/consultarLista/horario`);
        axios.get('http://127.0.0.1:4000/consultarLista/horario')
            .then( (res) => {
                if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/horario`)

                let q = res.data.rows;
                let ax={};
                for(let i=0;i<q.length;i++)
                {
                    if(ax[q[i].horario_id])
                    {
                        ax[q[i].horario_id].jornadas[q[i].j_dia].push({hora_entrada: q[i].j_hora_entrada, hora_salida: q[i].j_hora_salida})
                    }
                    else
                    {
                        ax[q[i].horario_id]={
                            horario_id: q[i].horario_id, 
                            h_nombre: q[i].h_nombre, 
                            jornadas:{
                                l:[],
                                m:[],
                                x:[],
                                j:[],
                                v:[],
                                s:[],
                                d:[]
                            }
                        }
                        ax[q[i].horario_id].jornadas[q[i].j_dia].push({hora_entrada: q[i].j_hora_entrada, hora_salida: q[i].j_hora_salida})
                    }
                }
                this.setState({
                    horarios : Object.values(ax)
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
        console.log(`consultarHorario(${id})`)
        const consultarHorario= this.state.horarios.find( y => y.horario_id == id)
        console.log(consultarHorario);
        this.setState({
            consultarHorario
        })
    }

    handleModificar = () => {
        console.log(`modificarHorario(${this.state.consultarHorario.horario_id})`)
        this.setState({
            modificarHorario : this.state.consultarHorario.horario_id
        })
    }

    handleEliminar = () => {
        console.log(`eliminarHorario(${this.state.consultarHorario.horario_id})`)

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
        console.log(`----> localhost:4000/eliminar/horario/${this.state.consultarHorario.horario_id}`)
        axios.post('http://127.0.0.1:4000/eliminar/horario',
            {
                "horario_id" : this.state.consultarHorario.horario_id
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/eliminar/horario`)
                    this.handleCloseModal()
                    this.handleCloseEliminar()
                    location.reload()
                }
            })
    }

    handleCloseModal = () => {
        this.setState({
            consultarHorario: null
        })
    }

    render = () => (
        <div>
            <MenuDashBoard title={"Horarios"}/>

            <div className="ConsultarLista">
                { this.state.horarios &&
                <MaterialTable
                    style={{margin: "0 5%"}}
                    columns={[
                        {
                            title: 'ID', field: 'h_id_horario', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                        },
                        {
                            title: 'Nombre', field: 'h_nombre', type: 'date', headerStyle:{ textAlign : "center"},
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                        },
                    ]}
                    data={ cleanerHorario.limpiarLista( this.state.horarios ) }
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

                    onRowClick={(event, rowData) => this.handleConsultar(rowData.h_id_horario)}
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

                {!!this.state.consultarHorario &&
                <Modal
                    size="lg"
                    show={!!this.state.consultarHorario}
                    onHide={this.handleCloseModal}
                    centered
                    scrollable
                    dialogClassName="ModalConsultar"
                >
                    <Modal.Header closeButton className="mc-header">
                        <div></div>
                        <h1>{this.state.consultarHorario.h_nombre}</h1>
                    </Modal.Header>

                    <Modal.Body className="mc-body">
                        <Scheduler editable={false} setData={this.state.consultarHorario.jornadas}/>
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

                {!!this.state.modificarHorario
                && <Redirect push to={`/editar/horario/${this.state.modificarHorario}`} />
                }
                {this.state.agregarPresionado && <Redirect push to="/crear/horario" />}
            </div>
        </div>
    )
}