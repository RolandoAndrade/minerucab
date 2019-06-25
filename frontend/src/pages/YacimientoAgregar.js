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
import {Dropdown} from "../components/Dropdown";

import {cleanerLugar, cleanerConfiguracion, cleanerTipoYacimiento} from "../utils/cleaner"

export class YacimientoAgregar extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
        nuevo_yacimiento: {
            y_id_yacimiento : 0 ,
            y_nombre : "" ,
            y_extension : 0 ,
            yacimiento_configuracion_id : 0 ,
            tipo_yacimiento_id : 0 ,
            lugar_id : 0 ,
            lugar : "" ,
            yacimiento_configuracion : "",
            unidad_id : 8 // KILOMETROS CUADRADOS
        },
        lugares : [],
        lugar : {

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
      .then( () => {
        console.log(`----> localhost:4000/consultarLista/yacimiento_configuracion`)
        axios.get('http://127.0.0.1:4000/consultarLista/yacimiento_configuracion')
          .then( (res) => {
            if(res.status === 200)
              console.log(`<---- (OK 200) localhost:4000/consultarLista/yacimiento_configuracion`)
    
            this.setState({
                configuraciones : res.data.rows
            })
    
          })
      })
      .then( () => {
        console.log(`----> localhost:4000/consultarLista/tipo_yacimiento`)
        axios.get('http://127.0.0.1:4000/consultarLista/tipo_yacimiento')
          .then( (res) => {
            if(res.status === 200)
              console.log(`<---- (OK 200) localhost:4000/consultarLista/tipo_yacimiento`)
    
            this.setState({
                tipo_yacimientos : res.data.rows
            })
    
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
              ...nuevo_yacimiento,
              lugar_id : this.state.lugar.parroquia_id,
              y_extension : parseFloat(nuevo_yacimiento.y_extension),
              tipo_yacimiento_id : nuevo_yacimiento.tipo_yacimiento_id !== -1 ? nuevo_yacimiento.tipo_yacimiento_id : 0
          })
          .then( (res) => {
              if( res.status === 200) {
                  console.log(`<---- (OK 200) localhost:4000/insertar/yacimiento`)
              }
              return res
          }).catch( err => err)
  }


  goYacimiento = () => {
      this.setState({
          goYacimiento : true
      })
  };

  handleChange = (target) => {
    target = target.target || target
    console.log(`nuevo_yacimiento.${target.name} = ${target.value}`)
    this.setState({
        nuevo_yacimiento : {
            ...this.state.nuevo_yacimiento,
            [target.name] : target.value
        }
    })
  }

  handleChangeLugar = (target) => {
    console.log(`lugar.${target.name} = ${target.value}`)
    this.setState({
        lugar :{
            ...this.state.lugar,
            [target.name] : target.value
        }
    })
}
  
  render = () => (
    <div>
        <MenuDashBoard title="Agregar Yacimiento"/>

        <div className="RowContainer">
                <div className="WideContainer">
                    <div className="FormContainer">

                        <InputText 
                            id="CrearYacimientoNombre" 
                            label="Nombre"
                            name="y_nombre"
                            onChange={this.handleChange}
                        />
                        <InputText
                            id="CrearYacimientoExtension"
                            label="Extensión (km2)"
                            type="number"
                            min="0"
                            name="y_extension"
                            onChange={this.handleChange}
                        />

                        <Dropdown id="CrearEmpleadoLugarEstado"
                            name="estado_id"
                            retrieveData={this.handleChangeLugar}
                            placeholder="Estado donde vive..."
                            options={
                                cleanerLugar.limpiarListaDropdown(
                                    this.state.lugares.filter( l => l.l_tipo === "estado")
                                )
                            }
                        />
                        <Dropdown id="CrearEmpleadoLugarMunicipio"
                            name="municipio_id"
                            retrieveData={this.handleChangeLugar}
                            placeholder="Municipio donde vive..."
                            options={
                            cleanerLugar.limpiarListaDropdown(
                                this.state.lugares.filter( l => l.lugar_id === this.state.lugar.estado_id)
                                )
                            }
                        />
                        <Dropdown id="CrearEmpleadoLugarParroquia"
                            name="parroquia_id"
                            retrieveData={this.handleChangeLugar}
                            placeholder="Parroquia donde vive..."
                            options={
                            cleanerLugar.limpiarListaDropdown(
                                this.state.lugares.filter( l => l.lugar_id === this.state.lugar.municipio_id)
                                )
                            }
                        />
                        <Dropdown id="CrearTipoYacimiento"
                            name="tipo_yacimiento_id"
                            retrieveData={this.handleChange}
                            placeholder="Tipo Yacimiento ..."
                            options={
                                cleanerTipoYacimiento.limpiarListaDropdown(
                                        this.state.tipo_yacimientos
                                    )
                            }
                        />
                        <Dropdown id="CrearYacimientoConfiguracion"
                            name="yacimiento_configuracion_id"
                            retrieveData={this.handleChange}
                            placeholder="Configuración ..."
                            options={
                            cleanerConfiguracion.limpiarListaDropdown(
                                    this.state.configuraciones
                                )
                            }
                        />
                    </div>
                </div>

                <div className="WideContainer">
                    <div className="FormContainer">
                        <img 
                            src="resources/img/Yacimiento_1.png"
                            width="60%"
                            style={{margin : "0 auto"}} 
                        />
                        <GuardarCancelar
                            storeData={this.storeData}
                            success={this.goYacimiento} 
                            decline={this.goYacimiento}
                        />
                    </div>
                    
                </div>

                

            {this.state.goYacimiento && <Redirect to="/yacimiento" /> }

      </div>
    </div>  
  )
}
