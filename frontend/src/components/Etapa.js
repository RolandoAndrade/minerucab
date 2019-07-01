import React from 'react';

import {DropdownV2} from "./DropdownV2"
import {InputText} from "./InputText";
import {InputDate} from "./InputDate";


export class Etapa extends React.Component {

    render = () => {
        let {
            etapa_configuracion, maquinarias, cargos, tipos, quitarEtapa, changeInfo, agregarFase, quitarFase, abrirFase, no_modificable
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
                                disabled
                                onChange={(event) => changeInfo(event, id)}
                            />
                        </div>
                        <DropdownV2
                            className="tipoEtapa"
                            placeholder="Tipo ..."
                            value={{
                                value : etapa_configuracion.e_tipo,
                                label : etapa_configuracion.e_tipo === "explotacion" ? "Explotación" : 
                                        etapa_configuracion.e_tipo === "refinacion" ? "Refinación" :
                                        "Tipo ..."
                            }}
                            options={[
                                { label: 'Explotación', value: 1 },
                                { label: 'Refinación', value: 2 }
                            ]}
                            isDisabled
                            onChange={(event) => changeInfo(event, id)}
                            
                        />
                        <p style={{textAlign : "center"}}>Fecha de Inicio</p>
                        <InputDate 
                            name="e_fecha_inicio"
                            value={etapa_configuracion.e_fecha_inicio}
                            onChange={(event) => changeInfo(event, id)}
                        />
                        <div>
                            <p className="subtitulo-centrado">Fases de la Etapa</p>
                            <div style={{marginLeft : "20%"}}>
                                {
                                    etapa_configuracion.fases.map(
                                        (fase, index) => (
                                            <div key={fase.f_id_fase_configuracion} className="faseHorizontal">
                                                <div style={{width : "100%", margin: "10px"}}>
                                                    <input
                                                        className="btnFase" type="button" 
                                                        value={`(${fase.f_orden}) - ${fase.f_nombre.slice(0, 25)} ...`}
                                                        onClick={() => abrirFase(id, fase.f_id_fase_configuracion) }
                                                    />
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="etapa-conf-der">
                        <p style={{height:"10px"}}>&nbsp;</p>
                        <div className="numero">
                            <input
                                className="inputOrden"
                                name={"e_orden"}
                                value={etapa_configuracion.e_orden}
                                disabled
                                onChange={(event) => changeInfo(event, id)}
                            />
                        </div>
                        <p style={{height:"10px"}}>&nbsp;</p>
                    </div>
                </div>
            </div>
        )
    }
}
