import React from 'react';



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
    {this.state.array.filter(
      (e) => e > 2 )
      .map( (e , posicion) => (
      <div className="">
        <div className="">
          <h1 className="box-layout__title">MinerUCAB</h1>
          {this.state.ver ? 
            <p>{posicion}</p> :
            <p>{posicion}</p>
          }
          <button className="button" onClick={this.login}>Login with Google</button>
        </div>
      </div>
    ))}
  </div>)
}
