import React from 'react';
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";

export class HomeHeader extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            goToDashBoard: false

        }
    }

    login()
    {
        /*
        Swal.fire({
            title: 'Iniciar sesión',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            confirmButtonColor: ""
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your imaginary file has been deleted.',
                    'success'
                )
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })*/

        this.setState({
                goToDashBoard: true
        }
        );
    }


    render = () => (
        <div className="HeaderContainer">
        <div className="HeaderHome">
            <div className="HeaderContent align-left">
                <img src="images/logo.png" className="HeaderHomeLogo"/>
            </div>
            <div className="HeaderContent align-center">
                <div className="HeaderTitle">MinerUCAB</div>
            </div>
            <div className="HeaderContent align-right">
                <div className="LoginButton" onClick={()=>this.login()}>Ingresar<i className="fa fa-sign-in-alt"></i></div>
            </div>
            {this.state.goToDashBoard&&<Redirect push to="/dashboard"/>}
        </div>
        </div>
    )
}
