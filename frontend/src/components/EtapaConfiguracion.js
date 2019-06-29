import React from 'react';

import {DropdownV2} from "../components/DropdownV2"
import {InputText} from "../components/InputText";

export class EtapaConfiguracion extends React.Component {

    render = () => {
        let {
            etapa_configuracion, maquinas, cargos, tipos, quitarEtapa, changeInfo, agregarFase, quitarFase
        } = this.props

        let id = etapa_configuracion.e_id_etapa_configuracion

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
                                onChange={(event) => changeInfo(event, id)}
                            />
                        </div>
                        <DropdownV2
                            className="tipoEtapa"
                            placeholder="Tipo ..."
                            options={[
                                { label: 'Explotación', value: 1 },
                                { label: 'Refinación', value: 2 }
                            ]}
                            onChange={(event) => changeInfo(event, id)}
                            
                        />
                        <div>
                            <p className="subtitulo-centrado">Fases de la Etapa</p>
                            <div style={{marginLeft : "20%"}}>
                                {
                                    etapa_configuracion.fases.map(
                                        (fase, index) => (
                                            <div key={fase.f_id_fase_configuracion} className="faseHorizontal">

                                                <i  className="zmdi zmdi-close-circle-o LabelIcon" 
                                                    onClick={ () => quitarFase(id, fase.f_id_fase_configuracion) } 
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
                            <div className="btnAgregarFase" onClick={() => agregarFase(id)} >
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
