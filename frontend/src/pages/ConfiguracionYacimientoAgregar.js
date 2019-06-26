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
        ultimoRequisitoIndex : 0,
        ultimoFaseIndex : 0,
        prueba: 0,
        minerales : [],
        maquinas : [],
        cargos : [],
        nueva_configuracion_yacimiento : {
            y_id_yacimiento_configuracion : 0,
            y_nombre :"",
            y_capacidad_explotacion : 0,
            mineral_id : 0,
            unidad_id : 7
        },
        requisitos : [],
        etapas : []
      }
    }

    componentDidMount = () => {
        console.log(`----> localhost:4000/consultarLista/mineral `)
        axios.get('http://127.0.0.1:4000/consultarLista/mineral')
            .then( (res) => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/mineral`)
                    this.setState({
                        minerales : res.data.rows
                    })
                }else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultarLista/mineral`)
                }
            })
    }

    handleChange = (target) => {
        target=target.target||target;
        console.log(`requisito.${target.name} = ${target.value}`)
        this.setState({
            nueva_configuracion_yacimiento :{
                ...this.state.nueva_configuracion_yacimiento,
                [target.name] : target.value
            }
        })
    }

    handleChangeRequisitos = (event,index) => {
        console.log(event)
        console.log(index)
        const nuevosRequisitos = this.state.requisitos.map((req) => {
            if (req.m_id_mine_yaci === index){
                req.mineral_id = event.value
                req.m_nombre = event.text
            }
            return req
        })
        this.setState({
            requisitos : nuevosRequisitos
        })
    }

    prueba = (event) => {
        console.log(event)
    }

    handleChangeCantidadRequisito = (index,target) => {
        console.log(`modificando la cantidad`)
        const nuevosRequisitos = this.state.requisitos.map((req) => {
            if (req.m_id_mine_yaci === index){
                req.m_cantidad = target.value
            }
            return req
        })
        this.setState({
            requisitos : nuevosRequisitos
        })
    }
    
    handleAgregarRequisito = () => {
        console.log(`agregando requisi ${this.state.ultimoRequisitoIndex + 1} `)
        this.setState( (prev) => ({
            requisitos:[...prev.requisitos, {
                m_id_mine_yaci : prev.ultimoRequisitoIndex + 1,
                m_cantidad : null,
                mineral_id : 0,
                unidad_id : 7,
                m_nombre : null
            }],
            ultimoRequisitoIndex : prev.ultimoRequisitoIndex + 1
        }))
    }

    handleQuitarRequerimiento = (index) => {
        console.log(`quitando el requisito ${index} `)
        const requisitosNuevo = this.state.requisitos.filter( (r) => r.m_id_mine_yaci !== index)
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
             <MenuDashBoard title={"Crear Configuracion de Yacimiento"}/>

             <div>
                {/* sobre el mineral, debo agregar el fondo gris*/}
                <div className="info-mineral">
                    <h1 className = "subtitulo-centrado">Sobre el mineral</h1>
                    <div > 
                        <div className="horizontal ">
                            <div > {/*Todas las lineas de info */}
                                <div className="horizontal pegar-derecha"> {/* primera linea */}
                                    <p className="separador"> Mineral a explotar</p>
                                    <div className="ancho-mineral">
                                        <Dropdown id="MineralExplotar"
                                                name="mineral_id"
                                                retrieveData={this.handleChange}
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
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    
                                    <p className="separador"> de toneladas</p>
                                </div>
                                <p className = "subtitulo-centrado" > Minerales necesarios para su explotacion</p>
                                <div> {/*lista dinamica de minerales */}
                                    {
                                        this.state.requisitos.map(
                                            (requisito) => (
                                                <div className="horizontal pegar-derecha"> {/* primera linea */}
                                                    <div className="WideContainer" style={{justifyContent: "right", width: "30%"}}>
                                                        <i 
                                                            className="zmdi zmdi-close-circle-o LabelIcon"
                                                            onClick={() => this.handleQuitarRequerimiento(requisito.m_id_mine_yaci)}>
                                                        </i>
                                                    </div>
                                                    <div className="ancho-mineral">
                                                        <Select 
                                                                id={`MineralRequerido-${requisito.m_id_mine_yaci}s`}
                                                                name="m_id_mine_yaci"
                                                                placeholder="Mineral..."
                                                                value={requisito.mineral_id}
                                                                onChange={(event) => this.handleChangeRequisitos(event,requisito.m_id_mine_yaci)}
                                                                options={
                                                                    cleanerMineral.limpiarListaDropdown(
                                                                        this.state.minerales
                                                                    )
                                                                }
                                                        />
                                                    </div>
                                                    <div className="ancho-cantidad">
                                                        <InputText 
                                                            id={`CantidadRequerido-${requisito.m_id_mine_yaci}s`}
                                                            label="Cantidad"
                                                            type="number"
                                                            min="0"
                                                            name="y_capacidad_explotacion"
                                                            value={this.state.requisitos.find( r => r.m_id_mine_yaci === requisito.m_id_mine_yaci ).m_cantidad}
                                                            onChange={({target})=>this.handleChangeCantidadRequisito(requisito.m_id_mine_yaci, target)}
                                                        />
                                                    </div>
                                                    <p className="separador"> de toneladas</p>
                                                </div>
                                            )
                                        )
                                    }
                                    <div className="pegar-derecha">
                                        <div className="ButtonAddUser" onClick={this.handleAgregarRequisito} >
                                            Agregar Mineral Requerido
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="imagen-diamante">
                                <img 
                                    src="resources/img/Yacimiento_2.png"
                                    width="60%"
                                    style={{margin : "0 auto"}} 
                                />
                            </div>
                            
                        </div>  
                    </div>
                    
                </div>
                <div>
                    <h1 className = "subtitulo-centrado">Etapas</h1>
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
                        position="right"
                        storeData={this.handleGuardar}
                        success={this.goSolicitud}
                        decline={this.goSolicitud}
                    />
                </div>

             </div>
        </div>
    )
}