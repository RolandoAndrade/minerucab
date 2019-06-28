import React from 'react';

import {DropdownV2} from "../components/DropdownV2"
import {InputText} from "../components/InputText";

export class EtapaConfiguracion extends React.Component {
    render = () => {
        const {
            etapa_configuracion, maquinas, cargos, tipos, quitarEtapa, changeInfo
        } = this.props

        
        const id = etapa_configuracion.e_id_etapa_configuracion

        return(
            <div className="marco-etapa-configuracion">
                <div className="horizontal">
                    <div className="etapa-conf-izq">
                        <div>
                            <InputText
                                id={`NombreEtapa_${id}_${etapa_configuracion.e_orden}_`} 
                                label="Nombre"
                                name="e_nombre"
                                value={etapa_configuracion.e_nombre}
                                onChange={(event) => { changeInfo(event, id)}}
                            />
                        </div>
                        <div>
                            <DropdownV2
                                    placeholder="Tipo de etapa ..."
                                    value={etapa_configuracion.e_tipo}
                                    onChange={(opcion) => {this.forceUpdate(); changeInfo(opcion, id)}}
                                    options={[
                                        {label: "Refinación", value: 1},
                                        {label: "Explotación", value: 2}
                                    ]}
                            />
                        </div>
                        <div>
                            <p className="subtitulo-centrado">Fases de la Etapa</p>
                            <div style={{marginLeft : "20%"}}>
                                {
                                    etapa_configuracion.fases.map(
                                        (fase, index) => (
                                            <div key={index} className="faseHorizontal">

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
                        <i className="zmdi zmdi-close-circle-o LabelIcon pegar-derecha"
                            onClick={() => quitarEtapa(id)}>
                        </i>
                        <div className="numero">
                            <p>{etapa_configuracion.e_orden}</p>
                        </div>
                        <p style={{height:"10px"}}>&nbsp;</p>
                    </div>
                </div>
            </div>
        )
    }
}
