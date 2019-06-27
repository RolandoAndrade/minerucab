import React from 'react';

import {Dropdown} from "../components/Dropdown"
import {InputText} from "../components/InputText";

export class EtapaConfiguracion extends React.Component
{
    constructor(props){
        super(props)
        
        this.state  = {
            ultimaFaseIndex : 1,
            // INFO DE ETAPA_CONF
            etapa_configuracion : {
                e_id_etapa_configuracion : props.e_id_etapa_configuracion || 1,
                e_nombre : props.e_nombre,
                e_orden : props.e_orden,
                e_tipo : ""
            },
            maquinas : [],
            cargos : [],
            tipos : [],
            fases : [{
                f_id_fase_configuracion : 0,
                f_nombre : "Fase 1 (Por configurar)",
                f_orden : 0,
                f_duracion : 0,
                f_descripcion : "",
                unidad_id : 7
            }]
        }
    }

    changeInfo = (target) => {
        target=target.target||target;
        console.log(`etapa_configuracion[ i:${this.state.etapa_configuracion.e_orden} , id:${this.state.etapa_configuracion.e_id_etapa_configuracion} ].${target.name} = ${target.value}`)
        this.setState({
            etapa_configuracion :{
                ...this.state.etapa_configuracion,
                [target.name] : target.value
            }
        })
    }

    agregarFase = () => {
        console.log(`etapa_configuracion[ i:${this.state.etapa_configuracion.e_orden} , id:${this.state.etapa_configuracion.e_id_etapa_configuracion} ] { new fase = fase[i:${this.state.fases.length +1} id:${this.state.ultimaFaseIndex + 1}}] } `)
        this.setState( (prev) => ({
            fases:[...prev.fases, {
                f_id_fase_configuracion : prev.ultimaFaseIndex + 1,
                f_nombre : `Fase ${prev.fases.length +1} (Por configurar)`,
                f_orden : prev.fases.length +1,
                f_duracion : 0,
                f_descripcion : "",
                unidad_id : 7
            }],
            ultimaFaseIndex : prev.ultimaFaseIndex + 1
        }))
    }

    quitarFase = () => {

    }

    render = () => {
        const {
            etapa_configuracion, maquinas, cargos, tipos, fases
        } = this.state

        return(
            <div className="marco-etapa-configuracion">
                <div className="horizontal">
                    <div className="etapa-conf-izq">
                        <div>
                            <InputText 
                                id={`NombreEtapa_${etapa_configuracion.e_orden}_`}
                                label="Nombre"
                                name="e_nombre"
                                onChange={this.changeInfo}
                            />
                        </div>
                        <div>
                            <Dropdown id={`TipoEtapa_${etapa_configuracion.e_orden}_`}
                                    name="e_tipo"
                                    retrieveData={this.changeInfo}
                                    placeholder="Tipo de etapa ..."
                                    options={[{text: "Refinación", id: 1},{text: "Explotación", id: 2}]}
                            />
                        </div>
                        <div>
                            <p className="subtitulo-centrado">Fases de la Etapa</p>
                            <div style={{marginLeft : "20%"}}>
                                {
                                    this.state.fases.map(
                                        (fase, index) => (
                                            <div className="faseHorizontal">

                                                <i  className="zmdi zmdi-close-circle-o LabelIcon" 
                                                    onClick={this.handleQuitarFase} 
                                                />
                                                <div style={{width : "100%"}}>
                                                    <input
                                                        className="btnFase" type="button" 
                                                        value={fase.f_nombre.slice(0, 25) + " ..."}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>
                            <div className="btnAgregarFase" onClick={this.agregarFase} >
                                Agregar Fase
                            </div>
                        </div>
                    </div>
                    <div className="etapa-conf-der">
                        <p>{etapa_configuracion.e_orden}</p>
                    </div>
                </div>
            </div>
        )
    }
}
