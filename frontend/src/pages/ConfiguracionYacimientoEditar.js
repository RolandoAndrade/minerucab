import React from 'react';
import axios from 'axios';

import {Button, Modal} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

import {Dropdown} from "../components/Dropdown";
import {DropdownV2} from "../components/DropdownV2"
import {InputText} from "../components/InputText";
import {GuardarCancelar} from "../components/GuardarCancelar";
import {MenuDashBoard} from "../components/MenuDashBoard";
import {EtapaConfiguracion} from "../components/EtapaConfiguracion";

import {cleanerMineral, cleanerCargo, cleanerMaquinaria} from "../utils/cleaner"

export class ConfiguracionYacimientoEditar extends React.Component {
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
            e_orden: 1,
            e_tipo: 0,
            ultimaFaseIndex : 1,
            fases : [{
                f_id_fase_configuracion : 1,
                f_nombre : "Fase por configurar",
                f_orden : 1,
                f_duracion : null,
                f_descripcion : "",
                unidad_id : 7,
                ultimoCargoIndex : 1,
                ultimaMaquinariaIndex :0,
                cargos : [{
                    f_id_fase_cargo : 1,
                    c_id_cargo : 0,
                    f_cantidad : null,
                }],
                maquinarias : []
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
        const id = Number.parseInt(this.props.location.pathname.split("/")[3] , 10)

        
        
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
        .then( () => {
            console.log(`----> localhost:4000/consultarLista/cargo `)
            axios.get('http://127.0.0.1:4000/consultarLista/cargo')
                .then( res => {
                    if(res.status === 200) {
                        console.log(`<---- (OK 200) localhost:4000/consultarLista/cargo`)
                        this.setState({
                            cargos : res.data.rows
                        })
                    } else {
                        console.log(`<---- (ERROR 500) localhost:4000/consultarLista/cargo`)
                    }
                })
        })
        .then( () => {
            console.log(`----> localhost:4000/consultarLista/maquinaria `)
            axios.get('http://127.0.0.1:4000/consultarLista/maquinaria')
                .then( res => {
                    if(res.status === 200) {
                        console.log(`<---- (OK 200) localhost:4000/consultarLista/maquinaria`)
                        this.setState({
                            maquinarias : res.data.rows
                        })
                    } else {
                        console.log(`<---- (ERROR 500) localhost:4000/consultarLista/maquinaria`)
                    }
                })
        })
        .then( () => {
            console.log(`----> localhost:4000/consultar/detalle_yacimiento_configuracion/${id} `)
            axios.post('http://127.0.0.1:4000/consultar/detalle_yacimiento_configuracion/',
                { y_id_yacimiento_configuracion : id }                
            )
            .then( res => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultar/detalle_yacimiento_configuracion/${id}`)
                    this.setState({
                        configuracionBD : res.data.yacimiento_configuracion
                    })

                    return res.data.yacimiento_configuracion
                } else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultar/detalle_yacimiento_configuracion/${id}`)
                }
            })
            .then( cBD => {
                // VACIAR INFO DE LA BD EN LOS INPUTS

                this.setState({
                    // INFO DE CONF_YACIMIENTO 
                    configuracion_yacimiento : {
                        y_id_yacimiento_configuracion : cBD.y_id_yacimiento_configuracion,
                        y_nombre : cBD.y_nombre,
                        y_capacidad_explotacion : cBD.y_capacidad_explotacion,
                        mineral_id : cBD.mineral_id,
                        unidad_id : 7
                    },
                    requisitos : cBD.requisitos.map( requisito => {
                        requisito["m_id_mineral"] = requisito.mineral_id
                        return requisito
                    } ),
                    etapas : cBD.etapas.map( etapa => {
                        etapa.e_orden = etapa.e_orden.toString() 
                        etapa.e_tipo = etapa.e_tipo === "explotacion" ? 1 : 2
                        etapa["ultimaFaseIndex"] = 500
                        etapa.fases = etapa.fases.map( fase => {
                            fase.f_orden = fase.f_orden.toString()
                            fase.f_duracion = fase.f_duracion.toString()
                            fase["ultimoCargoIndex"] = 500
                            fase.cargos = fase.cargos.map( cargo => {
                                cargo.f_cantidad = cargo.f_cantidad.toString()
                                return cargo
                            })

                            fase["ultimaMaquinariaIndex"] = 500
                            fase.maquinarias = fase.maquinarias.map( maquinaria => {
                                maquinaria.f_cantidad = maquinaria.f_cantidad.toString()
                                return maquinaria
                            })
                            return fase
                        })
                        return etapa
                    }), 
                    no_modificable : cBD.no_modificable,
                    // PARA DAR IDs UNICOS
                    ultimoRequisitoIndex : 500,
                    ultimaEtapaIndex : 500,
                  })

            })
        })
    }


    changeInfo = (target) => {
        if (target.label) {
            console.log(`configuracion_yacimiento.mineral_id <-- ${target.value} (${target.label})`)
            this.setState({
                configuracion_yacimiento : {
                    ...this.state.configuracion_yacimiento,
                    mineral_id : target.value
                }
            })
        } else {
            target=target.target||target;
            console.log(`configuracion_yacimiento.${target.name} = ${target.value}`)
            this.setState({
                configuracion_yacimiento :{
                    ...this.state.configuracion_yacimiento,
                    [target.name] : target.value
                }
            })
        }
    }

    changeRequisito = (opcion , id) => {
        if (opcion.label) {
            console.log(`requisito[ ${id} ].mineral_id <-- ${opcion.value} (${opcion.label})`)
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
            console.log(`requisito[ ${id} ].m_cantidad <-- ${opcion.target.value}`)
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
        console.log(`new requisito = requisito[ ${this.state.ultimoRequisitoIndex + 1} ]`)
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
        console.log(`delete requisito[ ${id} ]`)
        const requisitosNuevo = this.state.requisitos.filter( (r) => r.m_id_mine_yaci !== id)
        this.setState({
            requisitos : requisitosNuevo
        })
    }

    /* ETAPAS */
    agregarEtapa = () => {
        console.log(`new etapa = etapa [ ${this.state.ultimaEtapaIndex + 1} ]`)
        this.setState( (prev) => ({
            etapas:[...prev.etapas, {
                e_id_etapa_configuracion : prev.ultimaEtapaIndex + 1,
                e_nombre: "",
                e_orden: prev.etapas.length +1,
                e_tipo: 0,
                ultimaFaseIndex : 1,
                ultimaMaquinariaIndex : 0,
                fases : [{
                    f_id_fase_configuracion : 1,
                    f_nombre : "Fase por configurar",
                    f_orden : 1,
                    f_duracion : null,
                    f_descripcion : "",
                    unidad_id : 7,
                    ultimoCargoIndex : 1,
                    ultimaMaquinariaIndex :0,
                    cargos : [{
                        f_id_fase_cargo : 1,
                        c_id_cargo : 0,
                        f_cantidad : null,
                    }],
                    maquinarias : []
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
            console.log(`etapa[ ${id} ].e_tipo <-- ${opcion.value} (${opcion.label})`)
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
            console.log(`etapa[ ${id} ].${opcion.target.name} <-- ${opcion.target.value}`)
            const nuevaEtapas = this.state.etapas.map( e => {
                if (e.e_id_etapa_configuracion === id){
                    e[opcion.target.name] = opcion.target.value
                }
                return e
            })
            this.setState({
                etapas : nuevaEtapas
            })
        }
    }


    /* FASES DE LAS ETAPAS */
    agregarFase = (idEtapa) => {
        const etapa = this.state.etapas.find( e => e.e_id_etapa_configuracion === idEtapa )
        console.log(`etapa[ ${idEtapa} ] { new fase = fase[ ${etapa.ultimaFaseIndex + 1} ] } `)
        
        const nuevaEtapas = this.state.etapas.map( e => {
            if (e.e_id_etapa_configuracion === idEtapa) {
                e.fases = [
                    ...e.fases,
                    {
                        f_id_fase_configuracion : e.ultimaFaseIndex +1,
                        f_nombre : `Fase por configurar`,
                        f_orden : e.fases.length +1,
                        f_duracion : null,
                        f_descripcion : "",
                        unidad_id : 7,
                        ultimaMaquinariaIndex :0,
                        ultimoCargoIndex : 1,
                        cargos : [{
                            f_id_fase_cargo : 1,
                            c_id_cargo : 0,
                            f_cantidad : null,
                        }],
                        maquinarias : []
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
        console.log(`etapa[ ${idEtapa} ] { delete fase = fase[ ${idFase} ] } `)
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

    /* MODAL DE FASE DE UNA ETAPA */
    abrirFase = (idEtapa, idFase) => {
        console.log(`etapa[ ${idEtapa} ] { abrir modal fase[ ${idFase} ] } `)
        const etapa = this.state.etapas.find( e => e.e_id_etapa_configuracion === idEtapa )
        const fase = etapa.fases.find( f => f.f_id_fase_configuracion === idFase )
        this.setState({
            faseModal : {
                ...fase,
                etapa_configuracion_id : etapa.e_id_etapa_configuracion
            }
        })
    }

    changeInfoFase = (target) => {
        target=target.target||target;
        console.log(`faseModal.${target.name} = ${target.value}`)
        this.setState({
            faseModal :{
                ...this.state.faseModal,
                [target.name] : target.value
            }
        })
    }

    guardarFase = () => {
        const faseModal = this.state.faseModal
        console.log(`etapa[ ${faseModal.etapa_configuracion_id} ] { fase[ ${faseModal.f_id_fase_configuracion} ] = faseModal }`)

        const etapasNuevo = this.state.etapas.map( e => {
            if (e.e_id_etapa_configuracion === faseModal.etapa_configuracion_id )
                return ({
                    ...e,
                    fases : e.fases.map( f => {
                        if (f.f_id_fase_configuracion === faseModal.f_id_fase_configuracion)
                            return faseModal
                        else 
                            return f
                    })
                })
            else 
                return e
        })

        this.setState({
            etapas : etapasNuevo
        })

        this.cancelarFase();
    }

    cancelarFase = () => {
        this.setState({
            faseModal : null
        })
    }

    /* MANEJAR CARGOS DENTRO DEL MODAL DE FASE DE UNA ETAPA */
    changeCargo = (opcion , idCargo) => {
        if (opcion.label) {
            console.log(`faseModal.cargo[ ${idCargo} ].c_id_cargo <-- ${opcion.value} (${opcion.label})`)
            const nuevosCargos = this.state.faseModal.cargos.map( c => {
                    if (c.f_id_fase_cargo === idCargo){
                        c.c_id_cargo = opcion.value
                    }
                    return c
                })

            this.setState({
                faseModal : {
                    ...this.state.faseModal,
                    cargos : nuevosCargos
                }
            })

        } else {
            console.log(`faseModal.${opcion.target.name}[ ${idCargo} ].f_cantidad <-- ${opcion.target.value}`)
            const nuevosCargos = this.state.faseModal.cargos.map( c => {
                if (c.f_id_fase_cargo === idCargo){
                    c[opcion.target.name] = opcion.target.value
                }
                return c
            })
            
            this.setState({
                faseModal : {
                    ...this.state.faseModal,
                    cargos : nuevosCargos
                }
            })
        }
        
    }

    agregarCargo = () => {
        this.setState({
            faseModal : {
                ...this.state.faseModal,
                ultimoCargoIndex : this.state.faseModal.ultimoCargoIndex +1,
                cargos : [
                    ...this.state.faseModal.cargos,
                    {
                        f_id_fase_cargo : this.state.faseModal.ultimoCargoIndex +1,
                        c_id_cargo : 0,
                        f_cantidad : null,
                    }
                ]
            }
        })
    }

    quitarCargo = (idCargo) => {
        console.log(`faseModal.cargos { delete cargo[ ${idCargo} ] }`)
        const cargosNuevo = this.state.faseModal.cargos.filter( f => f.f_id_fase_cargo !== idCargo)
        const faseModal = this.state.faseModal
        this.setState({
            faseModal : {
                ...faseModal,
                cargos : cargosNuevo
            }
        })
    }

    /* MANEJAR MAQUINARIA DENTRO DEL MODAL DE FASE */

    changeMaquinaria = (opcion , idMaquinaria) => {
        if (opcion.label) {
            console.log(`faseModal.maquinaria[ ${idMaquinaria} ].m_id_maquinaria <-- ${opcion.value} (${opcion.label})`)
            const nuevasMaquinarias = this.state.faseModal.maquinarias.map( m => {
                    if (m.f_id_fase_maqu === idMaquinaria){
                        m.m_id_maquinaria = opcion.value
                    }
                    return m
                })

            this.setState({
                faseModal : {
                    ...this.state.faseModal,
                    maquinarias : nuevasMaquinarias
                }
            })

        } else {
            console.log(`faseModal.${opcion.target.name}[ ${idMaquinaria} ].f_cantidad <-- ${opcion.target.value}`)
            const nuevasMaquinarias = this.state.faseModal.maquinarias.map( m => {
                if (m.f_id_fase_maqu === idMaquinaria){
                    m[opcion.target.name] = opcion.target.value
                }
                return m
            })
            
            this.setState({
                faseModal : {
                    ...this.state.faseModal,
                    maquinarias : nuevasMaquinarias
                }
            })
        }
        
    }

    agregarMaquinaria = () => {
        this.setState({
            faseModal : {
                ...this.state.faseModal,
                ultimaMaquinariaIndex : this.state.faseModal.ultimaMaquinariaIndex +1,
                maquinarias : [
                    ...this.state.faseModal.maquinarias,
                    {
                        f_id_fase_maqu : this.state.faseModal.ultimaMaquinariaIndex +1,
                        f_cantidad : null,
                        m_id_maquinaria :0
                    }
                ]
            }
        })
    }

    quitarMaquinaria = (idMaquinaria) => {
        console.log(`faseModal.maquinarias { delete maquinaria[ ${idMaquinaria} ] }`)
        const maquinariasNuevo = this.state.faseModal.maquinarias.filter( m => m.f_id_fase_maqu !== idMaquinaria)
        const faseModal = this.state.faseModal
        this.setState({
            faseModal : {
                ...faseModal,
                maquinarias : maquinariasNuevo
            }
        })
    }

    /* MANEJAR EL GUARDADO EN LA BD */
    goConfiguracionYacimiento = () => {
        this.setState({
            goConfiguracionYacimiento : true
        })
    }

    guardarBD = () => {
        const supuestaEstapas = JSON.parse( JSON.stringify(this.state.etapas) )
        const nuevaEtapas = supuestaEstapas.map( e => {
            // ETAPA
            e.e_tipo = e.e_tipo !== 1 && e.e_tipo !==2 ? 0 :
                        e.e_tipo === 1 ? 'explotacion' : 'refinacion'
            e.e_orden = parseInt( e.e_orden )
            e.fases = e.fases.map( f => {
                // FASE
                f.f_orden = parseInt( f.f_orden )
                f.f_duracion = parseInt( f.f_duracion )
                f.cargos = f.cargos.map( c => {
                    // CARGO
                    f.f_cantidad = parseInt( f.f_cantidad )
                    return c
                })  

                f.maquinarias = f.maquinarias.map( m => {
                    // MAQUINARIA
                    m.f_cantidad = parseInt( m.f_cantidad )
                    return m
                })  
                return f
            })
            return e
        })

        const conf = this.state.configuracion_yacimiento

        console.log(`----> localhost:4000/modificar/yacimiento_configuracion`)
        return axios.post('http://127.0.0.1:4000/modificar/yacimiento_configuracion',
            {
                ...this.state.configuracion_yacimiento,
                y_capacidad_explotacion : parseFloat( conf.y_capacidad_explotacion ),
                etapas : nuevaEtapas,
                requisitos : this.state.requisitos
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/modificar/yacimiento_configuracion`)
                }
                return res
            }).catch( err => err)
    }

    render = () => {
        // PARA NO ESCRIBIR THIS.STATE MUCHAS VECES
        const {
            configuracion_yacimiento , requisitos, etapas, fases, minerales, maquinarias, cargos, faseModal, no_modificable
        } = this.state
    
    
        return (
        <div>   
             <MenuDashBoard title={"Modificar Configuración de Yacimiento"}/>

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
                                    value={configuracion_yacimiento.y_nombre}
                                    disabled={no_modificable}
                                    onChange={this.changeInfo}
                                />
                                <div className="horizontal pegar-derecha">
                                    <p className="separador"> Mineral a explotar</p>
                                    
                                    <div className="ancho-mineral">
                                        <DropdownV2
                                                name="mineral_id"
                                                isDisabled={no_modificable}
                                                onChange={this.changeInfo}
                                                placeholder="Mineral..."
                                                value={{
                                                    value: configuracion_yacimiento.mineral_id,
                                                    label: !!configuracion_yacimiento.mineral_id ? minerales.find( m => m.m_id_mineral === configuracion_yacimiento.mineral_id).m_nombre : "Mineral ..."
                                                }}
                                                options={
                                                    cleanerMineral.limpiarListaDropdown(
                                                        minerales.filter( m => 
                                                            !requisitos.find( r => r.mineral_id === m.m_id_mineral )
                                                        )
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
                                            value={configuracion_yacimiento.y_capacidad_explotacion}
                                            disabled={no_modificable}
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
                                                            onClick={() => { if (!no_modificable) this.quitarRequisito(requisito.m_id_mine_yaci)}}>
                                                        </i>
                                                    </div>
                                                    <div className="ancho-mineral">
                                                        <DropdownV2
                                                            placeholder="Mineral ..."
                                                            isDisabled={no_modificable}
                                                            onChange={ event => 
                                                                this.changeRequisito(event , requisito.m_id_mine_yaci)
                                                            }
                                                            value={{
                                                                value : requisito.m_id_mineral,
                                                                label: !!requisito.m_id_mineral ? minerales.find( r => r.m_id_mineral === requisito.m_id_mineral).m_nombre : "Mineral ..."
                                                            }}
                                                            options={
                                                                cleanerMineral.limpiarListaDropdown(
                                                                    minerales.filter( m => 
                                                                        !requisitos.find( r => r.mineral_id === m.m_id_mineral ) &&
                                                                        m.m_id_mineral !== configuracion_yacimiento.mineral_id
                                                                    )
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
                                                            disabled={no_modificable}
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
                                    <div className="btnAgregarRequisito" onClick={() => { if (!no_modificable) this.agregarRequisito}} >
                                        Agregar Mineral Requerido
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="imagen-diamante">
                                <img 
                                    src="resources/img/Proyecto_4.png"
                                    width="400px"
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
                                        }}

                                        /* DROPDOWNs */
                                        maquinarias={maquinarias}
                                        cargos={cargos}

                                        /* METODOS */
                                        minerales={this.state.minerales}
                                        changeInfo={this.changeInfoEtapa}
                                        quitarEtapa={this.quitarEtapa}

                                        agregarFase={this.agregarFase}
                                        quitarFase={this.quitarFase}

                                        abrirFase={this.abrirFase}
                                        no_modificable={no_modificable}
                                    />
                                ))
                        }
                    </div>
                    <div>
                        <div className="btnAgregarEtapa" onClick={()=> { if (!no_modificable)this.agregarEtapa}} >
                            Agregar Etapa
                        </div>
                    </div>
                </div>
                <div>
                    <GuardarCancelar
                        position="center"
                        storeData={this.guardarBD}
                        success={this.goConfiguracionYacimiento}
                        decline={this.goConfiguracionYacimiento}
                    />
                </div> 

                {this.state.goConfiguracionYacimiento && <Redirect to="/yacimiento-configuracion" /> }
                

                {!!this.state.faseModal && 
                <Modal 
                    size="lg"
                    show={!!this.state.faseModal} 
                    onHide={this.cancelarFase}
                    centered
                    scrollable
                    dialogClassName="ModalConsultar"
                >
                    <Modal.Header closeButton className="mc-header">
                        <div></div>
                        <h1>FASE</h1>
                    </Modal.Header>

                    <Modal.Body> 
                        <div className="faseModal">
                            <div className="fase-conf-izq">
                                <InputText 
                                    id={`NombreFase`}
                                    label="Nombre"
                                    name="f_nombre"
                                    value={faseModal.f_nombre}
                                    disabled={no_modificable}
                                    onChange={this.changeInfoFase}
                                />
                                <InputText 
                                    id={`DuracionFase`}
                                    type="number"
                                    min={1}
                                    label="Duracion en meses"
                                    name="f_duracion"
                                    value={faseModal.f_duracion}
                                    disabled={no_modificable}
                                    onChange={this.changeInfoFase}
                                />
                                <InputText 
                                    id={`DescripcionFase`}
                                    label="Descripción"
                                    name="f_descripcion"
                                    value={faseModal.f_descripcion}
                                    disabled={no_modificable}
                                    onChange={this.changeInfoFase}
                                />
                                <p className="subtitulo-centrado">Cargos</p>
                                <div> {/* MAPING DE CARGOS */}
                                    { this.state.cargos &&
                                        faseModal.cargos.map(
                                            (cargo) => (
                                                <div key={cargo.f_id_fase_cargo} className="cargoHorizontal">
                                                    <div>
                                                        <i 
                                                            className="zmdi zmdi-close-circle-o LabelIcon pegar-derecha"
                                                            onClick={() => { if (!no_modificable) this.quitarCargo(
                                                                cargo.f_id_fase_cargo
                                                            )}}
                                                        >
                                                        </i>
                                                    </div>
                                                    <div style={{width : "30%" }}>
                                                        <DropdownV2
                                                            placeholder="Cargo ..."
                                                            value={{
                                                                value: cargo.c_id_cargo,
                                                                label: !!cargo.c_id_cargo ? this.state.cargos.find( c => c.c_id_cargo === cargo.c_id_cargo).c_nombre : "Cargo ..."
                                                            }}
                                                            options={
                                                                cleanerCargo.limpiarListaDropdown(
                                                                    cargos.filter( c1 => 
                                                                        !faseModal.cargos.find( c2 => c2.c_id_cargo === c1.c_id_cargo )
                                                                    )
                                                                )
                                                            }
                                                            isDisabled={no_modificable}
                                                            onChange={ (event) =>
                                                                this.changeCargo(event, cargo.f_id_fase_cargo)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="ancho-cantidad">
                                                        <InputText 
                                                            id={`CantidadRequesito_${cargo.f_id_fase_cargo}_`}
                                                            label="Cantidad"
                                                            type="number"
                                                            min="0"
                                                            name="f_cantidad"
                                                            value={cargo.f_cantidad}
                                                            disabled={no_modificable}
                                                            onChange= { (event) =>
                                                                this.changeCargo(event, cargo.f_id_fase_cargo)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                    <div className="btnAgregarRequisito" onClick={ () => { if (!no_modificable) this.agregarCargo() }} >
                                        Agregar cargo
                                    </div>
                                    
                                </div>
                                <p className="subtitulo-centrado">Maquinarias</p>
                                <div> {/* MAPING DE MAQUINARIAS */}
                                    { this.state.maquinarias &&
                                        faseModal.maquinarias.map(
                                            (maquinaria) => (
                                                <div key={maquinaria.f_id_fase_maqu} className="cargoHorizontal">
                                                    <div>
                                                        <i 
                                                            className="zmdi zmdi-close-circle-o LabelIcon pegar-derecha"
                                                            onClick={() => { if (!no_modificable) this.quitarMaquinaria(
                                                                maquinaria.f_id_fase_maqu
                                                            )}}
                                                        >
                                                        </i>
                                                    </div>
                                                    <div style={{width : "30%" }}>
                                                        <DropdownV2
                                                            placeholder="Maquinaria ..."
                                                            value={{
                                                                value: maquinaria.m_id_maquinaria,
                                                                label: !!maquinaria.m_id_maquinaria ? maquinarias.find( m => m.m_id_maquinaria === maquinaria.m_id_maquinaria).m_nombre : "Maquinaria ..."
                                                            }}
                                                            options={
                                                                cleanerMaquinaria.limpiarListaDropdown(
                                                                    maquinarias.filter( c1 => 
                                                                        !faseModal.maquinarias.find( c2 => c2.m_id_maquinaria === c1.m_id_maquinaria )
                                                                    )
                                                                )
                                                            }
                                                            isDisabled={no_modificable}
                                                            onChange={ (event) =>
                                                                this.changeMaquinaria(event, maquinaria.f_id_fase_maqu)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="ancho-cantidad">
                                                        <InputText 
                                                            id={`CantidadMaquinaria_${maquinaria.f_id_fase_maqu}_`}
                                                            label="Cantidad"
                                                            type="number"
                                                            min="0"
                                                            name="f_cantidad"
                                                            value={maquinaria.f_cantidad}
                                                            disabled={no_modificable}
                                                            onChange= { (event) =>
                                                                this.changeMaquinaria(event, maquinaria.f_id_fase_maqu)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                    <div className="btnAgregarRequisito" onClick={() => { if (!no_modificable)this.agregarMaquinaria}} >
                                        Agregar maquinaria
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="fase-conf-der">
                                <input
                                    className="inputOrdenFase"
                                    name={"f_orden"}
                                    value={faseModal.f_orden}
                                    style={{fontSize : "100px"}}
                                    disabled={no_modificable}
                                    onChange={this.changeInfoFase}
                                />
                            </div>
                        </div>  
                            
                    </Modal.Body>
                    
                    <Modal.Footer className="mc-footer">
                    <Button variant="primary" className="mc-boton mc-boton-guardar" 
                        onClick={() => { if (!no_modificable) this.guardarFase(
                            faseModal.etapa_configuracion_id,
                            faseModal.f_id_fase_configuracion
                        )}}
                    >
                        Modificar
                    </Button>

                    <Button variant="secondary" className="mc-boton" 
                        onClick={this.cancelarFase}
                    >
                        Cancelar
                    </Button>
                    </Modal.Footer>
                </Modal>}

             </div>
        </div>
    )}
}