import React from 'react';
import axios from 'axios';

import {Modal, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import MaterialTable from 'material-table';

import {cleanerCliente} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";
import {InputText} from "../components/InputText";
import {InputDate} from "../components/InputDate";

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

      })
  }

  handleGuardar = (e) => {
    e.preventDefault()
    const nuevo_cliente = { 
        ...this.state.nuevo_cliente,
        compuestos: this.state.compuestos
    }

    console.log(`----> localhost:4000/insertar/cliente`)
    axios.post('http://127.0.0.1:4000/insertar/cliente', 
        {
            "c_nombre" : nuevo_cliente.c_nombre,
            "c_rif" : nuevo_cliente.c_rif , 
            "c_telefono" : nuevo_cliente.c_telefono, 
            "lugar_id" : nuevo_cliente.lugar_id
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
        <MenuDashBoard title="Agregar cliente"/>

        <div>

            <div className="CrearElemento">
                <form>
                    <p>
                        <span className="mc-atributo">Nombre</span><span> : </span>
                        <input 
                            name="c_nombre"
                            type="text"
                            placeholder=" nombre ..."
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <span className="mc-atributo">RIF</span><span> : </span>
                        <input 
                            name="c_rif"
                            type="text"
                            placeholder=" RIF ..."
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <span className="mc-atributo">Teléfono</span><span> : </span>
                        <input 
                            name="c_telefono"
                            type="text"
                            placeholder=" teléfono ..."
                            value={this.state.c_telefono}
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <span className="mc-atributo">Ubicación</span><span> : </span>
                        <input 
                            name="lugar_id"
                            type="text"
                            placeholder=" lugar_id ..."
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
