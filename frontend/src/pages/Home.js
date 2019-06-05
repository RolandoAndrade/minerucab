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
    <div>

    {<HomeHeader/>}
    {<HomeContainer left={true} image="images/home/minera.jpg"
                    text="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    A architecto assumenda aut consequatur eaque eos fuga, ipsam libero,
                    quibusdam reprehenderit sapiente temporibus, vero voluptate.
                    Accusantium alias assumenda doloribus molestias praesentium."/>}

  </div>)
}
