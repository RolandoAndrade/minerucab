import React from 'react';
import {HomeHeader} from '../components/HomeHeader'
import {HomeContainer} from "../components/HomeContainer";


export class Home extends React.Component {
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
    <div className="Home">

    {<HomeHeader/>}
        {<div className="SubHeaderHome">
            <div className="HeaderSubTitle y">Historia</div>
            <div className="HeaderSubTitle b">Nosotros</div>
            <div className="HeaderSubTitle g">Contacto</div>
        </div>}
    {<HomeContainer left={true} image="images/home/minera.jpg" title="Historia" center="right"
                    text="En 1887 por iniciativa de un grupo de empresarios venezolanos nace la Corporación constituida en ciudad
Bolívar, siendo las primeras minas en operación: Tumeremo. En 1967 es designado Presidente del Consejo de Administración el
Lic. Pedro Pérez, quien ocupa el cargo a la fecha. En 1968 se constituye a la Corporación como empresa controladora, la que a su vez inicia su cotización en la
Bolsa de Valores de Venezuela. En 1974 se inaugura la Refinería de Zinc en Bailadores Estado Mérida. En 2010 La Corporación se convierte en la primer empresa venezolana pionera en exportación de oro de
América Latina. En 2015 la Corporación recibe un reconocimiento por parte del ejecutivo nacional como empresa líder en el
mercado minero."/>}
    {<HomeContainer left={false} image="images/home/minera2.jpg" title="Nosotros" center="center"
                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    A architecto assumenda aut consequatur eaque eos fuga, ipsam libero,
                    quibusdam reprehenderit sapiente temporibus, vero voluptate.
                    Accusantium alias assumenda doloribus molestias praesentium."/>
    }
    {<HomeContainer left={true} image="images/home/minera3.jpg" title="Contacto" center="center"
                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                   A architecto assumenda aut consequatur eaque eos fuga, ipsam libero,
                   quibusdam reprehenderit sapiente temporibus, vero voluptate.
                   Accusantium alias assumenda doloribus molestias praesentium."/>
    }
  </div>)
}
