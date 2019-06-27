import React from 'react';
import axios from 'axios';

import {Button} from 'react-bootstrap';
import {Dropdown} from "../components/Dropdown";
import Select from 'react-select';
import {InputText} from "../components/InputText";
import {GuardarCancelar} from "../components/GuardarCancelar";
import {MenuDashBoard} from "../components/MenuDashBoard";
import {EtapaConfiguracion} from "../components/EtapaConfiguracion";

import {cleanerMineral} from "../utils/cleaner"

export class ConfiguracionYacimientoAgregar extends React.Component {
    constructor(props){
      super(props)
      
      this.state  = {
        // INFO DE CONF_YACIMIENTO 
        nueva_configuracion_yacimiento : {
            y_id_yacimiento_configuracion : 0,
            y_nombre :"",
            y_capacidad_explotacion : 0,
            mineral_id : 0,
            unidad_id : 7
        },
        requisitos : [],
        etapas : [],
        // PARA DAR IDs UNICOS
        ultimoRequisitoIndex : 0,
        ultimoFaseIndex : 0,
        // PARA LOS DROPDOWNS
        minerales : [],
        maquinas : [],
        cargos : []
      }
    }

    componentDidMount = () => {
        console.log(`----> localhost:4000/consultarLista/mineral `)
        axios.get('http://127.0.0.1:4000/consultarLista/mineral')
            .then( res => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/mineral`)
                    this.setState({
                        minerales : res.data.rows
                    })
                } else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultarLista/mineral`)
                }
            })
    }

    changeInfo = (target) => {
        target=target.target||target;
        console.log(`nueva_configuracion_yacimiento.${target.name} = ${target.value}`)
        this.setState({
            nueva_configuracion_yacimiento :{
                ...this.state.nueva_configuracion_yacimiento,
                [target.name] : target.value
            }
        })
    }

    changeRequisito = (opcion , id) => {
        if (opcion.label) {
            console.log(`requisito[${id}].mineral_id <-- ${opcion.value} (${opcion.label})`)
            const nuevosRequisitos = this.state.requisitos.map( req => {
                    if (req.m_id_mine_yaci === id){
                        req.mineral_id = opcion.value
                    }
                    return req
                })
            this.setState({
                requisitos : nuevosRequisitos
            })
        } else {
            console.log(`requisito[${id}].m_cantidad <-- ${opcion.target.value}`)
            const nuevosRequisitos = this.state.requisitos.map( req => {
                if (req.m_id_mine_yaci === id){
                    req.m_cantidad = opcion.target.value
                }
                return req
            })
            this.setState({
                requisitos : nuevosRequisitos
            })
        }
        
    }
    
    agregarRequisito = () => {
        console.log(`new requisito = requisito[${this.state.ultimoRequisitoIndex + 1}]`)
        this.setState( (prev) => ({
            requisitos:[
                ...prev.requisitos, 
                {
                    m_id_mine_yaci : prev.ultimoRequisitoIndex + 1,
                    m_cantidad : null,
                    mineral_id : 0,
                    unidad_id : 7,
                    m_nombre : null
                }
            ],
            ultimoRequisitoIndex : prev.ultimoRequisitoIndex + 1
        }))
    }

    quitarRequisito = (id) => {
        console.log(`delete requisito[${id}]`)
        const requisitosNuevo = this.state.requisitos.filter( (r) => r.m_id_mine_yaci !== id)
        this.setState({
            requisitos : requisitosNuevo
        })
    }

    handleAgregarEtapa = () => {
        this.setState( (prev) => ({
            etapas:[...prev.etapas, {
                e_id_etapa_configuracion : prev.ultimoFaseIndex + 1,
                e_nombre: "",
                e_orden: 0,
                e_tipo: ""
            }],
            ultimoFaseIndex : prev.ultimoFaseIndex + 1
        }))
    }

    buscarNombreMineral = (idMineral) => {
        let mineral = this.state.minerales.find( m => m.m_id_mineral === idMineral)
        console.log(mineral)
        return mineral? mineral.m_nombre : ""
    }

    render = () => (
        <div>   
             <MenuDashBoard title={"Crear Configuración de Yacimiento"}/>

             <div>
                <div className="SobreMineral">
                    <h1 className="subtitulo-centrado">Sobre el mineral</h1>
                    <div > 
                        <div className="horizontal">
                            <div>
                                <div className="horizontal pegar-derecha">
                                    <p className="separador"> Mineral a explotar</p>
                                    <div className="ancho-mineral">
                                        <Dropdown id="MineralExplotar"
                                                name="mineral_id"
                                                retrieveData={this.changeInfo}
                                                placeholder="Mineral..."
                                                options={
                                                    cleanerMineral.limpiarListaDropdown(
                                                        this.state.minerales
                                                    )
                                                }
                                        />
                                    </div>
                                    <div className="ancho-cantidad">
                                        <InputText 
                                            id="CantidadExplotar"
                                            type="number"
                                            min="0" 
                                            label="Cantidad"
                                            name="y_capacidad_explotacion"
                                            onChange={this.changeInfo}
                                        />
                                    </div>
                                    <p className="separador"> de toneladas</p>
                                </div>
                                <p className="subtitulo-centrado" > Minerales necesarios para su explotacion</p>
                                <div> {/* MAPING DE REQUISITOS */}
                                    {
                                        this.state.requisitos.map(
                                            (requisito) => (
                                                <div key={requisito.m_id_mine_yaci} className="horizontal pegar-derecha"> {/* primera linea */}
                                                    <div className="ancho-cantidad">
                                                        <i 
                                                            className="zmdi zmdi-close-circle-o LabelIcon pegar-derecha"
                                                            onClick={() => this.quitarRequisito(requisito.m_id_mine_yaci)}>
                                                        </i>
                                                    </div>
                                                    <div className="ancho-mineral">
                                                        <Select
                                                                placeholder="Mineral ..."
                                                                value={
                                                                    this.state.requisitos.find( r => r.m_id_mine_yaci === requisito.m_id_mine_yaci ).m_id_mineral
                                                                }
                                                                onChange={ event => 
                                                                    this.changeRequisito(event , requisito.m_id_mine_yaci)
                                                                }
                                                                options={
                                                                    cleanerMineral.limpiarListaDropdown(
                                                                        this.state.minerales
                                                                    )
                                                                }
                                                        />
                                                    </div>
                                                    <div className="ancho-cantidad">
                                                        <InputText 
                                                            id={`CantidadRequesito_${requisito.m_id_mine_yaci}_`}
                                                            label="Cantidad"
                                                            type="number"
                                                            min="0"
                                                            name="y_capacidad_explotacion"
                                                            value={
                                                                this.state.requisitos.find( r => r.m_id_mine_yaci === requisito.m_id_mine_yaci ).m_cantidad
                                                            }
                                                            onChange={ event => 
                                                                this.changeRequisito(event , requisito.m_id_mine_yaci)
                                                            }
                                                        />
                                                    </div>
                                                    <p className="separador"> de toneladas</p>
                                                </div>
                                            )
                                        )
                                    }
                                    <div className="AgregarRequisito" onClick={this.agregarRequisito} >
                                        Agregar Mineral Requerido
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="imagen-diamante">
                                <img 
                                    src="resources/img/Yacimiento_2.png"
                                    width="200px"
                                />
                            </div>
                            
                        </div>  
                    </div>
                    
                </div>
                <div>
                    <h1 className="subtitulo-centrado">Etapas</h1>
                    <div>
                        {/**Aqui van todas las etapas */}
                        {
                            this.state.etapas.map(
                                (requisito, index) => (
                                    <EtapaConfiguracion/>
                                ))
                        }
                    </div>
                    <div>
                        <div className="ButtonAddUser" onClick={this.handleAgregarEtapa} >
                            Agregar Etapa
                        </div>
                    </div>
                </div>
                <div>
                    <GuardarCancelar
                        position="center"
                        storeData={this.handleGuardar}
                        success={this.goSolicitud}
                        decline={this.goSolicitud}
                    />
                </div>

             </div>
        </div>
    )
}