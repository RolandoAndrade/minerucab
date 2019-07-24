import React from 'react';
import axios from 'axios';

import {Button, Modal} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

import {Dropdown} from "../components/Dropdown";
import {DropdownV2} from "../components/DropdownV2"
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";
import {GuardarCancelar} from "../components/GuardarCancelar";
import {MenuDashBoard} from "../components/MenuDashBoard";
import {Etapa} from "../components/Etapa";

import { tengoPermiso } from "../utils/tengoPermiso"
import {    cleanerMineral, cleanerCargo, cleanerMaquinaria, 
            cleanerYacimiento, cleanerEmpleado, cleanerHorario, 
            cleanerEquipo
} from "../utils/cleaner"

export class ProyectoEditar extends React.Component {
    constructor(props){
      super(props)
      
      this.state  = {
        // INFO DE CONF_YACIMIENTO 
        configuracion_yacimiento : {
            y_id_yacimiento_configuracion : 0,
            y_nombre :"",
            y_capacidad_explotacion : 0,
            mineral_id : 0,
            unidad_id : 7,
            p_nombre : "",
            p_fecha_inicio : null
        },
        requisitos : [],
        etapas : [/*{
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
                empleados : [], 
                maquinarias : [],
                equipos : []
            }]
        }*/],
        // PARA DAR IDs UNICOS
        ultimoRequisitoIndex : 0,
        ultimaEtapaIndex : 1,
        // PARA LOS DROPDOWNS
        minerales : [],
        empleados : [],
        equipos : [],
        yacimientos : [],
        horarios : [],
        pedidos : []
      }
    }

    componentDidMount = () => {
        let promesas = []
        
        console.log(`----> localhost:4000/consultarLista/mineral `)
        promesas[0] = axios.get('http://127.0.0.1:4000/consultarLista/mineral')
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
            
            console.log(`----> localhost:4000/consultarLista/cargo `)
        promesas[1] = axios.get('http://127.0.0.1:4000/consultarLista/cargo')
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
                
                console.log(`----> localhost:4000/consultarLista/maquinaria `)
                promesas[2] = axios.get('http://127.0.0.1:4000/consultarLista/maquinaria')
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
            
            console.log(`----> localhost:4000/consultarLista/empleado `)
            promesas[3] = axios.get('http://127.0.0.1:4000/consultarLista/empleado')
            .then( res => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/empleado`)
                    this.setState({
                        empleados : res.data.rows
                    })
                } else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultarLista/empleado`)
                }
            })
            
            console.log(`----> localhost:4000/consultarLista/yacimiento `)
            promesas[4] = axios.get('http://127.0.0.1:4000/consultarLista/yacimiento')
            .then( res => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/yacimiento`)
                    this.setState({
                        yacimientos : res.data.rows
                    })
                } else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultarLista/yacimiento`)
                }
            })

            console.log(`----> localhost:4000/consultarLista/horario_v2 `)
            promesas[5] = axios.get('http://127.0.0.1:4000/consultarLista/horario_v2')
            .then( res => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/horario_v2`)
                    this.setState({
                        horarios : res.data.rows
                    })
                } else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultarLista/horario_v2`)
                }
            })
            
            console.log(`----> localhost:4000/consultarLista/pedido `)
            promesas[6] = axios.get('http://127.0.0.1:4000/consultarLista/pedido')
            .then( res => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/pedido`)
                    this.setState({
                        pedidos : res.data.rows
                    })
                } else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultarLista/pedido`)
                }
            })
            
            console.log(`----> localhost:4000/consultarLista/equipo `)
            promesas[7] = axios.get('http://127.0.0.1:4000/consultarLista/equipo')
            .then( res => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/equipo`)
                    this.setState({
                        equipos : res.data.rows
                    })
                } else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultarLista/equipo`)
                }
            })
            
            
            let id = parseInt(this.props.location.pathname.split("/")[3] , 10)
            console.log(id)

            console.log(`----> localhost:4000/consultar/detalle_proyecto `)
            promesas[8] = axios.post('http://127.0.0.1:4000/consultar/detalle_proyecto',
                { p_id_proyecto : id }
            )
            .then( res => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultar/detalle_proyecto`)
                    let pBD = res.data.proyecto
                    
                    // SEGUNDA PETICIONS CSM
                    console.log(`----> localhost:4000/consultar/detalle_yacimiento_configuracion/${pBD.etapas[0].yacimiento_configuracion_id} `)
                    axios.post('http://127.0.0.1:4000/consultar/detalle_yacimiento_configuracion/',
                    { y_id_yacimiento_configuracion : pBD.etapas[0].yacimiento_configuracion_id } 
                    )
                    .then( res => {
                        if(res.status === 200) {
                            console.log(`<---- (OK 200) localhost:4000/consultar/detalle_yacimiento_configuracion/${pBD.etapas[0].yacimiento_configuracion_id}`)
                            return res.data.yacimiento_configuracion
                        } else {
                            console.log(`<---- (ERROR 500) localhost:4000/consultar/detalle_yacimiento_configuracion/${pBD.etapas[0].yacimiento_configuracion_id}`)
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
                                unidad_id : 7,

                                p_nombre : pBD.p_nombre,
                                p_id_proyecto : pBD.p_id_proyecto,
                                estado : pBD.estado,
                                estado_id : pBD.estado_id,
                                p_fecha_inicio : pBD.p_fecha_inicio.split('T')[0],
                                pedido_id : pBD.pedido_id,
                                yacimiento_id : pBD.yacimiento_id
                            },
                            requisitos : cBD.requisitos.map( requisito => {
                                requisito["m_id_mineral"] = requisito.mineral_id
                                return requisito
                            } ),
                            etapas : cBD.etapas.map( etapa => {
                                let etapa2 = pBD.etapas.find( e2 => e2.etapa_configuracion_id === etapa.e_id_etapa_configuracion )
                                etapa.e_orden = etapa.e_orden.toString() 
                                etapa.e_tipo = etapa.e_tipo === "explotacion" ? 1 : 2
                                etapa["ultimaFaseIndex"] = 500
                                let i = 1;
                                let j = 1;

                                etapa["e_fecha_inicio"] = !!etapa2.e_fecha_inicio ? etapa2.e_fecha_inicio.split('T')[0] : null
                                etapa["estado_id"] =  etapa2.estado_id
                                    etapa["estado"] =  etapa2.estado_id === 3 ? "pendiente" :
                                                        etapa2.estado_id === 8 ? "activa" : "finalizada"
                                    etapa["e_id_etapa"] =  etapa2.e_id_etapa

                                etapa.fases = etapa.fases.map( fase => {
                                    let fase2 = etapa2.fases.find( f2 => f2.fase_configuracion_id === fase.f_id_fase_configuracion )
                                    fase["f_fecha_inicio"] = fase2.f_fecha_inicio ? fase2.f_fecha_inicio.split('T')[0] : null
                                    fase["f_fecha_fin"] = fase2.f_fecha_fin ? fase2.f_fecha_fin.split('T')[0] : null
                                    fase["estado_id"] =  fase2.estado_id
                                    fase["estado"] =  fase2.estado_id === 3 ? "pendiente" :
                                                        fase2.estado_id === 8 ? "activa" : "finalizada"
                                    fase["f_id_fase"] =  fase2.f_id_fase

                                    fase["empleados"] = fase2.empleados ? fase2.empleados.map( empleado => {
                                        empleado["f_salario"] = !!empleado.f_salario && empleado.f_salario.toString()
                                        empleado["f_viatico"] = !!empleado.f_viatico && empleado.f_viatico.toString()
                                        empleado["cargo_id"] = empleado.c_id_cargo
                                        empleado["idEspecial"] = i
                                        i++
                                        return empleado
                                    }) : []
                                    /*
                                    fase.maquinarias = fase.maquinarias ? fase.maquinarias.map( maquinaria => {
                                        maquinaria.f_cantidad = maquinaria.f_cantidad.toString()
                                        return maquinaria
                                    }) : []

                                    fase.maquinarias = fase.maquinarias ? fase.maquinarias.map( maquinaria => {
                                        maquinaria.f_cantidad = maquinaria.f_cantidad.toString()
                                        return maquinaria
                                    }) : []*/

                                    fase.f_orden = fase.f_orden.toString()
                                    fase.f_duracion = fase.f_duracion.toString()
                                    fase["ultimoCargoIndex"] = 500
                                    fase.cargos = fase.cargos.map( cargo => {
                                        cargo.f_cantidad = cargo.f_cantidad.toString()
                                        return cargo
                                    })
                                    fase["ultimaMaquinariaIndex"] = 500
                                    fase.maquinarias = fase.maquinarias ? fase.maquinarias.map( maquinaria => {
                                        maquinaria.f_cantidad = maquinaria.f_cantidad.toString()
                                        return maquinaria
                                    }) : []
                                    fase["equipos"] = fase2.equipos ? fase2.equipos.map( equipo => {
                                        equipo["f_costo_alquiler"] = equipo.f_costo_alquiler
                                        equipo["maquinaria_id"] = equipo.m_id_maquinaria
                                        equipo["idEspecial"] = j
                                        j++
                                        return equipo
                                    }) : []
                                    return fase
                                })

                                return etapa
                            }), 
                            no_modificable : cBD.no_modificable,
                            // PARA DAR IDs UNICOS
                            ultimoRequisitoIndex : 500,
                            ultimaEtapaIndex : 500,
                        },
                            () => {
                                let empleadosOriginales = []
                                let equiposOriginales = []

                                this.state.etapas.forEach(e => {
                                    e.fases.forEach( f => {
                                        f.empleados.forEach( emp => {
                                            empleadosOriginales.push(emp)
                                        })
                                        if (f.equipos)
                                          f.equipos.forEach( equi => {
                                            equiposOriginales.push(equi)
                                          })  
                                    })
                                })
                                    
                                this.setState({
                                    empleadosOriginales,
                                    equiposOriginales,
                                    empleados : [ 
                                        ...empleadosOriginales, 
                                        ...this.state.empleados.filter( e => e.estado_id === 11) 
                                    ],
                                    equipos :  [ 
                                        ...equiposOriginales, 
                                        ...this.state.equipos.filter( e => e.estado_id === 11) 
                                    ]
                                })
                                
                            }
                        )

                    })
                      
                } else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultar/detalle_proyecto`)
                }
            })

        Promise.all( promesas )
    }

    changeInfo = (target) => {
        if (target.label) {
            // PEDIR CONFIGURACION DEL YACIMIENTO
            const idConf = this.state.yacimientos.find( y => y.y_id_yacimiento === target.value).yacimiento_configuracion_id
            axios.post('http://127.0.0.1:4000/consultar/detalle_yacimiento_configuracion',
                { y_id_yacimiento_configuracion : idConf }
            )
            .then( res => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultar/detalle_yacimiento_configuracion`)
                    console.log(`configuracion_yacimiento.yacimiento_id <-- ${target.value} (${target.label})`)
                    
                    this.setState({
                        configuracion_yacimiento : {
                            ...res.data.yacimiento_configuracion,
                            yacimiento_id : target.value
                        },
                        etapas : res.data.yacimiento_configuracion.etapas.map( etapa => ({
                            ...etapa,
                            fases : etapa.fases.map( fase => {
                                
                                let empleadosNuevo = []
                                let id1 = 0
                                fase.cargos.map( cargo => {
                                    let i = 0;
                                    
                                    while( i < cargo.f_cantidad ){
                                        id1 = id1 +1
                                        i = i +1
                                        empleadosNuevo = [
                                            ...empleadosNuevo,
                                            {
                                                idEspecial:  id1,
                                                e_id_empleado : 0,
                                                horario_id : 0,
                                                f_salario : null,
                                                f_viatico : null,
                                                e_nombre : 0,
                                                c_id_cargo : cargo.c_id_cargo,
                                                cargo_id : cargo.c_id_cargo
                                            }
                                        ]
                                    }
                                    return empleadosNuevo
                                    
                                })

                                let equiposNuevo = []
                                let id2 = 0
                                fase.maquinarias.map( maquinaria => {
                                    let i = 0;
                                    
                                    while( i < maquinaria.f_cantidad ){
                                        id2 = id2 +1
                                        i = i +1
                                        equiposNuevo = [
                                            ...equiposNuevo,
                                            {
                                                idEspecial:  id2,
                                                e_id_equipo : 0,
                                                f_salario : null,
                                                f_viatico : null,
                                                e_nombre : 0,
                                                m_id_maquinaria : maquinaria.m_id_maquinaria,
                                                maquinaria_id : maquinaria.m_id_maquinaria
                                            }
                                        ]
                                    }
                                    return equiposNuevo
                                    
                                })

                                return ({
                                    ...fase,
                                    lastEmpleadoIndex : id1,
                                    lastEmpleadoIndex : id2,
                                    empleados : empleadosNuevo,
                                    equipos : equiposNuevo
                                })
                            }) 
                        })),
                        requisitos : res.data.yacimiento_configuracion.requisitos
                    })
                } else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultar/detalle_yacimiento_configuracion`)
                }
            })
            
            
        } else {
            console.log(`configuracion_yacimiento.${target.name || target.target.name} = ${target.value || target.target.value}`)
            this.setState({
                configuracion_yacimiento :{
                    ...this.state.configuracion_yacimiento,
                    [target.name || target.target.name] : target.value || target.target.value
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
    changeEmpleado = (opcion , idEmpleado) => {
        if (opcion.label) {
            console.log(`faseModal.empleado[ ${idEmpleado} ].${opcion.name} <-- ${opcion.value} (${opcion.label})`)
            const nuevosEmpleados = this.state.faseModal.empleados.map( e => {
                if (e.idEspecial === idEmpleado){
                    return ({
                        ...e,
                        [opcion.name] : opcion.value   
                    })
                } else
                    return e
                })

            this.setState({
                faseModal : {
                    ...this.state.faseModal,
                    empleados : nuevosEmpleados
                }
            })

        } else {
            console.log(`faseModal.empleado[ ${idEmpleado} ].${opcion.target.name} <-- ${opcion.target.value}`)
            const nuevosEmpleados = this.state.faseModal.empleados.map( e => {
                if (e.idEspecial === idEmpleado){
                    return ({
                        ...e,
                        [opcion.target.name] : opcion.target.value   
                    })
                } else
                    return e
            })
            
            this.setState({
                faseModal : {
                    ...this.state.faseModal,
                    empleados : nuevosEmpleados
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

    changeEquipo = (opcion , idEquipo) => {
        if (opcion.label) {
            console.log(`faseModal.equipo[ ${idEquipo} ].${opcion.name} <-- ${opcion.value} (${opcion.label})`)
            const nuevosEquipo = this.state.faseModal.equipos.map( e => {
                    if (e.idEspecial === idEquipo){
                        return ({
                            ...e,
                            [opcion.name] : opcion.value   
                        })
                    } else
                        return e
                    })

            this.setState({
                faseModal : {
                    ...this.state.faseModal,
                    equipos : nuevosEquipo
                }
            })

        } else {
            console.log(`faseModal.equipo[ ${idEquipo} ].${opcion.target.name} <-- ${opcion.target.value}`)
            const nuevosEquipo = this.state.faseModal.equipos.map( e => {
                if (e.idEspecial === idEquipo){
                    return ({
                        ...e,
                        [opcion.target.name] : opcion.target.value   
                    })
                } else
                    return e
                })
            
            this.setState({
                faseModal : {
                    ...this.state.faseModal,
                    equipos : nuevosEquipo
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

    // MANEJO DE ESTADOS -- GESTION DEL PROYECTO
    solicitarRecursos = () => {
        console.log(`----> solicitarRecursos : localhost:4000/iniciar/proyecto`)
        
        return axios.post('http://127.0.0.1:4000/iniciar/proyecto',
            {
                p_id_proyecto : this.state.configuracion_yacimiento.p_id_proyecto,
                requisitos : this.state.requisitos.map( r => ({
                    ...r,
                    m_cantidad : parseInt( r.m_cantidad )
                }))
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/iniciar/proyecto`)
                    location.reload()
                }
                return res
            }).catch( err => err)

    }

    activarProyecto = () => {
        console.log(`----> activarProyecto : localhost:4000/activar/proyecto`)
        return axios.post('http://127.0.0.1:4000/activar/proyecto',
            {
                p_id_proyecto : this.state.configuracion_yacimiento.p_id_proyecto,
                p_fecha_inicio : this.state.configuracion_yacimiento.p_fecha_inicio,
                requisitos : this.state.requisitos.map( r => ({
                    ...r,
                    m_cantidad : parseInt( r.m_cantidad )
                }))
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/activar/proyecto`)
                    location.reload()
                }
                return res
            }).catch( err => err)
    }

    activarFase = (idFase) => {
        // F   ( 3 pendiente -> 8 activa -> 10 finalizada)
        const faseModal = this.state.faseModal
        console.log(`----> activarFase : localhost:4000/activar/fase`)
        return axios.post('http://127.0.0.1:4000/activar/fase',
            {
                f_id_fase : idFase,
                f_fecha_inicio : faseModal.f_fecha_inicio,
                f_fecha_fin : faseModal.f_fecha_fin,
                e_fecha_inicio : this.state.etapas.find( e => 
                    e.fases.find( f => 
                        f.f_id_fase === faseModal.f_id_fase
                    )
                ).e_fecha_inicio
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/activar/fase`)
                    this.setState({
                        faseModal : {
                            ...this.state.faseModal,
                            estado_id : 8,
                            estado : "activo"
                        }
                    },
                        () => this.guardarFase()
                    )
                }
                return res
            }).catch( err => err)
    }

    finalizarFase = (idFase) => {
        const faseModal = this.state.faseModal
        console.log(`----> finalizarFase : localhost:4000/finalizar/fase`)
        return axios.post('http://127.0.0.1:4000/finalizar/fase',
            {
                f_id_fase : idFase,
                f_fecha_inicio : faseModal.f_fecha_inicio,
                f_fecha_fin : faseModal.f_fecha_fin,
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/finalizar/fase`)
                    this.setState({
                        faseModal : {
                            ...this.state.faseModal,
                            estado_id : 10,
                            estado : "finalizado"
                        }
                    },
                        () => this.guardarFase()
                    )
                }
                return res
            }).catch( err => err)
        
    }

    esEtapaCerrable = (idEtapa) => {
        const etapa = this.state.etapas.find( e => e.e_id_etapa === idEtapa)
        let esCerrable = true

        etapa.fases.forEach( fase => {
            if ( fase.estado_id !== 10 )
                esCerrable = false
        })

        return esCerrable
    }

    cerrarEtapa = (idEtapa) => {
        console.log(`----> cerrarEtapa : localhost:4000/finalizar/etapa`)
        return axios.post('http://127.0.0.1:4000/finalizar/etapa',
            {
                e_id_etapa : idEtapa,
                p_fecha_inicio : this.state.configuracion_yacimiento.p_fecha_inicio,
                e_fecha_inicio : this.state.etapas.find( 
                    e => e.e_id_etapa === idEtapa 
                ).e_fecha_inicio
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/finalizar/etapa`)
                    location.reload()
                }
                return res
            }).catch( err => err)
    }

    activarEtapa = (idEtapa) => {
        console.log(`----> activarEtapa : localhost:4000/activar/etapa`)
        return axios.post('http://127.0.0.1:4000/activar/etapa',
            {
                e_id_etapa : idEtapa,
                p_fecha_inicio : this.state.configuracion_yacimiento.p_fecha_inicio,
                e_fecha_inicio : this.state.etapas.find( 
                    e => e.e_id_etapa === idEtapa 
                ).e_fecha_inicio
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/activar/etapa`)
                    location.reload()
                }
                return res
            }).catch( err => err)
    }

    esProyectoCerrable = () => {
        let esCerrable = true

        this.state.etapas.forEach( etapa => {
            if ( etapa.estado_id !== 10 )
                esCerrable = false
        })

        return esCerrable
    }

    cerrarProyecto = () => {
        console.log(`----> cerrarProyecto : localhost:4000/finalizar/proyecto`)
        return axios.post('http://127.0.0.1:4000/finalizar/proyecto',
            {
                p_id_proyecto : this.state.configuracion_yacimiento.p_id_proyecto,
                m_id_mineral : this.state.configuracion_yacimiento.mineral_id,
                requisitos : this.state.requisitos,
                y_cantidad : this.state.configuracion_yacimiento.y_capacidad_explotacion

            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/finalizar/proyecto`)
                    location.reload()
                }
                return res
            }).catch( err => err)
    }


    /* MANEJAR EL GUARDADO EN LA BD */
    goProyecto = () => {
        this.setState({
            goProyecto : true
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

        console.log(`----> localhost:4000/modificar/proyecto`)
        return axios.post('http://127.0.0.1:4000/modificar/proyecto',
            {
                ...this.state.configuracion_yacimiento,
                y_capacidad_explotacion : parseFloat( conf.y_capacidad_explotacion ),
                etapas : nuevaEtapas,
                requisitos : this.state.requisitos
            })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/modificar/proyecto`)
                }
                return res
            }).catch( err => err)
    }

    render = () => {
        // PARA NO ESCRIBIR THIS.STATE MUCHAS VECES
        const {
            configuracion_yacimiento , requisitos, etapas, fases, minerales, maquinarias, cargos, faseModal,
            empleados, equipos, yacimientos, horarios
        } = this.state

        const estado_id = configuracion_yacimiento.estado_id

        const permisoModificar = true
    
        return (
        <div>   
             <MenuDashBoard title={`${this.state.configuracion_yacimiento.estado_id === 3 ? "Editar Proyecto": "Gestionar Proyecto"}`}/>

             <div>
                <div className="SobreMineral">
                    <h1 className="subtitulo-centrado">Sobre el proyecto</h1>
                    <div> 
                        <div className="horizontal">
                            <div className="confYacimientoIzq">
                                { !!estado_id && estado_id === 3 ?
                                    <div style={{margin : "5px auto"}}>
                                        <Button  variant="warning" className="mc-boton" onClick={this.solicitarRecursos}>
                                            Solicitar Recursos
                                        </Button>
                                    </div> 
                                : !!estado_id && estado_id === 15 ?
                                    <div style={{margin : "5px auto"}}>
                                        <Button  variant="warning" className="mc-boton" onClick={this.activarProyecto}>
                                            Activar Proyecto
                                        </Button>
                                    </div>
                                : !!estado_id && estado_id === 8?
                                    <div style={{margin : "5px auto"}}>
                                        <Button variant="success" className="mc-boton" 
                                            onClick={this.cerrarProyecto}
                                            disabled={!permisoModificar ||  !this.esProyectoCerrable()}
                                        >
                                            Cerrar Proyecto 
                                        </Button>
                                    </div>
                                : null }
                                <InputText 
                                    id={`NombreProyecto`}
                                    label="Nombre de Proyecto"
                                    name="p_nombre"
                                    value={configuracion_yacimiento.p_nombre}
                                    onChange={this.changeInfo}
                                    disabled={!permisoModificar || estado_id !== 3}
                                />
                                <div>
                                    <p style={{textAlign : "center"}}>Fecha de Inicio</p>
                                    <InputDate 
                                        name="p_fecha_inicio"
                                        value={configuracion_yacimiento.p_fecha_inicio}
                                        onChange={this.changeInfo}
                                        disabled={!permisoModificar || estado_id !== 3}
                                    />
                                </div>
                                <DropdownV2
                                    name="yacimiento_id"
                                    onChange={this.changeInfo}
                                    placeholder="Mineral..."
                                    value={{
                                        value: configuracion_yacimiento.yacimiento_id,
                                        label: !!configuracion_yacimiento.yacimiento_id ? yacimientos.find( y => y.y_id_yacimiento === configuracion_yacimiento.yacimiento_id).y_nombre : "Yacimiento ..."
                                    }}
                                    options={
                                        cleanerYacimiento.limpiarListaDropdown(
                                            yacimientos.filter( y => y.ocupado !== 0 )
                                        )
                                    }
                                    isDisabled
                                />
                                {!configuracion_yacimiento.yacimiento_id &&
                                    <p className="subtitulo-centrado" >Eliga un yacimiento para poder continuar</p>}
                                {configuracion_yacimiento.yacimiento_id &&
                                <div>
                                    <div className="horizontal pegar-derecha">
                                        <p className="separador"> Mineral a explotar</p>
                                        
                                        <div className="ancho-mineral">
                                            <DropdownV2
                                                    name="mineral_id"
                                                    placeholder="Mineral..."
                                                    isDisabled
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
                                                disabled
                                            />
                                        </div>
                                        <p className="separador"> toneladas</p>
                                    </div>
                                    <p className="subtitulo-centrado" > Minerales necesarios para su explotacion</p>
                                    <div> {/* MAPING DE REQUISITOS */}
                                    {
                                        this.state.requisitos.map(
                                            (requisito) => (
                                                <div key={requisito.m_id_mine_yaci} className="horizontal pegar-derecha">
                                                    <div className="ancho-cantidad">
                                                    </div>
                                                    <div className="ancho-mineral">
                                                        <DropdownV2
                                                            placeholder="Mineral ..."
                                                            isDisabled
                                                            value={{
                                                                value : requisito.mineral_id,
                                                                label: !!requisito.mineral_id ? minerales.find( r => r.m_id_mineral === requisito.mineral_id).m_nombre : "Mineral ..."
                                                            }}
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
                                                            disabled
                                                        />
                                                    </div>
                                                    <p className="separador"> toneladas</p>
                                                </div>
                                            )
                                        )
                                    }
                                    
                                </div>
                                </div>}
                            </div>
                            <div className="imagen-diamante">
                                <img 
                                    src="resources/img/Proyecto_1.png"
                                    width="400px"
                                />
                            </div>
                            
                        </div>  
                    </div>
                    
                </div>
                <div>
                    <h1 className="subtitulo-centrado">Etapas</h1>
                    <div>
                        {/* ETAPA  */}
                        {
                            this.state.etapas.map(
                                (etapa, index) => (
                                    <Etapa

                                        /* INFO */
                                        key={etapa.e_id_etapa_configuracion}
                                        etapa_configuracion = {{
                                            ...this.state.etapas.find(e => e.e_id_etapa_configuracion === etapa.e_id_etapa_configuracion )
                                        }}
                                        esCerrable={ this.esEtapaCerrable(etapa.e_id_etapa) }
                                        cerrarEtapa={ this.cerrarEtapa }
                                        activarEtapa={ this.activarEtapa }
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
                                    />
                                ))
                        }
                    </div>
                </div>
                <div>{ !!tengoPermiso(27) && 
                    <GuardarCancelar
                        position="center"
                        storeData={ estado_id === 3 ? this.guardarBD : this.goProyecto}
                        success={this.goProyecto}
                        decline={this.goProyecto}
                    />}
                </div> 

                {this.state.goProyecto && <Redirect to="/proyecto" /> }
                

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
                            <div className="fase-fase-izq">
                                <InputText 
                                    id={`NombreFase`}
                                    label="Estado"
                                    value={`ESTADO ACTUAL: ${faseModal.estado}`}
                                    disabled
                                />
                                <InputText 
                                    id={`NombreFase`}
                                    label="Nombre"
                                    name="f_nombre"
                                    value={faseModal.f_nombre}
                                    disabled
                                />
                                <InputText 
                                    id={`DuracionFase`}
                                    type="number"
                                    min={1}
                                    label="Duracion en meses"
                                    name="f_duracion"
                                    value={faseModal.f_duracion}
                                    disabled
                                />
                                <InputText 
                                    id={`DescripcionFase`}
                                    label="Descripción"
                                    name="f_descripcion"
                                    value={faseModal.f_descripcion}
                                    disabled
                                />
                                <p style={{textAlign : "center"}}>Fecha de Inicio</p>
                                <InputDate 
                                    name="f_fecha_inicio"
                                    value={faseModal.f_fecha_inicio}
                                    onChange={this.changeInfoFase}
                                    disabled={!permisoModificar || faseModal.estado_id === 8}
                                />
                                <p style={{textAlign : "center"}}>Fecha Fin</p>
                                <InputDate 
                                    name="f_fecha_fin"
                                    value={faseModal.f_fecha_fin}
                                    onChange={this.changeInfoFase}
                                />
                                <p className="subtitulo-centrado">Empleados</p>
                                <div> {/* MAPING DE EMPLEADOS */}
                                    { this.state.faseModal.empleados &&
                                        faseModal.empleados.map(
                                            (empleado, i) => (
                                                <div key={i} className="cargoHorizontal">
                                                    {/*<div>
                                                        
                                                        <i 
                                                            className="zmdi zmdi-close-circle-o LabelIcon pegar-derecha"
                                                            onClick={() => this.quitarCargo(
                                                                cargo.f_id_fase_cargo
                                                            )}
                                                        >
                                                            </i> 
                                                        
                                                    </div>*/}
                                                    <div style={{width : "20%" }}>
                                                        <DropdownV2
                                                            placeholder="Cargo ..."
                                                            value={{
                                                                value: empleado.c_id_cargo,
                                                                label: !!empleado.c_id_cargo ? this.state.cargos.find( c => c.c_id_cargo === empleado.c_id_cargo).c_nombre : "Cargo ..."
                                                            }}
                                                            options={
                                                                cleanerCargo.limpiarListaDropdown(
                                                                    cargos
                                                                )
                                                            }
                                                            isDisabled
                                                        />
                                                    </div>
                                                    <div style={{width : "20%" }}>
                                                        { empleado.cargo_id && 
                                                        <DropdownV2
                                                            placeholder="Empleado ..."
                                                            onChange={ (event) =>
                                                                this.changeEmpleado({...event, name: "e_id_empleado"}, empleado.idEspecial)
                                                            }
                                                            value={{
                                                                value: empleado.e_id_empleado,
                                                                label: !!empleado.e_id_empleado ? 
                                                                    `${this.state.empleados
                                                                        .filter( e => e.cargo_id === empleado.cargo_id)
                                                                        .find( e => e.e_id_empleado === empleado.e_id_empleado).e_nombre} 
                                                                    ${this.state.empleados
                                                                        .filter( e =>  e.cargo_id === empleado.cargo_id)
                                                                        .find( e => e.e_id_empleado === empleado.e_id_empleado).e_apellido}` 
                                                                    : "Empleado ..."
                                                            }}
                                                            isDisabled={!permisoModificar || estado_id !== 3}
                                                            options={
                                                                cleanerEmpleado.limpiarListaDropdown(
                                                                    empleados.filter( e => 
                                                                        e.cargo_id === empleado.cargo_id &&
                                                                        !faseModal.empleados.find( e1 => e1.e_id_empleado === e.e_id_empleado) &&
                                                                        !this.state.etapas.find( etapa =>
                                                                            etapa.fases.find( f => 
                                                                                f.empleados.find( e1 => e1.e_id_empleado === e.e_id_empleado)
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                        />}
                                                    </div>
                                                    
                                                    <div style={{width : "20%" }}>
                                                        <InputText 
                                                            id={`Sueldo_${i}_${empleado.idCargo}`}
                                                            label="Sueldo"
                                                            type="number"
                                                            min="0"
                                                            name="f_salario"
                                                            value={empleado.f_salario}
                                                            disabled={!permisoModificar || estado_id !== 3}
                                                            onChange= { (event) =>
                                                                this.changeEmpleado(event, empleado.idEspecial)
                                                            }
                                                        />
                                                    </div>
                                                    <div style={{width : "20%" }}>
                                                        <InputText 
                                                            id={`Viaticos_${i}_${empleado.idCargo}`}
                                                            label="Viaticos (opcional)"
                                                            type="number"
                                                            min="0"
                                                            name="f_viatico"
                                                            value={empleado.f_viatico}
                                                            disabled={!permisoModificar || estado_id !== 3}
                                                            onChange= { (event) =>
                                                                this.changeEmpleado(event, empleado.idEspecial)
                                                            }
                                                        />
                                                    </div>
                                                    <div style={{width : "20%" }}>
                                                        <DropdownV2
                                                            placeholder="Horario ..."
                                                            value={{
                                                                value: empleado.horario_id,
                                                                label: !!empleado.horario_id ? horarios.find( h => h.h_id_horario === empleado.horario_id).h_nombre : "Horario ..."
                                                            }}
                                                            isDisabled={!permisoModificar || estado_id !== 3}
                                                            options={
                                                                cleanerHorario.limpiarListaDropdown(
                                                                    horarios
                                                                )
                                                            }
                                                            onChange= { (event) =>
                                                                this.changeEmpleado({...event, name: "horario_id"}, empleado.idEspecial)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                    {null &&
                                    <div className="btnAgregarRequisito" onClick={this.agregarCargo} >
                                        Agregar cargo
                                    </div>}
                                    
                                </div>
                                <p className="subtitulo-centrado">{this.state.faseModal.equipos.length > 0 ? "Equipos" : "Sin equipos"}</p>
                                <div> {/* MAPING DE MAQUINARIAS */}
                                    { this.state.faseModal.equipos &&
                                        faseModal.equipos.map(
                                            (equipo) => (
                                                <div key={equipo.idEspecial} className="cargoHorizontal">
                                                    <div style={{width : "20%" }}>
                                                        <DropdownV2
                                                            placeholder="Maquinaria ..."
                                                            value={{
                                                                value: equipo.m_id_maquinaria,
                                                                label: !!equipo.m_id_maquinaria ? maquinarias.find( m => m.m_id_maquinaria === equipo.m_id_maquinaria).m_nombre : "Maquinaria ..."
                                                            }}
                                                            options={
                                                                cleanerMaquinaria.limpiarListaDropdown(
                                                                    maquinarias
                                                                )
                                                            }
                                                            isDisabled
                                                        />
                                                    </div>
                                                    <div style={{width : "40%" }}>
                                                        <DropdownV2
                                                            placeholder="Equipo ..."
                                                            onChange={ (event) =>
                                                                this.changeEquipo({...event, name: "e_id_equipo"}, equipo.idEspecial)
                                                            }
                                                            value={{
                                                                value: equipo.e_id_equipo,
                                                                label: !!equipo.e_id_equipo ? 
                                                                    `${this.state.equipos
                                                                        .filter( e => e.maquinaria_id === equipo.maquinaria_id)
                                                                        .find( e => e.e_id_equipo === equipo.e_id_equipo).e_marca} - 
                                                                    ${this.state.equipos
                                                                        .filter( e => e.maquinaria_id === equipo.maquinaria_id)
                                                                        .find( e => e.e_id_equipo === equipo.e_id_equipo).e_modelo} - 
                                                                    ${this.state.equipos
                                                                        .filter( e => e.maquinaria_id === equipo.maquinaria_id)
                                                                        .find( e => e.e_id_equipo === equipo.e_id_equipo).e_serial}` 
                                                                    : "Equipo ..."
                                                            }}
                                                            isDisabled={!permisoModificar || estado_id !== 3}
                                                            options={
                                                                cleanerEquipo.limpiarListaDropdown(
                                                                    equipos.filter( e => 
                                                                        e.maquinaria_id === equipo.maquinaria_id &&
                                                                        !faseModal.equipos.find( e1 => e1.e_id_equipo === e.e_id_equipo) &&
                                                                        !this.state.etapas.find( etapa =>
                                                                            etapa.fases.find( f => 
                                                                                f.equipos.find( e1 => e1.e_id_equipo === e.e_id_equipo)
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div style={{width : "20%" }}>
                                                        <InputText 
                                                            id={`Alquiler_${equipo.idEspecial}_`}
                                                            label="Costo Alquiler"
                                                            type="number"
                                                            min="0"
                                                            name="f_costo_alquiler"
                                                            value={equipo.f_costo_alquiler}
                                                            disabled={!permisoModificar || estado_id !== 3}
                                                            onChange= { (event) =>
                                                                this.changeEquipo(event, equipo.idEspecial)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                    
                                </div>
                            </div>
                            <div className="fase-fase-der">
                                <input
                                    className="inputOrdenFase"
                                    name={"f_orden"}
                                    value={faseModal.f_orden}
                                    style={{fontSize : "100px"}}
                                    disabled
                                    onChange={this.changeInfoFase}
                                />
                            </div>
                        </div>  
                            
                    </Modal.Body>
                    
                    <Modal.Footer className="mc-footer">
                    
                    {estado_id === 3 ?  

                        <Button variant="primary" className="mc-boton mc-boton-guardar" 
                            onClick={() => this.guardarFase(
                                faseModal.etapa_configuracion_id,
                                faseModal.f_id_fase_configuracion
                            )}
                        >
                            Modificar
                        </Button>

                    : estado_id === 8 && faseModal.estado_id === 3  ?

                        <Button variant="warning" className="mc-boton" 
                            onClick={() => this.activarFase(faseModal.f_id_fase)}
                        >
                            Activar Fase
                        </Button>

                    : estado_id === 8 && faseModal.estado_id === 8  ?

                        <Button variant="success" className="mc-boton" 
                            onClick={() => this.finalizarFase(faseModal.f_id_fase)}
                        >
                            Finalizar Fase
                        </Button>

                    : null }

                        <Button variant="secondary" className="mc-boton" 
                            onClick={this.cancelarFase}
                        >
                            Volver
                        </Button>
                    </Modal.Footer>
                </Modal>}

             </div>
        </div>
    )}
}