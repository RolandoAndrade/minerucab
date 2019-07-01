import React from 'react';
import axios from 'axios';

import {Modal, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import MaterialTable from 'material-table';

import {cleanerMineral} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {GuardarCancelar} from "../components/GuardarCancelar";
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";

export class MineralEditar extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
        minerales : [],
        nuevo_mineral: {
            m_id_mineral: 0,
            m_tipo : "no metal",
            m_radioactivo : false,
            m_fecha_nacionalizacion : "",
            m_nombre : "",
            m_descripcion : ""
        },
        compuestos : [],
        posiblesCompuestos : [],
        por_componer : null,
        porcentaje : "",
        openComponer : null,
        textoBuscardor: "",
        goMineral : false
    }
  }

  componentDidMount = () => {
    // ID PROVENIENTE DEL URL
    const id = Number.parseInt(this.props.location.pathname.split("/")[3] , 10)
    
    // !!! OJO !!! TRAER TAMBIEN DE BASE DE DATOS LOS COMPUESTOS DEL MINERAL
    console.log(`----> localhost:4000/consultarLista/mineral`)
    axios.get('http://127.0.0.1:4000/consultarLista/mineral')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/mineral`)

        this.setState({
            minerales : res.data.rows
        })

        return (res.data.rows)
      })
      .then( (minerales) => {
            // MINERAL A MODIFICAR
            const mineral = minerales.find( m => m.m_id_mineral === id)
            this.setState({
                nuevo_mineral : { 
                    ...mineral,
                    "m_tipo" :  mineral.m_tipo,
                    "m_radioactivo" : !!mineral.m_radioactivo, 
                    "m_id_mineral" : id,
                    "m_fecha_nacionalizacion" : mineral.m_fecha_nacionalizacion ? mineral.m_fecha_nacionalizacion.split('T')[0] : "",
                    "m_descripcion" : mineral.m_descripcion || ""
                },
                compuestos : []
            })

            return mineral
      })
      .then( (mineral) => {
            console.log(`----> localhost:4000/consultarLista/mineral/hijos`)
            axios.post('http://127.0.0.1:4000/consultarLista/mineral/hijos',
                { m_id_mineral : mineral.m_id_mineral }
            )
            .then( (res) => {
                if(res.status === 200)
                console.log(`<---- (OK 200) localhost:4000/consultarLista/mineral/hijos`)
        
                this.setState({
                    compuestos : res.data.rows
                })
            })
            return mineral
      })
      .then( (mineral) => {
        console.log(`----> localhost:4000/consultarLista/mineral/posiblesHijos`)
        axios.post('http://127.0.0.1:4000/consultarLista/mineral/posiblesHijos',
            { m_id_mineral : mineral.m_id_mineral }
        )
        .then( (res) => {
            if(res.status === 200)
            console.log(`<---- (OK 200) localhost:4000/consultarLista/mineral/posiblesHijos`)
    
            this.setState({
                posiblesCompuestos : res.data.rows
            })
        })
      })
  }

  handleBuscar  = ({target}) => {
    this.setState({
        textoBuscardor : target.value,
    })
  }

  handleOpenModal = () => {
    this.setState({
        openComponer : true
    })
  }

  handleCloseModal = () => {
    this.setState({
        openComponer: null
    })
  }
  
  handleOkComponer = (idCompuesto) => {
    this.handleCloseModal()

    this.setState( (prev) => ({
        compuestos : [
            ...prev.compuestos,
            { ...this.state.minerales.find( m => m.m_id_mineral === idCompuesto) }
        ],
        modificado : true
    }))
  }

  handleDescomponer = (idDescomponer) => {
    const compuestosNuevo = this.state.compuestos.filter( (c) => c.m_id_mineral !== idDescomponer )
    this.setState({
        compuestos : compuestosNuevo,
        modificado : true
    })
  }

  handleGuardar = () => {
    const nuevo_mineral = {
        ...this.state.nuevo_mineral,
        compuestos: this.state.compuestos.map( c => ({
            "m_id_mineral" : c.m_id_mineral,
            "m_nombre" : c.m_nombre
          })),
        modificado : this.state.modificado
    };

    console.log(`----> localhost:4000/modificar/mineral/${nuevo_mineral.m_id_mineral}`)
    return axios.post('http://127.0.0.1:4000/modificar/mineral', 
        {
            ...nuevo_mineral
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/modificar/mineral/${nuevo_mineral.m_id_mineral}`)
            }
            return res
        }).catch( err => err)
  }

  goMineral = () => {
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
    if (target.name === "m_tipo")
        this.setState({
            nuevo_mineral : {
                ...this.state.nuevo_mineral,
                m_tipo : target.checked ? "metal" : "no metal"
            }
        })
    else
        this.setState({
            nuevo_mineral : {
                ...this.state.nuevo_mineral,
                [target.name] : target.checked
            }
        })
  }

  
  render = () => (
    <div>
        <MenuDashBoard title={`Editar Mineral: ${this.state.nuevo_mineral.m_nombre}`}/>

        <div>
            { this.state.nuevo_mineral &&
            <div className="CrearElemento">
                <div className="firstColumn">
                    <div className="mc-atributo">ID: </div>
                </div>
                <div className="secondColumn">
                    {this.state.nuevo_mineral.m_id_mineral.toString(10).padStart(4, '0')}
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">Nombre: </div>
                </div>
                <div className="secondColumn">
                    <InputText 
                            name="m_nombre"
                            id="CrearMineralNombre" 
                            label="Nombre"
                            onChange={this.handleChange}
                            value={this.state.nuevo_mineral.m_nombre}
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
                                name="m_tipo"
                                onChange={this.handleBool}
                                checked={this.state.nuevo_mineral.m_tipo === "metal" ? true : false}
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
                        value={this.state.nuevo_mineral.m_fecha_nacionalizacion}
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
                        value={this.state.nuevo_mineral.m_descripcion}
                    />
                </div>
                <div className="firstColumn">
                    <span className="mc-atributo">Compuesto de</span><span> : </span>
                    <img
                        src="../resources/icons/Agregar.png"
                        width="25px"
                        onClick={this.handleOpenModal}
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
                    
                    
    
            </div> }
            <GuardarCancelar 
                        position="center"
                        storeData={this.handleGuardar}
                        success={this.goMineral}
                        decline={this.goMineral}
                    />
            {this.state.goMineral && <Redirect push to="/mineral" /> }

            {this.state.compuestos &&
            <Modal 
                size="lg"
                show={this.state.openComponer} 
                onHide={this.handleCloseModal}
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
                                textAlign : "center"
                            }, 
                            },
                            {
                            title: 'Nombre', field: 'm_nombre', type: 'string',
                            cellStyle : {
                                fontSize : "large",
                                textAlign : "center"                    
                            },
                            },
                            {
                            title: '¿Metal?', field: 'm_tipo', type: 'string',
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
                                textAlign: "center"
                            },
                            }
                        ]}
                        data={cleanerMineral.limpiarLista( 
                                this.state.posiblesCompuestos.filter( 
                                    pc => !this.state.compuestos.find( c => c.m_id_mineral === pc.m_id_mineral)
                                )
                            )}
                        title={null}
                        
                        options={{
                            headerStyle: {
                                backgroundColor: '#0C5426',
                                color: "white",
                                fontSize: "large"
                            },
                            searchFieldAlignment: "left"
                        }}

                        onRowClick={(event, rowData) => this.handleOkComponer( Number.parseInt(rowData.m_id_mineral, 10) )}
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
            </Modal>}

        
      </div>
    </div>  
  )
}
