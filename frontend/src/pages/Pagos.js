import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {InputText} from "../components/InputText";
import {Dropdown} from "../components/Dropdown";
import {MenuDashBoard} from "../components/MenuDashBoard";
import {GuardarCancelar} from "../components/GuardarCancelar";
import {cleanerCliente, cleanerLugar, cleanerMineral, cleanerProducto} from "../utils/cleaner";
import {Loader} from "../components/Loader";

const IVA = 1.16;
const UNIDAD_ID=7;

export class Pagos extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            
        }

    }

    componentDidMount = () => {
        
    }

    handleGuardar = () =>
    {

        

    };

    goSolicitud = () =>
    {
       
    };


   

    handleChange = (target) =>
    {
        target = target.target || target;
        this.setState({
            [target.name]: target.value
        })
    };

   

    getTotal()
    {
        let total=0;
        for(let i=0;i<this.state.minerales.length;i++)
        {
            total+=this.state.minerales[i].precio*this.state.minerales[i].cantidad;
        }
        this.setState({
            subtotal: (Math.floor(total*100)/100).toFixed(2),
            total:(Math.floor(total*IVA*100)/100).toFixed(2)
        });
    }

    render = () => (
        <div>
            <MenuDashBoard title="Pagar"/>
            {this.state.loading && <Loader/>}
        </div>
    )
}