import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerEmpleado} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Empleado extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      empleados : [],
      textoBuscardor : "",
      consultarEmpleado : null,
      agregarPresionado : null,
    }
  }

  componentDidMount = () => {
    // API REQUEST GET
    console.log(`----> localhost:4000/consultarLista/empleado`)
    axios.get('http://127.0.0.1:4000/consultarLista/empleado')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/empleado`)

        this.setState({
            empleados : res.data.rows
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
    console.log(`consultarEmpleado(${id})`)
    const consultarEmpleado = this.state.empleados.find( e => e.e_id_empleado == id)

    this.setState({
      consultarEmpleado
    })
  }

  handleModificar = () => {
    console.log(`modificarEmpleado(${this.state.consultarEmpleado.e_id_empleado})`)
    this.setState({
      modificarEmpleado : this.state.consultarEmpleado.e_id_empleado
    })
  }

  handleEliminar = () => {
    console.log(`eliminarEmpleado(${this.state.consultarEmpleado.e_id_empleado})`)

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
    console.log(`----> localhost:4000/eliminar/empleado/${this.state.consultarEmpleado.e_id_empleado}`)
    axios.post('http://127.0.0.1:4000/eliminar/empleado', 
        {
            "e_id_empleado" : this.state.consultarEmpleado.e_id_empleado,
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/eliminar/empleado`)
                this.handleCloseModal()
                this.handleCloseEliminar()
                location.reload()
            }
        })
  }

  handleCloseModal = () => {
    this.setState({
      consultarEmpleado: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Empleados"}/>

        <div className="ConsultarLista">
          { this.state.empleados &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 'e_id_empleado', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  }, 
                },
                {
                  title: 'Nombre', field: 'e_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: 'Apellido', field: 'e_apellido', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Cédula', field: 'e_cedula', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Género', field: 'e_genero', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                    title: 'Cargo', field: 'cargo', type:'string', headerStyle:{ textAlign : "center"},
                    cellStyle : {
                        fontSize : "large",
                        textAlign: "center"
                    },
                },
                { 
                  title: 'Dirección', field: 'lugar', type:'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign: "center"
                  },
                },
                { 
                    title: 'Estado Actual', field: 'estado', type:'string', headerStyle:{ textAlign : "center"},
                    cellStyle : {
                        fontSize : "large",
                        textAlign: "center"
                    },
                }
              ]}
              data={ cleanerEmpleado.limpiarLista( this.state.empleados ) }
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

              onRowClick={(event, rowData) => this.handleConsultar(rowData.e_id_empleado)}
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
          
          {!!this.state.consultarEmpleado && 
          <Modal 
            size="lg"
            show={!!this.state.consultarEmpleado} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{this.state.consultarEmpleado.e_nombre.toUpperCase()}</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <p>
                <span className="mc-atributo">ID</span>
                <span> : {this.state.consultarEmpleado.e_id_empleado.toString(10).padStart(4, '0')}</span>
              </p>
              <p>
                <span className="mc-atributo">Cédula</span>
                <span> : {this.state.consultarEmpleado.e_cedula}</span>
              </p>
              <p>
                <span className="mc-atributo">Nombre Completo</span>
                <span> : {`
                            ${this.state.consultarEmpleado.e_nombre} ${this.state.consultarEmpleado.e_segundo_nombre || ""} 
                            ${this.state.consultarEmpleado.e_apellido} ${this.state.consultarEmpleado.e_segundo_apellido || ""}`}</span>
              </p>
              <p>
                <span className="mc-atributo">Teléfono</span>
                <span> : {this.state.consultarEmpleado.e_telefono}</span>
              </p>
              <p>
                <span className="mc-atributo">Género</span>
                <span> : {this.state.consultarEmpleado.e_genero === "m" ? "Hombre" : "Mujer"}</span>
              </p>
              <p>
                <span className="mc-atributo">Fecha Nacimiento</span>
                <span> : {this.state.consultarEmpleado.e_fecha_nacimiento.split('T')[0]}</span>
              </p>
              <p>
                <span className="mc-atributo">Fecha Ingreso</span>
                <span> : {this.state.consultarEmpleado.e_fecha_ingreso.split('T')[0]}</span>
              </p>
              <p>
                <span className="mc-atributo">Cargo</span>
                <span> : {this.state.consultarEmpleado.cargo}</span>
              </p>
              <p>
                <span className="mc-atributo">Dirección</span>
                <span> : {this.state.consultarEmpleado.lugar}</span>
              </p>
              <p>
                <span className="mc-atributo">Estado Actual</span>
                <span> : {this.state.consultarEmpleado.estado}</span>
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
                <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar a ${this.state.consultarEmpleado && this.state.consultarEmpleado.e_nombre}?`}</p>
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

          {!!this.state.modificarEmpleado 
            && <Redirect push to={`/editar/empleado/${this.state.modificarEmpleado}`} />
          }
          {this.state.agregarPresionado && <Redirect push to="/crear/empleado" />}
      </div>
    </div>  
  )
}
