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

export class ClienteEditar extends React.Component {
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
        lugares:[],
        lugar : {
                estado_id : 0,
                municipio_id : 0,
                parroquia_id : 0
            },
        textoBuscardor: "",
        goCliente : false
    }
  }

  componentDidMount = () => {
    const id = Number.parseInt(this.props.location.pathname.split("/")[3] , 10)

    console.log(`----> localhost:4000/consultarLista/cliente`)
    axios.get('http://127.0.0.1:4000/consultarLista/cliente')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/cliente`)

        this.setState({
            clientes : res.data.rows
        })
        
        return res.data.rows
      })
      .then( (clientes) => {
        const cliente = clientes.find( c => c.c_id_cliente === id)
        this.setState({
            nuevo_cliente : { 
                ...cliente,
                "c_id_cliente" : cliente.c_id_cliente,
                "c_nombre" : cliente.c_nombre,
                "c_rif" : cliente.c_rif , 
                "c_telefono" : cliente.c_telefono, 
                "lugar_id" : cliente.lugar_id
            }
        })
        axios.get('http://127.0.0.1:4000/consultarLista/lugar')
          .then( (res) => {
            if(res.status === 200)
              console.log(`----> localhost:4000/consultarLista/lugar`)
                axios.get('http://127.0.0.1:4000/consultarLista/lugar')
                .then( (res) => {
                    if(res.status === 200)
                        console.log(`<---- (OK 200) localhost:4000/consultarLista/lugar`)
            
                    this.setState({
                        lugares : res.data.rows
                    },
                        () => this.establecerLugar()
                    )
                    console.log(this.state)
                })
          })
  })
  }
    establecerLugar = () => {
        const parroquia = this.state.lugares.filter( 
            l => l.l_id_lugar === this.state.nuevo_cliente.lugar_id 
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
  handleGuardar = () => {
    console.log(`----> localhost:4000/modificar/cliente`)
    axios.post('http://127.0.0.1:4000/modificar/cliente', 
        {  
            "c_id_cliente" : this.state.nuevo_cliente.c_id_cliente,
            "c_nombre" : this.state.nuevo_cliente.c_nombre,
            "c_rif" : this.state.nuevo_cliente.c_rif , 
            "c_telefono" : this.state.nuevo_cliente.c_telefono, 
            "lugar_id" : this.state.lugar.parroquia_id
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/modificar/cliente`)
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
        target = target.target || target
        console.log(`nuevo_empleado.${target.name} = ${target.value}`)
        this.setState({
            nuevo_cliente :{
                ...this.state.nuevo_cliente,
                [target.name] : target.value
            }
        })
      }

    handleChangeLugar = (target) => {
        console.log(`lugar.${target.name} = ${target.value}`)
        this.setState({
            lugar : {
                ...this.state.lugar,
                [target.name] : target.value
            }
        })
    }
  
  render = () => (
    <div>
        <MenuDashBoard title={`Editar Cliente: ${this.state.nuevo_cliente.c_nombre}`}/>        

        <div>
        {this.state.lugar.estado?
            <div className="CrearElemento">
                    <div className="firstColumn">
                        <div className="mc-atributo">Nombre: </div>
                    </div>
                    <div className="secondColumn">
                        <InputText
                            id={"c_nombre"}
                            name={"c_nombre"}
                            label="Nombre"
                            value={this.state.nuevo_cliente.c_nombre}
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
                            value={this.state.nuevo_cliente.c_rif}
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
                            value={this.state.nuevo_cliente.c_telefono}
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
                                  defaultText={this.state.lugar.estado.l_nombre}
                                  defaultID={this.state.lugar.estado.l_id_lugar}
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
                                defaultText={this.state.lugar.municipio.l_nombre}
                                  defaultID={this.state.lugar.municipio.l_id_lugar}
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
                                defaultText={this.state.lugar.parroquia.l_nombre}
                                  defaultID={this.state.lugar.parroquia.l_id_lugar}
                                  retrieveData={this.handleChangeLugar}
                                  placeholder="Parroquia donde vive..."
                                  options={
                                      cleanerLugar.limpiarListaDropdown(
                                        this.state.lugares.filter( l => l.lugar_id === this.state.lugar.municipio_id)
                                      )
                                    }
                        />
                    </div>
            </div>:""}
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
