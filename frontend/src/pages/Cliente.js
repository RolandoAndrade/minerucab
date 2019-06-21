import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerCliente} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Cliente extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      clientes : [],
      textoBuscardor : "",
      consultarCliente : null,
      agregarPresionado : null
    }
  }

  componentDidMount = () => {
    // API REQUEST GET
    console.log(`----> localhost:4000/consultarLista/cliente`)
    axios.get('http://127.0.0.1:4000/consultarLista/cliente')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/cliente`)

        this.setState({
            clientes : res.data.rows
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
    console.log(`consultarCliente(${id})`)
    const consultarCliente = this.state.clientes.find( c => c.c_id_cliente == id)

    this.setState({
      consultarCliente
    })
  }

  handleModificar = () => {
    console.log(`modificarCliente(${this.state.consultarCliente.c_id_cliente})`)
    this.setState({
      modificarMineral : this.state.consultarCliente.c_id_cliente
    })
  }

  handleEliminar = () => {
    console.log(`eliminarCliente(${this.state.consultarCliente.c_id_cliente})`)

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
    console.log(`----> localhost:4000/eliminar/cliente/${this.state.consultarCliente.c_id_cliente}`)
    axios.post('http://127.0.0.1:4000/eliminar/cliente', 
        {
            "c_id_cliente" : this.state.consultarCliente.c_id_cliente,
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/eliminar/cliente`)
                this.handleCloseModal()
                this.handleCloseEliminar()
                location.reload()
            }
        })
  }

  handleCloseModal = () => {
    this.setState({
      consultarCliente: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Clientes"}/>

        <div className="ConsultarLista">
          { this.state.clientes &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 'c_id_cliente', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'asc',
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
                  title: 'Teléfono', field: 'c_telefono', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Ubicación', field: 'lugar_id', type:'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign: "center"
                  },
                }
              ]}
              data={ cleanerCliente.limpiarLista( this.state.clientes ) }
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

              onRowClick={(event, rowData) => this.handleConsultar(rowData.c_id_cliente)}
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
          
          {!!this.state.consultarCliente && 
          <Modal 
            size="lg"
            show={!!this.state.consultarCliente} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{this.state.consultarCliente.c_nombre.toUpperCase()}</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <p>
                <span className="mc-atributo">ID</span>
                <span> : {this.state.consultarCliente.c_id_cliente.toString(10).padStart(4, '0')}</span>
              </p>
              <p>
                <span className="mc-atributo">RIF</span>
                {/* !!! OJO !!! CLIENTE PUEDE NO TENER RIF?? QUE SIGFNIFICA ESO??*/}
                <span> : {this.state.consultarCliente.c_rif || "No posee RIF"}</span>
              </p>
              <p>
                <span className="mc-atributo">Teléfono</span>
                <span> : {this.state.consultarCliente.c_telefono}</span>
              </p>
              <p>
                <span className="mc-atributo">Lugar</span>
                {/* !!! OJO !!! AGREGAR EL NOMBRE DE LUGAR CON QUERY */}
                <span> : {this.state.consultarCliente.lugar_id}</span>
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
                <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar a ${this.state.consultarCliente && this.state.consultarCliente.c_nombre}?`}</p>
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

          {!!this.state.modificarMineral 
            && <Redirect to={`/editar/cliente/${this.state.modificarMineral}`} />
          }
          {this.state.agregarPresionado && <Redirect to="/crear/cliente" />}
      </div>
    </div>  
  )
}
