import React from 'react';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {API} from '../API/API'
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Mineral extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      minerales : null,
      textoBuscardor : "",
      consultarMineral : null,
      agregarPresionado : null
    }
  }

  componentDidMount = () => {
    this.setState({
        minerales : API.consultarTodos("Mineral")
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
    const consultarMineral = this.state.minerales.find( m => m.id == id)

    this.setState({
      consultarMineral
    })
  }

  handleModificar = () => {
    console.log(`modificarMineral(${this.state.consultarMineral.id})`)
    this.setState({
      modificarMineral : this.state.consultarMineral.id
    })
  }

  handleEliminar = () => {
    console.log(`eliminarMineral(${this.state.consultarMineral.id})`)

    this.setState({
      warningEliminar : true
    })

  }

  handleCloseModal = () => {
    this.setState({
      consultarMineral: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard/>

        <div className="ConsultarLista">
          <div className="TituloTabla">
              <h1>Minerales</h1>
          </div>

            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 'id', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  }, 
                },
                {
                  title: 'Nombre', field: 'nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: '¿Metal?', field: 'esMetal', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: '¿Radioactivo?', field: 'esRadioactivo', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Nacionalizado', field: 'nacionalizado', type:'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign: "center"
                  },
                }
              ]}
              data={API.consultarTodos("MINERAL")}
              title={null}
              
              options={{
                headerStyle: {
                  backgroundColor: '#0C5426',
                  color: "white",
                  fontSize: "large"
                },
                searchFieldAlignment: "left",
                exportButton: true,
                exportFileName: "Minerales"
              }}

              onRowClick={(event, rowData) => this.handleConsultar(rowData.id)}
              localization={{
                toolbar : {
                  searchPlaceholder : "Buscar ..."
                }}
              }

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

          {!!this.state.consultarMineral && 
          <Modal 
            size="lg"
            show={!!this.state.consultarMineral} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{this.state.consultarMineral.nombre.toUpperCase()}</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <p>
                <span className="mc-atributo">ID</span>
                <span> : {this.state.consultarMineral.id.toString(10).padStart(4, '0')}</span>
              </p>
              <p>
                <span className="mc-atributo">¿Metal?</span>
                <span> : {this.state.consultarMineral.esMetal ? "Si" : "No"}</span>
              </p>
              <p>
                <span className="mc-atributo">¿Radioactivo?</span>
                <span> : {this.state.consultarMineral.esRadioactivo ? "Si" : "No"}</span>
              </p>
              <p>
                <span className="mc-atributo">Nacionalizado</span>
                <span> : {this.state.consultarMineral.nacionalizado || "No"}</span>
              </p>
              <p>
                <span className="mc-atributo">Descripción</span>
                <span> : {this.state.consultarMineral.descripcion || "El mineral no posee descripción"}</span>
              </p>
              <p><span className="mc-atributo">Yacimientos</span><span> :</span></p>
              { this.state.consultarMineral.yacimientos ?
                this.state.consultarMineral.yacimientos.map( (yacimiento, i) => (
                  <p className="mc-multivalor" key={i}>- {yacimiento}</p>
                )) :
                <p className="mc-multivalor">El mineral no se ha registrado en ningún yacimiento.</p>
              }
              <p><span className="mc-atributo">Compuesto de</span><span> :</span></p>
              { this.state.consultarMineral.compuestos ?
                this.state.consultarMineral.compuestos.map( (compuesto, i) => (
                  <p className="mc-multivalor" key={i}>- {compuesto.nombre}</p>
                )) :
                <p className="mc-multivalor">El mineral no esta compuesto de otros minerales.</p>
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

          {!!this.state.modificarMineral 
            && <Redirect to={`/editar/mineral/${this.state.modificarMineral}`} />
          }
          {this.state.agregarPresionado && <Redirect to="/crear/mineral" />}
      </div>
    </div>  
  )
}
