import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerCliente, cleanerCompania, cleanerInventario} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class InventarioMovs extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      movimientos : [],
      textoBuscardor : "",
      consultarMovimiento : null,
      agregarPresionado : null
    }
  }

  componentDidMount = () => {
    // API REQUEST GET
    console.log(`----> localhost:4000/consultarMovimiento/inventario`)
    axios.get('http://127.0.0.1:4000/consultarMovimiento/inventario')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarMovimiento/inventario`)

        this.setState({
            movimientos : res.data.rows
        })
          console.log(this.state);
      })
  }

  handleAgregar = () => {
    console.log("handleAgregar")
    this.setState({
      agregarPresionado : true
    })
  }

  handleConsultar = (id) => {
    console.log(`consultarMovimiento(${id})`)
    const consultarMovimiento = this.state.movimientos.find( c => c.c_id_compania == id)

    this.setState({
      consultarMovimiento
    })
  }

  handleModificar = () => {
    console.log(`modificarCompania(${this.state.consultarMovimiento.c_id_compania})`)
    this.setState({
      modificarCompania : this.state.consultarMovimiento.c_id_compania
    })
  }

  handleEliminar = () => {
    console.log(`eliminarCompania(${this.state.consultarMovimiento.c_id_compania})`)

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
    console.log(`----> localhost:4000/eliminar/compania/${this.state.consultarMovimiento.c_id_compania}`)
    axios.post('http://127.0.0.1:4000/eliminar/cliente', 
        {
            "c_id_compania" : this.state.consultarMovimiento.c_id_compania,
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/eliminar/compania`)
                this.handleCloseModal()
                this.handleCloseEliminar()
                location.reload()
            }
        })
  }

  handleCloseModal = () => {
    this.setState({
      consultarMovimiento: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Movimientos en inventario"}/>

        <div className="ConsultarLista">
          { this.state.movimientos &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'Movimiento', field: 'i_id_inventario', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  }, 
                },
                {
                  title: 'Accion', field: 'i_accion', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: 'Cantidad', field: 'i_cantidad', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: 'Mineral', field: 'm_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Fecha', field: 'i_fecha_modificacion', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
              ]}
              data={ cleanerInventario.limpiarLista( this.state.movimientos ) }
              title={null}
              
              options={{
                headerStyle: {
                  backgroundColor: '#0C5426',
                  color: "white",
                  fontSize: "large"
                },
                searchFieldAlignment: "left",
                exportButton: true,
                exportFileName: "clientes"
              }}

              onRowClick={(event, rowData) => this.handleConsultar(rowData.c_id_compania)}
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

             

            />
          }
          
          {!!this.state.consultarMovimiento && 
          <Modal 
            size="lg"
            show={!!this.state.consultarMovimiento} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{this.state.consultarMovimiento.c_nombre.toUpperCase()}</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <p>
                <span className="mc-atributo">ID</span>
                <span> : {this.state.consultarMovimiento.c_id_compania.toString(10).padStart(4, '0')}</span>
              </p>
              <p>
                <span className="mc-atributo">RIF</span>
                {/* !!! OJO !!! CLIENTE PUEDE NO TENER RIF?? QUE SIGFNIFICA ESO??*/}
                <span> : {this.state.consultarMovimiento.c_rif || "No posee RIF"}</span>
              </p>
              <p>
                <span className="mc-atributo">Fecha de apertura</span>
                <span> : {this.state.consultarMovimiento.c_fecha_apertura.substring(0,10)}</span>
              </p>
              <p>
                <span className="mc-atributo">Lugar</span>
                {/* !!! OJO !!! AGREGAR EL NOMBRE DE LUGAR CON QUERY */}
                <span> : Estado {this.state.consultarMovimiento.estado}, municipio {this.state.consultarMovimiento.municipio}, parroquia {this.state.consultarMovimiento.parroquia}</span>
              </p>
              <p>
                <span className="mc-atributo">Capacidad máxima anual</span>
                <span> : {this.state.consultarMovimiento.c_capacidad_maxima_anual} toneladas</span>
              </p>
             
            </Modal.Body>
            
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
                <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar a ${this.state.consultarMovimiento && this.state.consultarMovimiento.c_nombre}?`}</p>
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

          {!!this.state.modificarCompania 
            && <Redirect push to={`/editar/cliente/${this.state.modificarCompania}`} />
          }
          {this.state.agregarPresionado && <Redirect push to="/crear/cliente" />}
      </div>
    </div>  
  )
}
