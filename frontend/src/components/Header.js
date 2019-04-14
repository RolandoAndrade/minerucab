import React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component {

  logout = () => {
    // PARA LLEVAR EL LOG DE LO QUE VA PASANDO DESDE LA CONSOLA
    console.log("Header.logout()")
  }

  render = () => (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>MinerUCAB</h1>
          </Link>
          <button className="button button--link" onClick={this.logout}>Logout</button>
        </div>
      </div>
    </header>
  )
}
