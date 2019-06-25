import React from 'react';
import axios from 'axios';

import {Modal, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import MaterialTable from 'material-table';

import {cleanerMineral} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";
import {GuardarCancelar} from "../components/GuardarCancelar";

export class YacimientoAgregar extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
        nuevo_mineral: {
            m_id_mineral: 0,
            m_tipo : "no metal",
            m_radioactivo : false,
            m_fecha_nacionalizacion : "",
            m_nombre : "",
            m_descripcion : ""
        },
        goYacimiento : false
    }
  }

  componentDidMount = () => {
    console.log(`----> localhost:4000/consultarLista/lugar`)
    axios.get('http://127.0.0.1:4000/consultarLista/lugar')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/lugar`)

        this.setState({
            lugares : res.data.rows
        })

      })
  }

  storeData = () =>
  {
      const nuevo_yacimiento = {
          ...this.state.nuevo_yacimiento
      };


      console.log(`----> localhost:4000/insertar/yacimiento`)
      return axios.post('http://127.0.0.1:4000/insertar/yacimiento',
          {
              "m_nombre" : nuevo_mineral.m_nombre,
              "m_tipo" : nuevo_mineral.m_tipo,
              "m_radioactivo" : nuevo_mineral.m_radioactivo,
              "m_fecha_nacionalizacion" : nuevo_mineral.m_fecha_nacionalizacion,
              "m_descripcion" : nuevo_mineral.m_descripcion
          })
          .then( (res) => {
              if( res.status === 200) {
                  console.log(`<---- (OK 200) localhost:4000/insertar/mineral`)
              }
              return res
          }).catch( err => err)
  }


  goYacimiento = () => {
      this.setState({
          goYacimiento : true
      })
  };

  handleChange = ({target}) => {
    console.log(target);
    this.setState({
        nuevo_mineral : {
            ...this.state.nuevo_mineral,
            [target.name] : target.value
        }
    })
  }

  handleBool = ({target}) => {
    if (target.name === "m_tipo")
        this.setState({
            nuevo_mineral : {
                ...this.state.nuevo_mineral,
                m_tipo : target.checked ? "metal" : "no metal"
            }
        })
    else
        this.setState({
            nuevo_mineral : {
                ...this.state.nuevo_mineral,
                [target.name] : target.checked
            }
    })
  }

  
  render = () => (
    <div>
        <MenuDashBoard title="Agregar Yacimiento"/>

        <div>

            <div className="CrearElemento">
                <div className="firstColumn">
                    <div className="mc-atributo">Nombre: </div>
                </div>
                <div className="secondColumn">
                    <InputText
                        id={"m_nombre"}
                        name={"m_nombre"}
                        label="Nombre"
                        onChange={this.handleChange}
                        styles={{width: "100%"}}
                    />
                </div>
                <div className={"firstColumn"}>
                    <div className="mc-atributo">¿Metal?: </div>
                </div>
                <div className="secondColumn">
                    <form action="">
                        <label className="form-switch">
                            <input
                                type="checkbox"
                                name="m_tipo"
                                onChange={this.handleBool}
                                checked={this.state.nuevo_mineral.m_tipo === "metal" ? true : false}
                            />
                            <i></i>
                        </label>
                    </form>
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">¿Radioactivo?: </div>
                </div>
                <div className="secondColumn">
                    <form action="">
                        <label className="form-switch">
                            <input 
                                type="checkbox"
                                name="m_radioactivo"
                                onChange={this.handleBool}
                                checked={this.state.nuevo_mineral.m_radioactivo}
                            />
                            <i></i>
                        </label>
                    </form>
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">Nacionalizado:</div>
                </div>
                <div className="secondColumn">
                    <InputDate
                        id="m_fecha_nacionalizacion"
                        name={"m_fecha_nacionalizacion"}
                        onChange={this.handleChange}
                        styles={{width: "100%"}}
                        style={{background: "white", color: "black"}}
                    />
                </div>
                <div className="firstColumn">
                    <div className="mc-atributo">Descripción:</div>
                </div>
                <div className="secondColumn">
                    <textarea
                        name="m_descripcion"
                        placeholder="Descripción"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="firstColumn">
                    <span className="mc-atributo">Compuesto de</span><span> : </span>
                    <img
                        src="../resources/icons/Agregar.png"
                        width="25px"
                        onClick={this.handleOpenModal1}
                        className="IconoAgregar"
                    />
                </div>
                <div>
                    {this.state.compuestos.map( (compuesto, i) => (
                        <div className="compuesto" key={i}>
                            <span>{compuesto.m_nombre}</span>
                            <img
                                src="../resources/icons/Eliminar.png"
                                width="20px"
                                onClick={() => this.handleDescomponer(compuesto.m_id_mineral)}
                                className="IconoEliminar"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <GuardarCancelar
                storeData={this.storeData}
                success={this.goYacimiento} 
                decline={this.goYacimiento}
            />

            {this.state.goYacimiento && <Redirect to="/" /> }

      </div>
    </div>  
  )
}
