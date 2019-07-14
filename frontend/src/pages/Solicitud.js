import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerEmpleado} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Solicitud extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      solicitudes : [],
      textoBuscardor : "",
      consultarSolicitud : null,
      agregarPresionado : null,
    }
  }

  componentDidMount = () => {
    // API REQUEST GET
    console.log(`----> localhost:4000/consultarLista/solicitud`)
    axios.get('http://127.0.0.1:4000/consultarLista/solicitud')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/solicitud`)

        this.setState({
            solicitudes : res.data.rows
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
    console.log(`consultarSolicitud(${id})`)
    const consultarSolicitud = this.state.solicitudes.find( s => s.s_id_solicitud == id)

    this.setState({
      consultarSolicitud
    })
  }

  recibirRecursos = () => {
    const id = this.state.consultarSolicitud.s_id_solicitud
    /*console.log(`http://127.0.0.1:4000/eliminar/solicitud/(${id})`)

    axios.post('http://127.0.0.1:4000/eliminar/solicitud', 
    {
        "e_id_empleado" : this.state.consultarSolicitud.s_id_solicitud,
    })
    .then( (res) => {
        if( res.status === 200) {
            console.log(`<---- (OK 200) localhost:4000/eliminar/solicitud`)
            this.handleCloseModal()
            this.handleCloseEliminar()
            location.reload()
        }
    })*/
    
  }

  handleEliminar = () => {
    console.log(`eliminarEmpleado(${this.state.consultarSolicitud.s_id_solicitud})`)

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
    console.log(`----> localhost:4000/eliminar/solicitud/${this.state.consultarSolicitud.s_id_solicitud}`)
    axios.post('http://127.0.0.1:4000/eliminar/solicitud', 
        {
            "e_id_empleado" : this.state.consultarSolicitud.s_id_solicitud,
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/eliminar/solicitud`)
                this.handleCloseModal()
                this.handleCloseEliminar()
                location.reload()
            }
        })
  }

  handleCloseModal = () => {
    this.setState({
      consultarSolicitud: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Empleados"}/>

        <div className="ConsultarLista">
          { this.state.solicitudes &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 's_id_solicitud', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  }, 
                },
                {
                  title: 'Proyecto', field: 'p_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: 'Fecha Solicitud', field: 's_fecha_solicitud', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Fecha Pago', field: 's_fecha_pago', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Estado', field: 'e_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                }
              ]}
              data={ this.state.solicitudes }
              title={null}
              
              options={{
                headerStyle: {
                  backgroundColor: '#0C5426',
                  color: "white",
                  fontSize: "large"
                },
                searchFieldAlignment: "left",
                exportButton: true,
                exportFileName: "empleados"
              }}

              onRowClick={(event, rowData) => this.handleConsultar(rowData.s_id_solicitud)}
              localization={{
                toolbar : {
                  searchPlaceholder : "Buscar ..."
                }
              }}

              actions={[
                {
                  icon : () => <img 
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

          {!!this.state.consultarSolicitud && 
          <Modal 
            size="lg"
            show={!!this.state.consultarSolicitud} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{`${this.state.consultarSolicitud.s_id_solicitud} - ${this.state.consultarSolicitud.p_nombre}`}</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <p>
                <span className="mc-atributo">ID</span>
                <span> : {this.state.consultarSolicitud.s_id_solicitud.toString(10).padStart(4, '0')}</span>
              </p>
              <p>
                <span className="mc-atributo">Fecha Solicitud</span>
                <span> : {this.state.consultarSolicitud.s_fecha_solicitud.split('T')[0]}</span>
              </p>
              <p>
                <span className="mc-atributo">Fecha Pago</span>
                <span> : {this.state.consultarSolicitud.s_fecha_pago.split('T')[0]}</span>
              </p>
              <p>
                <span className="mc-atributo">Estado Actual</span>
                <span> : {this.state.consultarSolicitud.e_nombre}</span>
              </p>
             
            </Modal.Body>
            
            <Modal.Footer className="mc-footer">
              {this.state.consultarSolicitud.estado_id === 6 &&
              <Button variant="primary" className="mc-boton mc-boton-guardar" onClick={this.recibirRecursos}>
                Recibir Recursos
              </Button>}

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
                <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar la solicitud de ID ${this.state.consoltarSolicitud && this.state.consoltarSolicitud.s_id_solicitud}?`}</p>
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
    </div>
    </div>
  )
}
