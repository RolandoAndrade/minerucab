import React from 'react';

import {HeaderLogin} from '../components/HeaderLogin'
import {ConsultarLista} from '../components/ConsultarLista'


export class Mineral extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      ver : true,
      texto: "hola",
      array: [1,2,3,4]
    }
  }

  login  = () => {
    // PARA LLEVAR EL LOG DE LO QUE VA PASANDO DESDE LA CONSOLA
    this.setState({
      array : [...this.state.array, 5] 
    })
    console.log("Home.login()")
  }

  render = () => (
    <div>
        <HeaderLogin />

        <ConsultarLista
            tabla="Mineral"
            columnas={["ID", "Nombre", "esMetal?", "esRadioactivo?", "Nacionalizado"]}
        >
            <span>BotonAgregar</span>
            <span>Hola1</span>
        </ ConsultarLista>
    </div>
    )
}
