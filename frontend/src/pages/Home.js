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
                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    A architecto assumenda aut consequatur eaque eos fuga, ipsam libero,
                    quibusdam reprehenderit sapiente temporibus, vero voluptate.
                    Accusantium alias assumenda doloribus molestias praesentium."/>}
    {<HomeContainer left={false} image="images/home/minera.jpg" title="Contacto" center="right"
                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    A architecto assumenda aut consequatur eaque eos fuga, ipsam libero,
                    quibusdam reprehenderit sapiente temporibus, vero voluptate.
                    Accusantium alias assumenda doloribus molestias praesentium."/>
    }
    {<HomeContainer left={true} image="images/home/minera.jpg" title="Contacto" center="right"
                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                   A architecto assumenda aut consequatur eaque eos fuga, ipsam libero,
                   quibusdam reprehenderit sapiente temporibus, vero voluptate.
                   Accusantium alias assumenda doloribus molestias praesentium."/>
    }
  </div>)
}
