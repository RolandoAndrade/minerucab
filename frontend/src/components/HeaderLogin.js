import React from 'react';
import {MenuDashBoard} from "./MenuDashBoard";

export class HeaderLogin extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      showDashboard : false
    }
  }

  handleShowDashboard  = () => {
    MenuDashBoard.clickMenu()
  }

  render = () => (

    <div className="HeaderLogin">
        {!this.props.hideMenuButton?<i className="fas fa-bars fa-2x IconoMenu" onClick={this.handleShowDashboard}/>:
            <i className="fas fa-bars fa-2x IconoMenu" onClick={this.handleShowDashboard} style={{visibility: "hidden"}}/>}


      <h1>MinerUCAB</h1>
      <i 
        className="fas fa-user-circle fa-3x IconoUser"
      />
    </div>
    )

}
