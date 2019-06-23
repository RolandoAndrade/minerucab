import React from 'react';
import axios from 'axios';

import {Modal, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import MaterialTable from 'material-table';

import {cleanerMineral} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";
import {GuardarCancelar} from "../components/GuardarCancelar";

export class MineralAgregar extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
        minerales : [],
        nuevo_mineral: {
            m_id_mineral: 0,
            m_metalico : false,
            m_radioactivo : false,
            m_fecha_nacionalizacion : "",
            m_nombre : "",
            m_descripcion : ""
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
    console.log(`----> localhost:4000/consultarLista/mineral`)
    axios.get('http://127.0.0.1:4000/consultarLista/mineral')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/mineral`)

        this.setState({
            minerales : res.data.rows
        })

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
        por_componer : this.state.minerales.find( m => m.m_id_mineral === idCompuesto)
    })
  }
  
  handleOkComponer = () => {
    console.log(`handleOkComponer( ${this.state.por_componer.m_id_mineral} )`)
    const porcentaje = this.state.porcentaje

    // !!! OJO !!! REVISAR MAXIMO PORCENTAJE    
    
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
    const compuestosNuevo = this.state.compuestos.filter( (c) => c.m_id_mineral !== idDescomponer )
    this.setState({
        compuestos : compuestosNuevo 
    })
  };


  storeData = () =>
  {
      const nuevo_mineral = {
          ...this.state.nuevo_mineral,
          compuestos: this.state.compuestos
      };

      // !!! OJO !!! FALTA AGREGAR MINERALES COMPUESTOS

      console.log(`----> localhost:4000/insertar/mineral`)
      return axios.post('http://127.0.0.1:4000/insertar/mineral',
          {
              "m_nombre" : nuevo_mineral.m_nombre,
              "m_metalico" : nuevo_mineral.m_metalico ,
              "m_radioactivo" : nuevo_mineral.m_radioactivo,
              "m_fecha_nacionalizacion" : nuevo_mineral.m_fecha_nacionalizacion,
              "m_descripcion" : nuevo_mineral.m_descripcion
          })
          .then( (res) => {
              if( res.status === 200) {
                  console.log(`<---- (OK 200) localhost:4000/insertar/mineral`)
              }
              return res
          }).catch( err => err)
  }


  goMineral = () => {
      this.setState({
          goMineral : true
      })
  };

  handleChange = ({target}) => {
      console.log(target);
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
                    <InputText
                        id={"m_nombre"}
                        name={"m_nombre"}
                        label="Nombre"
                        onChange={this.handleChange}
                        styles={{width: "100%"}}
                    />
                </div>
                <div className={"firstColumn"}>
                    <div className="mc-atributo">¿Metal?: </div>
                </div>
                <div className="secondColumn">
                    <form action="">
                        <label className="form-switch">
                            <input
                                type="checkbox"
                                name="m_metalico"
                                onChange={this.handleBool}
                                checked={this.state.nuevo_mineral.m_metalico}
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
                                name="m_radioactivo"
                                onChange={this.handleBool}
                                checked={this.state.nuevo_mineral.m_radioactivo}
                            />
                            <i></i>
                        </label>
                    </form>
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">Nacionalizado:</div>
                </div>
                <div className="secondColumn">
                    <InputDate
                        id="m_fecha_nacionalizacion"
                        name={"m_fecha_nacionalizacion"}
                        onChange={this.handleChange}
                        styles={{width: "100%"}}
                        style={{background: "white", color: "black"}}
                    />
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">Descripción:</div>
                </div>
                <div className="secondColumn">
                    <textarea
                        name="m_descripcion"
                        placeholder="Descripción"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="firstColumn">
                    <span className="mc-atributo">Compuesto de</span><span> : </span>
                    <img
                        src="../resources/icons/Agregar.png"
                        width="25px"
                        onClick={this.handleOpenModal1}
                        className="IconoAgregar"
                    />
                </div>
                <div>
                    {this.state.compuestos.map( (compuesto, i) => (
                        <div className="compuesto" key={i}>
                            <span>{compuesto.m_nombre}</span>
                            <img
                                src="../resources/icons/Eliminar.png"
                                width="20px"
                                onClick={() => this.handleDescomponer(compuesto.m_id_mineral)}
                                className="IconoEliminar"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <GuardarCancelar
                storeData={this.storeData}
                success={this.goMineral} 
                decline={this.goMineral}
            />

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
                    <MaterialTable
                        style={{margin: "0 5%"}}
                        columns={[
                            {
                            title: 'ID', field: 'm_id_mineral', type: 'string', defaultSort : 'desc',
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "right"
                            }, 
                            },
                            {
                            title: 'Nombre', field: 'm_nombre', type: 'string',
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "left"                    
                            },
                            },
                            {
                            title: '¿Metal?', field: 'm_metalico', type: 'string',
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                            },
                            { 
                            title: '¿Radioactivo?', field: 'm_radioactivo', type: 'string',
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"
                            },
                            },
                            { 
                            title: 'Nacionalizado', field: 'm_fecha_nacionalizacion', type:'string',
                            cellStyle : {
                                fontSize : "large",
                                textAlign: "left"
                            },
                            }
                        ]}
                        data={ cleanerMineral.limpiarLista( this.state.minerales ) }
                        title={null}
                        
                        options={{
                            headerStyle: {
                                backgroundColor: '#0C5426',
                                color: "white",
                                fontSize: "large"
                            },
                            searchFieldAlignment: "left"
                        }}

                        onRowClick={(event, rowData) => this.handleOpenModal2( Number.parseInt(rowData.m_id_mineral, 10))}
                        localization={{
                            toolbar : {
                                searchPlaceholder : "Buscar ..."
                            }}
                        }
                    />
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
                    <h1 style={{textAlign:"center"}}>Porcentaje de {!!this.state.por_componer && this.state.por_componer.m_nombre}</h1>
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
