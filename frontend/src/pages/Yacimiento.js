import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerYacimiento} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Yacimiento extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      yacimientos : [],
      consultarYacimiento : null,
      agregarPresionado : null
    }
  }

  componentDidMount = () => {
    // API REQUEST GET
    console.log(`----> localhost:4000/consultarLista/yacimiento`)
    axios.get('http://127.0.0.1:4000/consultarLista/yacimiento')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/yacimiento`)

        this.setState({
            yacimientos : res.data.rows
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
    console.log(`consultarYacimiento(${id})`)
    const consultarYacimiento = this.state.yacimientos.find( y => y.y_id_yacimiento == id)

    this.setState({
      consultarYacimiento
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
      consultarYacimiento: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Yacimientos"}/>

        <div className="ConsultarLista">
          { this.state.yacimientos &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 'y_id_yacimiento', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  }, 
                },
                {
                  title: 'Nombre', field: 'y_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: 'Extensión (km2)', field: 'y_extension', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Configuración', field: 'yacimiento_configuracion', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Lugar', field: 'lugar', type:'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign: "center"
                  },
                }
              ]}
              data={ cleanerYacimiento.limpiarLista( this.state.yacimientos ) }
              title={null}
              
              options={{
                headerStyle: {
                  backgroundColor: '#0C5426',
                  color: "white",
                  fontSize: "large"
                },
                searchFieldAlignment: "left",
                exportButton: true,
                exportFileName: "Minerales",

              }}

              onRowClick={(event, rowData) => this.handleConsultar(rowData.y_id_yacimiento)}
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
          
          {!!this.state.consultarYacimiento && 
          <Modal 
            size="lg"
            show={!!this.state.consultarYacimiento} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{this.state.consultarYacimiento.y_nombre.toUpperCase()}</h1>
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
            && <Redirect push to={`/editar/yacimiento/${this.state.modificarYacimiento}`} />
          }
          {this.state.agregarPresionado && <Redirect push to="/crear/yacimiento" />}
      </div>
    </div>  
  )
}
