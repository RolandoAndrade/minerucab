import React from 'react';
import {TestPlayGround} from "../pages/TestPlayGround";

export class HeaderLogin extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      showDashboard : false
    }
  }

  handleShowDashboard  = () => {
    TestPlayGround.clickMenu()
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
