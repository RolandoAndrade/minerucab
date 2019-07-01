import React from 'react';
import axios from 'axios';

import {Modal, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import MaterialTable from 'material-table';
import {GuardarCancelar} from "../components/GuardarCancelar";
import {cleanerCliente} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";
import {Dropdown} from "../components/Dropdown";
import {cleanerLugar} from "../utils/cleaner"
export class ClienteAgregar extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
        clientes : [],
        nuevo_cliente: {
            c_nombre : "",
            c_rif : "",
            c_telefono : "",
            lugar_id : 0,
        },
        lugar : {
                estado_id : 0,
                municipio_id : 0,
                parroquia_id : 0
            },
        lugares : [],
        textoBuscardor: "",
        goCliente : false
    }
  }

  componentDidMount = () => {
    console.log(`----> localhost:4000/consultarLista/cliente`)
    axios.get('http://127.0.0.1:4000/consultarLista/cliente')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/cliente`)

        this.setState({
            clientes : res.data.rows
        })
        axios.get('http://127.0.0.1:4000/consultarLista/lugar')
          .then( (res) => {
            if(res.status === 200)
              console.log(`<---- (OK 200) localhost:4000/consultarLista/lugar`)
    
            this.setState({
                lugares : res.data.rows
            })
          })
      })
  }

  handleGuardar = () => {
    console.log(`----> localhost:4000/insertar/cliente`)
    axios.post('http://127.0.0.1:4000/insertar/cliente', 
        {
            "c_nombre" : this.state.nuevo_cliente.c_nombre,
            "c_rif" : this.state.nuevo_cliente.c_rif , 
            "c_telefono" : this.state.nuevo_cliente.c_telefono, 
            "lugar_id" : this.state.lugar.parroquia_id
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/insertar/cliente`)
                this.handleCancelar()
            }
        })
  }

  handleCancelar = () => {
      this.setState({
          goCliente : true
      })
  }

    handleChange = (target) => {
        target=target.target||target;
        console.log(`nuevo_cliente.${target.name} = ${target.value}`)
        this.setState({
            nuevo_cliente:{
                ...this.state.nuevo_cliente,
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
        <MenuDashBoard title="Agregar cliente"/>

        <div>

            <div className="CrearElemento">
                    <div className="firstColumn">
                        <div className="mc-atributo">Nombre: </div>
                    </div>
                    <div className="secondColumn">
                        <InputText
                            id={"c_nombre"}
                            name={"c_nombre"}
                            label="Nombre"
                            onChange={this.handleChange}
                            styles={{width: "100%"}}
                        />
                    </div>
                    <div className="firstColumn">
                        <div className="mc-atributo">RIF: </div>
                    </div>
                    <div className="secondColumn">
                        <InputText
                            id={"c_rif"}
                            name={"c_rif"}
                            label="RIF"
                            onChange={this.handleChange}
                            styles={{width: "100%"}}
                        />
                    </div>
                    <div className="firstColumn">
                        <div className="mc-atributo">Teléfono: </div>
                    </div>
                    <div className="secondColumn">
                        <InputText
                            id={"c_telefono"}
                            name={"c_telefono"}
                            label="Teléfono"
                            onChange={this.handleChange}
                            styles={{width: "100%"}}
                        />
                    </div>
                    <div className="firstColumn">
                        <div className="mc-atributo">Estado: </div>
                    </div>
                    <div className="secondColumn">
                        <Dropdown id="Estado"
                                  name="estado_id"
                                  retrieveData={this.handleChangeLugar}
                                  placeholder="Estado donde vive..."
                                  options={
                                      cleanerLugar.limpiarListaDropdown(
                                          this.state.lugares.filter( l => l.l_tipo === "estado")
                                        )
                                    }
                        />
                    </div>
                    <div className="firstColumn">
                        <div className="mc-atributo">Municipio: </div>
                    </div>
                    <div className="secondColumn">
                        <Dropdown id="Municipio"
                                  name="municipio_id"
                                  retrieveData={this.handleChangeLugar}
                                  placeholder="Municipio donde vive..."
                                  options={
                                      cleanerLugar.limpiarListaDropdown(
                                        this.state.lugares.filter( l => l.lugar_id === this.state.lugar.estado_id)
                                      )
                                    }
                        />
                    </div>
                    <div className="firstColumn">
                        <div className="mc-atributo">Parroquia: </div>
                    </div>
                    <div className="secondColumn">
                        <Dropdown id="Parroquia"
                                  name="parroquia_id"
                                  retrieveData={this.handleChangeLugar}
                                  placeholder="Parroquia donde vive..."
                                  options={
                                      cleanerLugar.limpiarListaDropdown(
                                        this.state.lugares.filter( l => l.lugar_id === this.state.lugar.municipio_id)
                                      )
                                    }
                        />
                    </div>
            </div>
            <GuardarCancelar 
                position="center"
                storeData={this.handleGuardar}
                success={this.handleCancelar}
                decline={this.handleCancelar}
            />

            {this.state.goCliente && <Redirect push to="/cliente" /> }
      </div>
    </div>  
  )
}
