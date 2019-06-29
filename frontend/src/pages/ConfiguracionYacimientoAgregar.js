import React from 'react';
import axios from 'axios';

import {Button} from 'react-bootstrap';
import {Dropdown} from "../components/Dropdown";
import {DropdownV2} from "../components/DropdownV2"
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
        configuracion_yacimiento : {
            y_id_yacimiento_configuracion : 0,
            y_nombre :"",
            y_capacidad_explotacion : 0,
            mineral_id : 0,
            unidad_id : 7
        },
        requisitos : [],
        etapas : [{
            e_id_etapa_configuracion : 1,
            e_nombre: "",
            e_orden: 0,
            e_tipo: 0,
            ultimaFaseIndex : 1,
            fases : [{
                f_id_fase_configuracion : 0,
                f_nombre : "Fase por configurar",
                f_orden : 1,
                f_duracion : 0,
                f_descripcion : "",
                unidad_id : 7
            }]
        }],
        // PARA DAR IDs UNICOS
        ultimoRequisitoIndex : 0,
        ultimaEtapaIndex : 1,
        // PARA LOS DROPDOWNS
        minerales : []
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
        console.log(`configuracion_yacimiento.${target.name} = ${target.value}`)
        this.setState({
            configuracion_yacimiento :{
                ...this.state.configuracion_yacimiento,
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

    /* MINERALES REQUISITOS */
    agregarRequisito = () => {
        console.log(`new requisito = requisito[i:${this.state.requisitos.length+1} , id:${this.state.ultimoRequisitoIndex + 1}]`)
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
        console.log(`delete requisito[ id:${id} ]`)
        const requisitosNuevo = this.state.requisitos.filter( (r) => r.m_id_mine_yaci !== id)
        this.setState({
            requisitos : requisitosNuevo
        })
    }

    /* ETAPAS */
    agregarEtapa = () => {
        console.log(`new etapa = etapa[${this.state.ultimaEtapaIndex + 1}]`)
        this.setState( (prev) => ({
            etapas:[...prev.etapas, {
                e_id_etapa_configuracion : prev.ultimaEtapaIndex + 1,
                e_nombre: "",
                e_orden: 0,
                e_tipo: 0,
                ultimaFaseIndex : 1,
                fases : [{
                    f_id_fase_configuracion : 1,
                    f_nombre : "Fase por configurar",
                    f_orden : 1,
                    f_duracion : 0,
                    f_descripcion : "",
                    unidad_id : 7
                }]
            }],
            ultimaEtapaIndex : prev.ultimaEtapaIndex + 1
        }))
    }

    quitarEtapa = (id) => {
        console.log(`delete etapa[ id:${id} ]`)
        const etapasNuevo = this.state.etapas.filter( e => e.e_id_etapa_configuracion !== id)
        this.setState({
            etapas : etapasNuevo
        })
    }

    changeInfoEtapa = (opcion , id ) => {
        if (opcion.label) {
            console.log(`etapa[${id}].e_tipo <-- ${opcion.value} (${opcion.label})`)
            const nuevaEtapas = this.state.etapas.map( e => {
                if (e.e_id_etapa_configuracion === id){
                    e.e_tipo = opcion.value
                }
                return e
            })

            this.setState({
                etapas : nuevaEtapas
            })
        } else {
            console.log(`etapa[${id}].e_nombre <-- ${opcion.target.value}`)
            const nuevaEtapas = this.state.etapas.map( e => {
                if (e.e_id_etapa_configuracion === id){
                    e.e_nombre = opcion.target.value
                }
                return e
            })
            this.setState({
                etapas : nuevaEtapas
            })
        }
    }


    /* FASES DE LAS ETAPAS */
    changeInfoFase = () => {

    }

    agregarFase = (idEtapa) => {
        const etapa = this.state.etapas.find( e => e.e_id_etapa_configuracion === idEtapa )
        console.log(`etapa[ ${idEtapa} ] { new fase = fase[${etapa.ultimaFaseIndex + 1}] } `)
        
        const nuevaEtapas = this.state.etapas.map( e => {
            if (e.e_id_etapa_configuracion === idEtapa) {
                e.fases = [
                    ...e.fases,
                    {
                        f_id_fase_configuracion : e.ultimaFaseIndex +1,
                        f_nombre : `Fase por configurar`,
                        f_orden : 1,
                        f_duracion : 0,
                        f_descripcion : "",
                        unidad_id : 7
                    }
                ]

                e.ultimaFaseIndex = e.ultimaFaseIndex +1
            }
                return e
            
        })
        this.setState( (prev) => ({
            ...prev,
            etapas : nuevaEtapas
        }))
    }

    quitarFase = (idEtapa, idFase) => {
        console.log(`etapa[ ${idEtapa} ] { delete fase = fase[${idFase}] } `)
        const nuevaEtapas = this.state.etapas.map( e => {
            if (e.e_id_etapa_configuracion === idEtapa) {
                e.fases = e.fases.filter( f => f.f_id_fase_configuracion !== idFase)
            }
                return e
            
        })
        this.setState( (prev) => ({
            ...prev,
            etapas : nuevaEtapas
        }))
    }


    render = () => {
        // PARA NO ESCRIBIR THIS.STATE MUCHAS VECES
        const {
            configuracion_yacimiento , requisitos, etapas, fases, minerales, maquinas, cargos
        } = this.state
    
    
        return (
        <div>   
             <MenuDashBoard title={"Crear Configuración de Yacimiento"}/>

             <div>
                <div className="SobreMineral">
                    <h1 className="subtitulo-centrado">Sobre el mineral</h1>
                    <div> 
                        <div className="horizontal">
                            <div className="confYacimientoIzq">
                                <InputText 
                                    id={`NombreConfiguracion`}
                                    label="Nombre de Configuración"
                                    name="y_nombre"
                                    onChange={this.changeInfo}
                                />
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
                                            min="1" 
                                            label="Cantidad"
                                            name="y_capacidad_explotacion"
                                            onChange={this.changeInfo}
                                        />
                                    </div>
                                    <p className="separador"> toneladas</p>
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
                                                        <DropdownV2
                                                            placeholder="Mineral ..."
                                                            value={
                                                                requisito.m_id_mineral
                                                            }
                                                            onChange={ event => 
                                                                this.changeRequisito(event , requisito.m_id_mine_yaci)
                                                            }
                                                            options={
                                                                cleanerMineral.limpiarListaDropdown(
                                                                    minerales
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
                                                                requisito.m_cantidad
                                                            }
                                                            onChange={ event => 
                                                                this.changeRequisito(event , requisito.m_id_mine_yaci)
                                                            }
                                                        />
                                                    </div>
                                                    <p className="separador"> toneladas</p>
                                                </div>
                                            )
                                        )
                                    }
                                    <div className="btnAgregarRequisito" onClick={this.agregarRequisito} >
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
                        {/* ETAPA CONFIGURACION */}
                        {
                            this.state.etapas.map(
                                (etapa, index) => (
                                    <EtapaConfiguracion

                                        /* INFO */
                                        key={etapa.e_id_etapa_configuracion}
                                        etapa_configuracion = {{
                                            ...this.state.etapas.find(e => e.e_id_etapa_configuracion === etapa.e_id_etapa_configuracion ),
                                            e_orden : index+1
                                        }}

                                        /* DROPDOWNs */
                                        maquinas={maquinas}
                                        cargos={cargos}

                                        /* METODOS */
                                        minerales={this.state.minerales}
                                        changeInfo={this.changeInfoEtapa}
                                        quitarEtapa={this.quitarEtapa}

                                        agregarFase={this.agregarFase}
                                        quitarFase={this.quitarFase}
                                    />
                                ))
                        }
                    </div>
                    <div>
                        <div className="btnAgregarEtapa" onClick={this.agregarEtapa} >
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
    )}
}