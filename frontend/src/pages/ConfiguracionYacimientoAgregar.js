import React from 'react';
import axios from 'axios';

import {DropdownButton, Dropdown, Button} from 'react-bootstrap';

import {MenuDashBoard} from "../components/MenuDashBoard";

export class ConfiguracionYacimientoAgregar extends React.Component {
    constructor(props){
      super(props)
      
      this.state  = {
        minerales : [],
        principal : {
            m_nombre: "Mineral...",
            m_antidad: null},
        requisitos : [],
        seleccionados: []
      }
    }

    componentDidMount = () => {
        console.log(`----> localhost:4000/consultarLista/mineral `)
        axios.get('http://127.0.0.1:4000/consultarLista/mineral')
            .then( (res) => {
                if(res.status === 200) {
                    console.log(`<---- (OK 200) localhost:4000/consultarLista/mineral`)
                    this.setState({
                        minerales : res.data.rows
                    })
                }else {
                    console.log(`<---- (ERROR 500) localhost:4000/consultarLista/mineral`)
                }
            })
    }
    
    handleAgregarRequisito = () => {
        this.setState( (prev) => ({
            requisitos:[...prev.requisitos, {
                m_nombre: "Mineral...",
                m_cantidad: null}]
        }))
    }

    handleSeleccionarPrincipal = (valorNuevo, valorViejo) => {
        const nuevosSeleccionados = this.state.seleccionados.filter(s => s !== valorViejo.toLowerCase())
        this.setState( (prev) => ({
            principal:{
                ...prev.principal,
                m_nombre :  valorNuevo
            },
            seleccionados: [...nuevosSeleccionados, valorNuevo.toLowerCase()]
        }))
    }

    handleSeleccionarRequisito = (valorNuevo, valorViejo, index) => {
        const nuevosSeleccionados = this.state.seleccionados.filter(s => s !== valorViejo.toLowerCase())
        const lista = this.state.requisitos.map( (req,posicion) => {
            if (posicion === index){
                req.m_nombre = valorNuevo
            }
            return req
        });
        this.setState( (prev) => ({
                seleccionados: [...nuevosSeleccionados, valorNuevo.toLowerCase()],
                requisitos: lista

            }));
    }

    render = () => (
        <div>   
             <MenuDashBoard title={"Crear Configuracion de Yacimiento"}/>

             <div>
                {/* sobre el mineral, debo agregar el fondo gris*/}
                <div className="info-mineral">
                    <h1 className = "subtitulo-centrado">Sobre el mineral</h1>
                    <div > 
                        <div className="horizontal ">
                            <div > {/*Todas las lineas de info */}
                                <div className="horizontal pegar-derecha"> {/* primera linea */}
                                    <p className="separador"> Mineral a explotar</p>
                                    <DropdownButton className="dropdown-minerUcab separador" title={this.state.principal.m_nombre}>
                                        {
                                            this.state.minerales ?
                                            this.state.minerales.filter( 
                                                (m) => !this.state.seleccionados.includes( m.m_nombre.toLowerCase())
                                            ).map(
                                                (mineral) => (
                                                    <Dropdown.Item 
                                                        onSelect={ () => this.handleSeleccionarPrincipal(mineral.m_nombre, this.state.principal.m_nombre) }
                                                    >
                                                        {mineral.m_nombre}
                                                    </Dropdown.Item>
                                                )
                                            ):<Dropdown.Item>Mineral...</Dropdown.Item>
                                        }
                                    </DropdownButton>
                                    <input 
                                        type="text"
                                        placeholder="cantidad"
                                        className="largo-input separador"
                                    />
                                    <p className="separador"> de toneladas</p>
                                </div>
                                <p className = "subtitulo-centrado" > Minerales necesarios para su explotacion</p>
                                <div> {/*lista dinamica de minerales */}
                                    {
                                        this.state.requisitos.map(
                                            (requisito, index) => (
                                                <div className="pegar-derecha">
                                                    {/*aqui va la x */}
                                                    <img></img>
                                                    <DropdownButton className="dropdown-minerUcab separador" title={requisito.m_nombre}>
                                                        {
                                                            this.state.minerales ?
                                                            this.state.minerales.filter( 
                                                                (m) => !this.state.seleccionados.includes( m.m_nombre.toLowerCase())
                                                            ).map(
                                                                (mineral) => (
                                                                    <Dropdown.Item onSelect={() => this.handleSeleccionarRequisito(mineral.m_nombre, requisito.m_nombre,index)}>
                                                                        {mineral.m_nombre}
                                                                    </Dropdown.Item>
                                                                )
                                                            ):<Dropdown.Item >Mineral...</Dropdown.Item>
                                                        }
                                                    </DropdownButton>
                                                    <input 
                                                        type="text"
                                                        placeholder="cantidad"
                                                        className="largo-input separador"
                                                    />
                                                    <p className="separador"> de toneladas</p>
                                                </div>
                                            )
                                        )
                                    }
                                    <div className="pegar-derecha">
                                        <Button variant="primary" className="agregar-otro" onClick={this.handleAgregarRequisito} >
                                            Agregar requisito
                                        </Button>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            
                        </div>
                        <div> 
                            {/* Aqui va la imagen */}

                        </div>
                        
                    </div>
                    
                </div>

             </div>
        </div>
    )
}