import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerProyecto} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Proyecto extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      proyectos : [],
      consultarProyecto : null,
      agregarPresionado : null
    }
  }

  componentDidMount = () => {
    console.log(`----> localhost:4000/consultarLista/proyecto`)
    axios.get('http://127.0.0.1:4000/consultarLista/proyecto')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/proyecto`)

        this.setState({
            proyectos : res.data.rows
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
    console.log(`consultarProyecto(${id})`)
    const consultarProyecto = this.state.proyectos.find( p => p.p_id_proyecto == id)

    this.setState({
      consultarProyecto
    })
  }

  handleModificar = () => {
    console.log(`modificarProyecto(${this.state.consultarProyecto.p_id_proyecto})`)
    this.setState({
      modificarProyecto : this.state.consultarProyecto.p_id_proyecto
    })
  }

  handleEliminar = () => {
    console.log(`eliminarYacimiento(${this.state.consultarProyecto.p_id_proyecto})`)

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
    console.log(`----> localhost:4000/eliminar/proyecto/${this.state.consultarProyecto.p_id_proyecto}`)
    axios.post('http://127.0.0.1:4000/eliminar/proyecto', 
        {
            "p_id_proyecto" : this.state.consultarProyecto.p_id_proyecto,
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/eliminar/proyecto`)
                this.handleCloseModal()
                this.handleCloseEliminar()
                location.reload()
            }
        })
  }

  handleCloseModal = () => {
    this.setState({
      consultarProyecto: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Proyectos"}/>

        <div className="ConsultarLista">
          { this.state.proyectos &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 'p_id_proyecto', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  }, 
                },
                {
                  title: 'Nombre', field: 'p_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: 'Inicio', field: 'p_fecha_inicio', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Yacimiento', field: 'yacimiento', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'ID Pedido', field: 'pedido_id', type:'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign: "center"
                  },
                }
              ]}
              data={ cleanerProyecto.limpiarLista( this.state.proyectos ) }
              title={null}
              
              options={{
                headerStyle: {
                  backgroundColor: '#0C5426',
                  color: "white",
                  fontSize: "large"
                },
                searchFieldAlignment: "left",
                exportButton: true,
                exportFileName: "Proyectos",

              }}

              onRowClick={(event, rowData) => this.handleConsultar(rowData.p_id_proyecto)}
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
          
          {!!this.state.consultarProyecto && 
          <Modal 
            size="lg"
            show={!!this.state.consultarProyecto} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{this.state.consultarProyecto.p_nombre.toUpperCase()}</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <p>
                <span className="mc-atributo">ID</span>
                <span> : {this.state.consultarProyecto.p_id_proyecto.toString(10).padStart(4, '0')}</span>
              </p>
              <p>
                <span className="mc-atributo">Nombre</span>
                <span> : {this.state.consultarProyecto.p_nombre}</span>
              </p>
              <p>
                <span className="mc-atributo">Fecha de Inicio</span>
                <span> : {this.state.consultarProyecto.p_fecha_inicio ? this.state.consultarProyecto.p_fecha_inicio.split('T')[0] : "Sin fecha"}</span>
              </p>
              <p>
                <span className="mc-atributo">Estado</span>
                <span> : {this.state.consultarProyecto.estado}</span>
              </p>
              <p>
                <span className="mc-atributo">Yacimiento</span>
                <span> : {this.state.consultarProyecto.yacimiento}</span>
              </p>
              <p>
                <span className="mc-atributo">ID del Pedido Asociado</span>
                <span> : {this.state.consultarProyecto.pedido_id ? this.state.consultarProyecto.pedido_id.toString(10).padStart(4, '0') : 'No tiene'}</span>
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
                <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar el ${this.state.consultarProyecto && this.state.consultarProyecto.p_nombre}?`}</p>
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

          {!!this.state.modificarProyecto 
            && <Redirect push to={`/editar/proyecto/${this.state.modificarProyecto}`} />
          }
          {this.state.agregarPresionado && <Redirect push to="/crear/proyecto" />}
      </div>
    </div>  
  )
}
