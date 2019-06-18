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
        <div className="HeaderContent align-left">
            {<i id="IconoMenu" className="zmdi zmdi-menu zmdi-hc-3x IconoMenu" onClick={this.handleShowDashboard} style={this.props.hideMenuButton?{visibility:"hidden"}:{}}/>}
        </div>
        <div className="HeaderContent align-center">
            <div className="HeaderTitle">MinerUCAB</div>
        </div>
        <div className="HeaderContent align-right">
            <i className="fas fa-user-circle fa-3x IconoUser"/>
        </div>

    </div>
    )

}
