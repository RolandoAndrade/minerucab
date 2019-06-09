import React from 'react';

import {Modal, Button} from 'react-bootstrap';

import {API} from '../API/API'
import {HeaderLogin} from '../components/HeaderLogin'

const columnas = ["ID", "Nombre", "esMetal?", "esRadioactivo?", "Nacionalizado"] 

export class MineralAgregar extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
        minerales : null,
        compuestos : [],
        por_componer : null,
        porcentaje : "",
        openComponer : null,
        textoBuscardor: "",
    }
  }

  componentDidMount = () => {
    console.log("consultarTodos( Mineral )")
    this.setState({
        minerales : API.consultarTodos("Mineral")
    })
  }

  handleBuscar  = ({target}) => {
    this.setState({
        textoBuscardor : target.value,
    })
  }

  handleOpenModal1 = () => {
    this.setState({
        openComponer : true
    })
  }

  handleCloseModal1 = () => {
    this.setState({
        openComponer: null
    })
  }
  
  handleOpenModal2 = (idCompuesto) => {
    this.handleCloseModal1()
    this.setState({
        por_componer : this.state.minerales.find( m => m.id === idCompuesto)
    })
  }
  
  handleOkComponer = () => {
    console.log(`handleOkComponer( ${this.state.por_componer.id} )`)
    const porcentaje = this.state.porcentaje

    // ------------> OJO REVISAR MAXIMO PORCENTAJE
    
    if (porcentaje > 0 && porcentaje < 100)
        this.setState( (prev) => ({
            compuestos : [...prev.compuestos , { ...prev.por_componer, porcentaje } ],
            por_componer : null,
            porcentaje : 0
        }))
    this.handleCloseModal2()
  }

  handlePorcentaje = ({target}) => {
    const porcentaje = /^[0-9][0-9 , .]*/.test(target.value) ? target.value : null
    if (porcentaje) 
        this.setState({
            porcentaje
        })
  }

  handleCloseModal2 = () => {
    this.setState({
        por_componer: null
    })
  }

  
  render = () => (
    <div>
        <HeaderLogin />

        <div>
            <div className="TituloTabla">
              <h1>Crear Mineral</h1>
            </div>

            <div className="CrearElemento">
                <form>
                    <p>
                        <span className="mc-atributo">Nombre</span><span> : </span>
                        <input 
                            name="nombre"
                            type="text"
                            placeholder="nombre ..."
                        />
                    </p>
                    <p>
                        <span className="mc-atributo">esMetal?</span><span> : </span>
                        <label className="form-switch">
                            <input 
                                type="checkbox"
                                name="esMetal"
                            />
                            <i></i>
                        </label>
                    </p>
                    <p>
                        <span className="mc-atributo">esRadioactivo?</span><span> : </span>
                        <label className="form-switch">
                            <input 
                                type="checkbox"
                                name="esRadioactivo"
                            />
                            <i></i>
                        </label>
                    </p>
                    <p>
                        <span className="mc-atributo">Nacionalizado</span><span> : </span>
                        <input
                            type="date"
                            name="nacionalizado"
                        />
                    </p>
                    <p>
                        <span className="mc-atributo">Descripción</span><span> : </span>
                        <textarea
                            name="descripcion"
                            placeholder="descripción ..."
                        />
                    </p>
                    <div className="compuesto-de">
                            <span className="mc-atributo">Compuesto de</span><span> : </span>
                            {this.state.compuestos.map( (compuesto, i) => (
                                <div className="compuesto" key={i}>
                                    <span>{`${compuesto.nombre} (${compuesto.porcentaje}%)`}</span>
                                </div>
                            ))}
                            <img 
                                src="../resources/icons/Agregar.png"
                                width="25px"
                                onClick={this.handleOpenModal1}
                                className="IconoAgregar"
                            />
                    </div>
                </form>
            </div>
            
            <Modal 
                size="lg"
                show={this.state.openComponer} 
                onHide={this.handleCloseModal1}
                centered
                scrollable
                dialogClassName="ModalConsultar"
            >
                <Modal.Header closeButton className="mc-header">
                    <div></div>
                    <h1>Agregar mineral</h1>
                </Modal.Header>

                <Modal.Body className="mc-body"> 

                    {/* ------------> OJO AGREGAR ICONO DE LA LUPA */}
                    <div className="Buscador">
                        <input
                            type="text"
                            placeholder="Buscar nombre..." 
                            onChange={this.handleBuscar}
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

                        {   this.state.minerales &&
                            this.state.minerales.filter( 
                                (m) => m.nombre.toLowerCase().includes( this.state.textoBuscardor.toLowerCase() ) &&  
                                    !this.state.compuestos.find( (c) => c.id === m.id)
                            )
                            .map ( (mineral) => (
                            <div 
                                className="Tupla"
                                key={mineral.id}
                                onClick={() => this.handleOpenModal2(mineral.id)}
                            >
                                <p className="Atributo"> {mineral.id} </p>
                                <p className="Atributo"> {mineral.nombre} </p>
                                <p className="Atributo"> {mineral.esMetal ? "Si" : "No"} </p>
                                <p className="Atributo"> {mineral.esRadioactivo ? "Si" : "No"} </p>
                                <p className="Atributo"> {mineral.nacionalizado || "No" } </p>
                            </div>
                            ))
                        }

                        <div className="FinalTabla"></div>
                    </div>
                </Modal.Body>
                
                <Modal.Footer className="mc-footer">
                    <Button variant="secondary" className="mc-boton" onClick={this.handleCloseModal1}>
                        Volver
                    </Button>

                </Modal.Footer>
            </Modal>

            <Modal 
                size="lg"
                show={!!this.state.por_componer} 
                onHide={this.handleCloseModal2}
                centered
            >
                <Modal.Header closeButton className="mc-header">
                    <div></div>
                    <h1 style={{textAlign:"center"}}>Porcentaje de {!!this.state.por_componer && this.state.por_componer.nombre}</h1>
                </Modal.Header>

                <Modal.Body className="mc-body"> 
                    <input 
                        type="number"
                        value={this.state.porcentaje}
                        onChange={this.handlePorcentaje}
                    />
                </Modal.Body>
                
                <Modal.Footer className="mc-footer">
                    <Button variant="secondary" className="mc-boton" onClick={this.handleCloseModal2}>
                        Cancelar
                    </Button>
                    <Button variant="primary" className="mc-boton" onClick={this.handleOkComponer}>
                        Aceptar
                    </Button>

                </Modal.Footer>
            </Modal>
        
      </div>
    </div>  
  )
}
