import React from 'react';

import {Dropdown} from "../components/Dropdown"
import {InputText} from "../components/InputText";

export class EtapaConfiguracion extends React.Component
{
    constructor(props){
        super(props)
        
        this.state  = {
          maquinas : [],
          cargos : [],
          nueva_etapa_configuracion : {
              e_id_etapa_configuracion : 0,
              e_nombre :"",
              e_orden : 0,
              e_tipo : "",
              yacimiento_configuracion_id : 0
          },
          tipos : [],
          fases : [{
            f_id_fase_configuracion : 0,
            f_nombre : "MiFase1",
            f_orden : 0,
            f_duracion : 0,
            f_descripcion : "",
            etapa_configuracion_id : 0,
            unidad_id : 7
          }]
        }
    }

    handleChange = (target) => {
        target=target.target||target;
        console.log(`nuevo_empleado.${target.name} = ${target.value}`)
        this.setState({
            nueva_etapa_configuracion :{
                ...this.state.nueva_etapa_configuracion,
                [target.name] : target.value
            }
        })
    }

    handleAgregarFase = () => {

    }

    handleQuitarFase = () => {

    }

    selectInput()
    {
        /*let label = document.getElementById("InputTextLabel"+this.props.id);
        label.classList.add("BeSmall");*/
    }

    outInput()
    {
        /*let input = document.getElementById("InputText"+this.props.id);
        let label = document.getElementById("InputTextLabel"+this.props.id);
        if(input.value=="")
        {
            label.classList.remove("BeSmall");
        }*/
    }
    render = () => (
        <div>
            <div className="marco-etapa-configuracion">
                <div>
                    <div className="ancho-cantidad">
                        <InputText 
                            id="NombreEtapa"
                            label="Nombre"
                            name="e_nombre"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="ancho-mineral">
                        <Dropdown id="TipoEtapa"
                                name="e_tipo"
                                retrieveData={this.handleChange}
                                placeholder="Tipo Etapa..."
                                options={[{text: "Refinacion", id: 1},{text: "Explotacion", id: 2}]}
                        />
                    </div>
                    <div>
                        <p>Fases</p>
                        <div>
                            {
                                this.state.fases.map(
                                    (fases, index) => (
                                        <div className="horizontal " >
                                            <div className="WideContainer" style={{justifyContent: "right", width: "30%"}}>
                                                <i className="zmdi zmdi-close-circle-o LabelIcon" onClick={this.handleQuitarFase}></i>
                                            </div>
                                            <div className="campo-fase">
                                                <input
                                                    className="DropdownSearch campo-fase" type="button" 
                                                    value={this.state.fases[index].f_nombre}
                                                />
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                        <div>
                            <div className="ButtonAddUser" onClick={this.handleAgregarFase} >
                                Agregar Fase
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}
