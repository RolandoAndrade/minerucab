import React from 'react';
import Swal from "sweetalert2";
import {Redirect} from "react-router-dom";
import {InputText} from "../components/InputText";
import {Modal, Button} from 'react-bootstrap';
import axios from 'axios';


export class HomeHeader extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            goToDashBoard: false

        }
    }

    abrirModal = () => {
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
            loginModal: true
        })
        // 'zemlak.augustine@yahoo.com','ghav6693qw08'
    }

    closeModal = () => {
        this.setState({
            loginModal: false,
            intento : null
        })
    }

    handleChange = (target) => {
        target = target.target || target
        console.log(`${target.name} = ${target.value}`)
        this.setState({
            [target.name] : target.value
        })
      }

    login = () => {
        console.log(`----> localhost:4000/login/usuario`)
        return axios.post('http://127.0.0.1:4000/login/usuario', {
            u_correo : this.state.userName,
            u_clave : this.state.password
        })
            .then( (res) => {
                if( res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/login/usuario`)
                    localStorage.setItem("user", JSON.stringify( res.data.usuario ) )
                    location.reload()
                }
                return res
            })
            .catch( (err) => {
                let intento = this.state.intento
                this.setState({
                    intento : !!intento ? intento+1 : 1
                })
            })
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
                <div className="LoginButton" onClick={this.abrirModal}>Ingresar  <i className="fa fa-sign-in-alt"></i></div>
            </div>
            {this.state.goToDashBoard&&<Redirect push to="/dashboard"/>}

                <Modal 
                    size="lg"
                    show={!!this.state.loginModal} 
                    onHide={this.closeModal}
                    centered
                    dialogClassName="ModalConsultar"
                >
                    <Modal.Header closeButton className="mc-header">
                        <div></div>
                        <h1>LOGIN</h1>
                    </Modal.Header>

                    <Modal.Body className="mc-body"> 
                        <InputText
                            id="usuario"
                            name="userName"
                            label="Usuario"
                            onChange={this.handleChange}
                            styles={{width: "100%"}}
                        />
                        <InputText
                            type="password"
                            id="clave"
                            name="password"
                            label="Contraseña"
                            onChange={this.handleChange}
                            styles={{width: "100%"}}
                        />
                        { !!this.state.intento &&
                            <p style={{color: "red"}}> 
                                {`Credenciales incorrectas - Intento (${this.state.intento})`}
                            </p>
                        }
                        <div style={{float : "right"}}>
                            <Button variant="success" className="mc-boton" 
                                onClick={this.login}
                            >
                                Ingresar
                            </Button>
                        </div>
                        
                    </Modal.Body>
                    
                    <Modal.Footer className="mc-footer">
                        
                    </Modal.Footer>
                </Modal>
        </div>
        </div>
    )
}
