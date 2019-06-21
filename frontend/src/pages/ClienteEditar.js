import React from 'react';
import axios from 'axios';

import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

import {cleanerCliente} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";

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
  })
  }

  handleGuardar = (e) => {
    e.preventDefault()
    const nuevo_cliente = { 
        ...this.state.nuevo_cliente,
        compuestos: this.state.compuestos
    }

    console.log(`----> localhost:4000/modificar/cliente`)
    axios.post('http://127.0.0.1:4000/modificar/cliente', 
        {  
            "c_id_cliente" : nuevo_cliente.c_id_cliente,
            "c_nombre" : nuevo_cliente.c_nombre,
            "c_rif" : nuevo_cliente.c_rif , 
            "c_telefono" : nuevo_cliente.c_telefono, 
            "lugar_id" : nuevo_cliente.lugar_id
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

  handleChange = ({target}) => {
    this.setState({
        nuevo_cliente : {
            ...this.state.nuevo_cliente,
            [target.name] : target.value
        }
    })
  }
  
  render = () => (
    <div>
        <MenuDashBoard title={`Editar Cliente: ${this.state.nuevo_cliente.c_nombre}`}/>        

        <div>

            <div className="CrearElemento">
                <form>
                    <p>
                        <span className="mc-atributo">Nombre</span><span> : </span>
                        <input 
                            name="c_nombre"
                            type="text"
                            placeholder=" nombre ..."
                            value={this.state.nuevo_cliente.c_nombre}
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <span className="mc-atributo">RIF</span><span> : </span>
                        <input 
                            name="c_rif"
                            type="text"
                            placeholder=" RIF ..."
                            value={this.state.nuevo_cliente.c_rif}
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <span className="mc-atributo">Teléfono</span><span> : </span>
                        <input 
                            name="c_telefono"
                            type="text"
                            placeholder=" teléfono ..."
                            value={this.state.nuevo_cliente.c_telefono}
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <span className="mc-atributo">Ubicación</span><span> : </span>
                        <input 
                            name="lugar_id"
                            type="text"
                            placeholder=" lugar_id ..."
                            value={this.state.nuevo_cliente.lugar_id}
                            onChange={this.handleChange}
                        />
                    </p>
                      
                </form>
            </div>
            <div className="botones-abajo">
                <Button
                    variant="primary"
                    type="submit"
                    className="mc-boton mc-boton-guardar"
                    onClick={(e) => this.handleGuardar(e)}
                >
                    Guardar
                </Button>

                <Button
                    variant="secondary"
                    className="mc-boton"
                    onClick={this.handleCancelar}
                >
                    Cancelar
                </Button>
            </div>

            {this.state.goCliente && <Redirect to="/cliente" /> }
      </div>
    </div>  
  )
}
