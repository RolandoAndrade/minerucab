import React from 'react';
import {MenuDashBoard} from "./MenuDashBoard";
import {Redirect} from "react-router-dom";

export class HeaderLogin extends React.Component {
  constructor(props){
    super(props)

    this.state = {
        showDashboard : false,
        goToDashBoard: false
    }
  }

  handleShowDashboard  = () =>
  {
    MenuDashBoard.clickMenu()
  };

   goDash = () =>
   {
       this.setState({goToDashBoard: true});
   };

   logout = () => {
    localStorage.clear()
    location.reload()
   }

  render = () => (

    <div className="HeaderLogin">
        <div className="HeaderContent align-left">
            {<i id="IconoMenu" className="zmdi zmdi-menu zmdi-hc-3x IconoMenu" onClick={this.handleShowDashboard} style={this.props.hideMenuButton?{visibility:"hidden"}:{}}/>}
        </div>
        <div className="HeaderContent align-center">
            <div className="HeaderTitle" onClick={this.goDash}>MinerUCAB</div>
        </div>
        <div className="HeaderContent align-right">
            <i className="fas fa-sign-out-alt fa-3x IconoUser"
                onClick={this.logout}
            />
        </div>
        {this.state.goToDashBoard && <Redirect push to="../../dashboard" /> }
    </div>
    )

}
