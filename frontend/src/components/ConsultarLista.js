import React from 'react';

import {API} from '../API/API'

export class ConsultarLista extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      textoBuscardor : null,
    }
  }

  handleBuscar  = (e) => {
    this.setState({
        textoBuscardor : e.target.value,
    })
  }

  componentDidMount = () => {
    this.setState({
        tuplas : API.consultarTodos(this.props.tabla)
    })
  }

  render = () => (
      <div>
        <div className="TituloTabla">
            <h1>{this.props.tabla}</h1>
        </div>

        <div className="Buscador">
            <input
                type="text"
                placeholder="Buscar nombre..." 
                onChange={this.handleBuscar}
            />
            <img 
                src="../resources/icons/Agregar.png"
                width="25px"
                onClick={this.props.handleAgregar}
                className="IconoAgregar"
            />
        </div>

        <div className="Tabla">
            <div className="Columnas">
                {this.props.columnas.map( (columna,i) => (
                    <p 
                        className="TituloColumna"
                        key={i}
                    >
                        {columna}
                    </p>
                ))}
            </div>

            {this.state.tuplas && this.state.tuplas.map ( (tupla, i) => (
                <div className="Tupla">
                    {   
                        Object.keys(tupla).map( (atributo) => (
                            <p 
                                className="Atributo"
                            >
                                {tupla[atributo]}
                            </p>   
                        ))
                    }
                </div>
            ))}
        </div>
    </div>
    )
}
