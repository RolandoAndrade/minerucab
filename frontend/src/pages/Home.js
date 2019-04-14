import React from 'react';

export class Home extends React.Component {

  login = () => {
    // PARA LLEVAR EL LOG DE LO QUE VA PASANDO DESDE LA CONSOLA
    console.log("Home.login()")
  }

  render = () => (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">MinerUCAB</h1>
        <p>Controlando el mercado de los minerales.</p>
        <button className="button" onClick={this.login}>Login with Google</button>
      </div>
    </div>
  )
}
