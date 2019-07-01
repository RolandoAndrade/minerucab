import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerCliente, cleanerCompania} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Aliado extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      companias : [],
      textoBuscardor : "",
      consultarCompania : null,
      agregarPresionado : null
    }
  }

  componentDidMount = () => {
    // API REQUEST GET
    console.log(`----> localhost:4000/consultarLista/compania`)
    axios.get('http://127.0.0.1:4000/consultarLista/compania')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/compania`)

        this.setState({
            companias : res.data.rows
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
    console.log(`consultarCompania(${id})`)
    const consultarCompania = this.state.companias.find( c => c.c_id_compania == id)

    this.setState({
      consultarCompania
    })
  }

  handleModificar = () => {
    console.log(`modificarCompania(${this.state.consultarCompania.c_id_compania})`)
    this.setState({
      modificarCompania : this.state.consultarCompania.c_id_compania
    })
  }

  handleEliminar = () => {
    console.log(`eliminarCompania(${this.state.consultarCompania.c_id_compania})`)

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
    console.log(`----> localhost:4000/eliminar/compania/${this.state.consultarCompania.c_id_compania}`)
    axios.post('http://127.0.0.1:4000/eliminar/cliente', 
        {
            "c_id_compania" : this.state.consultarCompania.c_id_compania,
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
      consultarCompania: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Aliados Comerciales"}/>

        <div className="ConsultarLista">
          { this.state.companias &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 'c_id_compania', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  }, 
                },
                {
                  title: 'Nombre', field: 'c_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: 'RIF', field: 'c_rif', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'F. Apertura', field: 'c_fecha_apertura', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Ubicación', field: 'l_nombre', type:'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign: "center"
                  },
                }
              ]}
              data={ cleanerCompania.limpiarLista( this.state.companias ) }
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
          
          {!!this.state.consultarCompania && 
          <Modal 
            size="lg"
            show={!!this.state.consultarCompania} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{this.state.consultarCompania.c_nombre.toUpperCase()}</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <p>
                <span className="mc-atributo">ID</span>
                <span> : {this.state.consultarCompania.c_id_compania.toString(10).padStart(4, '0')}</span>
              </p>
              <p>
                <span className="mc-atributo">RIF</span>
                {/* !!! OJO !!! CLIENTE PUEDE NO TENER RIF?? QUE SIGFNIFICA ESO??*/}
                <span> : {this.state.consultarCompania.c_rif || "No posee RIF"}</span>
              </p>
              <p>
                <span className="mc-atributo">Fecha de apertura</span>
                <span> : {this.state.consultarCompania.c_fecha_apertura.substring(0,10)}</span>
              </p>
              <p>
                <span className="mc-atributo">Lugar</span>
                {/* !!! OJO !!! AGREGAR EL NOMBRE DE LUGAR CON QUERY */}
                <span> : Estado {this.state.consultarCompania.estado}, municipio {this.state.consultarCompania.municipio}, parroquia {this.state.consultarCompania.parroquia}</span>
              </p>
              <p>
                <span className="mc-atributo">Capacidad máxima anual</span>
                <span> : {this.state.consultarCompania.c_capacidad_maxima_anual} toneladas</span>
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
                <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar a ${this.state.consultarCompania && this.state.consultarCompania.c_nombre}?`}</p>
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
