import React from 'react';

import {Modal, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

import {API} from '../API/API'
import {MenuDashBoard} from "../components/MenuDashBoard";
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";

const columnas = ["ID", "Nombre", "esMetal?", "esRadioactivo?", "Nacionalizado"] 

export class MineralAgregar extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
        minerales : null,
        nuevo_mineral: {
            esMetal : false,
            esRadioactivo : false,
        },
        compuestos : [],
        por_componer : null,
        porcentaje : "",
        openComponer : null,
        textoBuscardor: "",
        goMineral : false
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

  handleDescomponer = (idDescomponer) => {
    const compuestosNuevo = this.state.compuestos.filter( (c) => c.id !== idDescomponer )
    this.setState({
        compuestos : compuestosNuevo 
    })
  }

  handleGuardar = (e) => {
    e.preventDefault()
    const nuevo_mineral = { 
        ...this.state.nuevo_mineral,
        compuestos: this.state.compuestos
    }

    console.log("agregarMineral()")
    console.log(nuevo_mineral)

    this.handleCancelar()
  }

  handleCancelar = () => {
      this.setState({
          goMineral : true
      })
  }

  handleChange = ({target}) => {
    this.setState({
        nuevo_mineral : {
            ...this.state.nuevo_mineral,
            [target.name] : target.value
        }
    })
  }

  handleBool = ({target}) => {
      this.setState({
        nuevo_mineral : {
            ...this.state.nuevo_mineral,
            [target.name] : target.checked
        }
    })
  }

  
  render = () => (
    <div>
        <MenuDashBoard title="Agregar mineral"/>

        <div>

            <div className="CrearElemento">
                <div className="firstColumn">
                    <div className="mc-atributo">Nombre: </div>
                </div>
                <div className="secondColumn">
                    <InputText placeholder="Nombre" id="AgregarMineralNombre"/>
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">¿Metálico?: </div>
                </div>
                <div className="secondColumn">
                    <form action="">
                        <label className="form-switch">
                        <input
                            type="checkbox"
                            name="esMetal"
                            onChange={this.handleBool}
                            checked={this.state.nuevo_mineral.esMetal}
                        />
                        <i></i>
                        </label>
                    </form>
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">¿Radioactivo?: </div>
                </div>
                <div className="secondColumn">
                    <form action="">
                        <label className="form-switch">
                        <input
                            type="checkbox"
                            name="esRadioactivo"
                            onChange={this.handleBool}
                            checked={this.state.nuevo_mineral.esRadioactivo}
                        />
                        <i></i>
                        </label>
                    </form>
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">Nacionalizado: </div>
                </div>

                <div className="secondColumn">
                    <InputDate id="AgregarMineralFecha"/>
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">Descripción:</div>
                </div>
                <div className="secondColumn">
                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        onChange={this.handleChange}
                    />
                </div>
                    <div className="compuesto-de">
                            <span className="mc-atributo">Compuesto de</span><span> : </span>
                            {this.state.compuestos.map( (compuesto, i) => (
                                <div className="compuesto" key={i}>
                                    <span>${compuesto.nombre}</span>
                                    <img 
                                        src="../resources/icons/Eliminar.png"
                                        width="20px"
                                        onClick={() => this.handleDescomponer(compuesto.id)}
                                        className="IconoAgregar"
                                    />
                                </div>
                            ))}
                            <img 
                                src="../resources/icons/Agregar.png"
                                width="25px"
                                onClick={this.handleOpenModal1}
                                className="IconoAgregar"
                            />
                    </div>
                    <div className="botones-abajo">
                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="mc-boton mc-boton-guardar" 
                            onClick={(e) => this.handleGuardar(e)}
                        >
                            Guardar
                        </Button>

                        <Button 
                            variant="secondary" 
                            className="mc-boton" 
                            onClick={this.handleCancelar}
                        >
                            Cancelar
                        </Button>
                    </div>

            </div>

            {this.state.goMineral && <Redirect to="/mineral" /> }

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

                    <div className="Buscador">
                        <input
                            type="text"
                            placeholder="Buscar nombre..." 
                            onChange={this.handleBuscar}
                        />
                        <span className="fa fa-fw fa-search field-icon"></span>           
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
                                <p className="Atributo"> {mineral.id.toString(10).padStart(4, '0')} </p>
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
