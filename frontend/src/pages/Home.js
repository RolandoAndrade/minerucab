import React from 'react';
import {HomeHeader} from '../components/HomeHeader'
import {HomeContainer} from "../components/HomeContainer";
import {SubHeader} from "../components/SubHeader";

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
    {<SubHeader/>}
    <div className="HomeContent">
    {
      <HomeContainer left={true} image="resources/img/Home01.jpg" title="Historia" center="right"
                    text="En 1887 por iniciativa de un grupo de empresarios venezolanos nace la Corporación constituida en ciudad
Bolívar, siendo las primeras minas en operación: Tumeremo. En 1967 es designado Presidente del Consejo de Administración el
Lic. Pedro Pérez, quien ocupa el cargo a la fecha. En 1968 se constituye a la Corporación como empresa controladora, la que a su vez inicia su cotización en la
Bolsa de Valores de Venezuela. En 1974 se inaugura la Refinería de Zinc en Bailadores Estado Mérida. En 2010 La Corporación se convierte en la primer empresa venezolana pionera en exportación de oro de
América Latina. En 2015 la Corporación recibe un reconocimiento por parte del ejecutivo nacional como empresa líder en el
mercado minero."/>}
    {<HomeContainer left={false} image="resources/img/Home02.jpg" title="Nosotros" center="center"
                    text="MinerUCAB es una corporación nacional orgullosamente venezolana con 130 años de trayectoria, siendo uno de los actores clave en los sectores minero - metalúrgico y químico del país.
                    Nosotros como la gran corporación nacional de desarrollo mineral nos dedicamos a la explotación de
distintos miner     les presentes en Venezuela, sin embargo el 80% de nuestro trabajo va destinado a la
explotación del     carbón."/>
    }
    {<HomeContainer left={true} image="resources/img/Home03.jpg" title="Contacto" center="center"
                    text={["(212) 58743214","(212) 11987544","contacto@minerucab.ve","@minerucab"]}
                    icons={["zmdi zmdi-phone","zmdi zmdi-phone","zmdi zmdi-email","zmdi zmdi-twitter"]}/>
    }
    </div>
  </div>)
}
