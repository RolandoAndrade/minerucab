import React from 'react';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';

import {API} from '../API/API'
import {MenuDashBoard} from "../components/MenuDashBoard";

const columnas = ["ID", "Nombre", "esMetal?", "esRadioactivo?", "Nacionalizado"] 

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

  handleBuscar  = ({target}) => {
    this.setState({
        textoBuscardor : target.value,
    })
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
          {/* ------------> OJO AGREGAR ICONO DE LA LUPA */}
          <div className="Buscador">
              <input
                  type="text"
                  placeholder="Buscar nombre..." 
                  onChange={this.handleBuscar}
              />
              <img 
                  src="../resources/icons/Agregar.png"
                  width="25px"
                  onClick={this.handleAgregar}
                  className="IconoAgregar"
              />
          </div>

          <div className="Tabla">
              <div className="Columnas">
                  {columnas.map( (columna,i) => (
                      <p className="TituloColumna" key={i}>
                          {columna}
                      </p>
                  ))}
              </div>

              { this.state.minerales ? 
                this.state.minerales.filter( 
                  (m) => m.nombre.toLowerCase().includes( this.state.textoBuscardor.toLowerCase() )
                )
                .map ( (mineral) => (
                  <div 
                      className="Tupla"
                      key={mineral.id}
                      onClick={() => this.handleConsultar(mineral.id)}
                  >
                    <p className="Atributo"> {mineral.id} </p>
                    <p className="Atributo"> {mineral.nombre} </p>
                    <p className="Atributo"> {mineral.esMetal ? "Si" : "No"} </p>
                    <p className="Atributo"> {mineral.esRadioactivo ? "Si" : "No"} </p>
                    <p className="Atributo"> {mineral.nacionalizado || "No" } </p>
                  </div>
              )) :
              <div className="Tupla">No existen minerales registrados</div>
            }

              <div className="FinalTabla"></div>
          </div>

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
                <span> : {this.state.consultarMineral.id}</span>
              </p>
              <p>
                <span className="mc-atributo">esMetal?</span>
                <span> : {this.state.consultarMineral.esMetal ? "Si" : "No"}</span>
              </p>
              <p>
                <span className="mc-atributo">esRadioactivo</span>
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
                  <p className="mc-multivalor" key={i}>- {compuesto}</p>
                )) :
                <p className="mc-multivalor">El mineral no esta compuesto de otros minerales.</p>
              }
             
            </Modal.Body>
            
            <Modal.Footer className="mc-footer">
              <Button variant="primary" className="mc-boton" onClick={this.handleModificar}>
                Modificar
              </Button>

              <Button variant="danger" className="mc-boton" onClick={this.handleEliminar}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
          }

          {this.state.agregarPresionado && <Redirect to="/mineral-agregar" />}
      </div>
    </div>  
  )
}
