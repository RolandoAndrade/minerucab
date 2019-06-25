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

export class YacimientoEditar extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
        nuevo_yacimiento: {
            y_id_yacimiento : 0 ,
            y_nombre : "" ,
            y_extension : 0 ,
            yacimiento_configuracion_id : 0 ,
            tipo_yacimiento_id : 0 ,
            tipo_yacimiento : "notYet",
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
        const id = Number.parseInt(this.props.location.pathname.split("/")[3] , 10)

        console.log(`----> localhost:4000/consultar/yacimiento`)
        axios.post('http://127.0.0.1:4000/consultar/yacimiento', 
            { y_id_yacimiento : id }
        )
            .then( (res) => {
                if(res.status === 200)
                console.log(`<---- (OK 200) localhost:4000/consultar/yacimiento`)
                
                const nuevo_yacimiento = {
                    ...res.data.rows[0]
                }

                this.setState({
                    nuevo_yacimiento : nuevo_yacimiento
                })
                
            })
            .then( () => { 
                console.log(`----> localhost:4000/consultarLista/lugar`)
                axios.get('http://127.0.0.1:4000/consultarLista/lugar')
                .then( (res) => {
                    if(res.status === 200)
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/lugar`)

                    this.setState({
                        lugares : res.data.rows,
                    },
                        () => this.establecerLugar()
                    )
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


    establecerLugar = () => {
        const parroquia = this.state.lugares.filter( 
            l => l.l_id_lugar === this.state.nuevo_yacimiento.lugar_id 
        )[0]
        const municipio = this.state.lugares.filter( 
            l => l.l_id_lugar === parroquia.lugar_id 
        )[0]

        const estado = this.state.lugares.filter( 
            l => l.l_id_lugar === municipio.lugar_id 
        )[0]
        
        this.setState({
            lugar : {
                estado_id : estado.l_id_lugar,
                municipio_id : municipio.l_id_lugar,
                parroquia_id : parroquia.l_id_lugar,
                estado, municipio, parroquia
            }
        })

    }

  storeData = () =>
  {
      const nuevo_yacimiento = {
          ...this.state.nuevo_yacimiento
      };

      console.log(`----> localhost:4000/modificar/yacimiento`)
      return axios.post('http://127.0.0.1:4000/modificar/yacimiento',
          {
              ...nuevo_yacimiento,
              lugar_id : this.state.lugar.parroquia_id,
              y_extension : parseFloat(nuevo_yacimiento.y_extension),
              tipo_yacimiento_id : nuevo_yacimiento.tipo_yacimiento_id !== -1 ? nuevo_yacimiento.tipo_yacimiento_id : 0
          })
          .then( (res) => {
              if( res.status === 200) {
                  console.log(`<---- (OK 200) localhost:4000/modificar/yacimiento`)
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
                            value={this.state.nuevo_yacimiento.y_nombre}
                        />
                        <InputText
                            id="CrearYacimientoExtension"
                            label="Extensión (km2)"
                            type="number"
                            min="0"
                            name="y_extension"
                            onChange={this.handleChange}
                            value={this.state.nuevo_yacimiento.y_extension}
                            disabled={this.state.nuevo_yacimiento.no_modificable}
                        />
                        { this.state.lugar.estado &&
                        <Dropdown id="CrearEmpleadoLugarEstado"
                            name="estado_id"
                            retrieveData={this.handleChangeLugar}
                            placeholder="Estado donde vive..."
                            defaultID={this.state.lugar.estado_id}
                            defaultText={this.state.lugar.estado.l_nombre}
                            options={
                                cleanerLugar.limpiarListaDropdown(
                                    this.state.lugares.filter( l => l.l_tipo === "estado")
                                )
                            }
                            disabled={this.state.nuevo_yacimiento.no_modificable}
                        />}
                        { this.state.lugar.municipio &&
                        <Dropdown id="CrearEmpleadoLugarMunicipio"
                            name="municipio_id"
                            retrieveData={this.handleChangeLugar}
                            placeholder="Municipio donde vive..."
                            defaultID={this.state.lugar.municipio_id}
                            defaultText={this.state.lugar.municipio.l_nombre}
                            options={
                            cleanerLugar.limpiarListaDropdown(
                                this.state.lugares.filter( l => l.lugar_id === this.state.lugar.estado_id)
                                )
                            }
                            disabled={this.state.nuevo_yacimiento.no_modificable}
                        />}
                        { this.state.lugar.parroquia &&
                        <Dropdown id="CrearEmpleadoLugarParroquia"
                            name="parroquia_id"
                            retrieveData={this.handleChangeLugar}
                            placeholder="Parroquia donde vive..."
                            defaultID={this.state.lugar.parroquia_id}
                            defaultText={this.state.lugar.parroquia.l_nombre}
                            options={
                            cleanerLugar.limpiarListaDropdown(
                                this.state.lugares.filter( l => l.lugar_id === this.state.lugar.municipio_id)
                                )
                            }
                            disabled={this.state.nuevo_yacimiento.no_modificable}
                        />}
                        { this.state.nuevo_yacimiento.tipo_yacimiento !== "notYet" &&
                        <Dropdown id="CrearTipoYacimiento"
                            name="tipo_yacimiento_id"
                            retrieveData={this.handleChange}
                            placeholder="Tipo Yacimiento ..."
                            defaultID={this.state.nuevo_yacimiento.tipo_yacimiento_id}
                            defaultText={this.state.nuevo_yacimiento.tipo_yacimiento}
                            options={
                                cleanerTipoYacimiento.limpiarListaDropdown(
                                        this.state.tipo_yacimientos
                                    )
                            }
                            disabled={this.state.nuevo_yacimiento.no_modificable}
                        />}
                        { this.state.nuevo_yacimiento.yacimiento_configuracion &&
                        <Dropdown id="CrearYacimientoConfiguracion"
                            name="yacimiento_configuracion_id"
                            retrieveData={this.handleChange}
                            placeholder="Configuración ..."
                            defaultID={this.state.nuevo_yacimiento.yacimiento_configuracion_id}
                            defaultText={this.state.nuevo_yacimiento.yacimiento_configuracion}
                            options={
                            cleanerConfiguracion.limpiarListaDropdown(
                                    this.state.configuraciones
                                )
                            }
                            disabled={this.state.nuevo_yacimiento.no_modificable}
                        />}
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
