import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerConfiguracion} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class ConfiguracionYacimiento extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      configuraciones : [],
      textoBuscardor : "",
      consultarConfiguracion : null,
      agregarPresionado : null,
    }
  }

  componentDidMount = () => {
    // API REQUEST GET
    console.log(`----> localhost:4000/consultarLista/yacimiento_configuracion`)
    axios.get('http://127.0.0.1:4000/consultarLista/yacimiento_configuracion')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/yacimiento_configuracion`)

        this.setState({
            configuraciones : res.data.rows
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
    console.log(`consultarConfiguracion(${id})`)
    const consultarConfiguracion = this.state.configuraciones.find( e => e.y_id_yacimiento_configuracion == id)

    this.setState({
      consultarConfiguracion
    })
  }

  handleModificar = () => {
    console.log(`modificarConfiguracion(${this.state.consultarConfiguracion.y_id_yacimiento_configuracion})`)
    this.setState({
      modificarConfiguracion : this.state.consultarConfiguracion.y_id_yacimiento_configuracion
    })
  }

  handleEliminar = () => {
    console.log(`eliminarEmpleado(${this.state.consultarConfiguracion.y_id_yacimiento_configuracion})`)

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
    console.log(`----> localhost:4000/eliminar/yacimiento_configuracion/${this.state.consultarConfiguracion.y_id_yacimiento_configuracion}`)
    axios.post('http://127.0.0.1:4000/eliminar/yacimiento_configuracion', 
        {
            "y_id_yacimiento_configuracion" : this.state.consultarConfiguracion.y_id_yacimiento_configuracion,
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/eliminar/yacimiento_configuracion`)
                this.handleCloseModal()
                this.handleCloseEliminar()
                location.reload()
            }
        })
  }

  handleCloseModal = () => {
    this.setState({
      consultarConfiguracion: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Configuraciones de Yacimiento"}/>

        <div className="ConsultarLista">
          { this.state.configuraciones &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 'y_id_yacimiento_configuracion', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
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
                  title: 'Capacidad (tons)', field: 'y_capacidad_explotacion', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                }
                
              ]}
              data={ cleanerConfiguracion.limpiarLista( this.state.configuraciones ) }
              title={null}
              
              options={{
                headerStyle: {
                  backgroundColor: '#0C5426',
                  color: "white",
                  fontSize: "large"
                },
                searchFieldAlignment: "left",
                exportButton: true,
                exportFileName: "configuraciones"
              }}

              onRowClick={(event, rowData) => this.handleConsultar(rowData.y_id_yacimiento_configuracion)}
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
          
          {!!this.state.consultarConfiguracion && 
          <Modal 
            size="lg"
            show={!!this.state.consultarConfiguracion} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{this.state.consultarConfiguracion.y_nombre.toUpperCase()}</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <p>
                <span className="mc-atributo">ID</span>
                <span> : {this.state.consultarConfiguracion.y_id_yacimiento_configuracion.toString(10).padStart(4, '0')}</span>
              </p>
              <p>
                <span className="mc-atributo">Nombre</span>
                <span> : {this.state.consultarConfiguracion.y_nombre}</span>
              </p>
              <p>
                <span className="mc-atributo">Capacidad</span>
                <span> : {this.state.consultarConfiguracion.y_capacidad_explotacion}</span>
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
                <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar a ${this.state.consultarConfiguracion && this.state.consultarConfiguracion.y_nombre}?`}</p>
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

          {!!this.state.modificarConfiguracion 
            && <Redirect push to={`/editar/yacimiento-configuracion/${this.state.modificarConfiguracion}`} />
          }
          {this.state.agregarPresionado && <Redirect push to="/crear/yacimiento-configuracion" />}
      </div>
    </div>  
  )
}
