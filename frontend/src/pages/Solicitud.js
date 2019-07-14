import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerEmpleado} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Solicitud extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      solicitudes : [],
      textoBuscardor : "",
      consultarSolicitud : null,
      agregarPresionado : null,
    }
  }

  componentDidMount = () => {
    // API REQUEST GET
    console.log(`----> localhost:4000/consultarLista/solicitud`)
    axios.get('http://127.0.0.1:4000/consultarLista/solicitud')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/solicitud`)

        this.setState({
            solicitudes : res.data.rows
        })

      })
  }

  handleAgregar = () => {
    console.log("handleAgregar")
    this.setState({
      agregarPresionado : true
    })
  }

  handleConsultar = (id) => {
    console.log(`consultarSolicitud(${id})`)
    const consultarSolicitud = this.state.solicitudes.find( s => s.s_id_solicitud == id)

    this.setState({
      consultarSolicitud
    })
  }

  handleModificar = () => {
    console.log(`modificarEmpleado(${this.state.consultarSolicitud.s_id_solicitud})`)
    this.setState({
      modificarEmpleado : this.state.consultarSolicitud.s_id_solicitud
    })
  }

  handleEliminar = () => {
    console.log(`eliminarEmpleado(${this.state.consultarSolicitud.s_id_solicitud})`)

    this.setState({
      warningEliminar : true
    })

  }

  handleCloseEliminar = () => {
    this.setState({
      warningEliminar : false
    })
  }

  handleEliminarSeguro = () => {
    console.log(`----> localhost:4000/eliminar/solicitud/${this.state.consultarSolicitud.s_id_solicitud}`)
    axios.post('http://127.0.0.1:4000/eliminar/solicitud', 
        {
            "e_id_empleado" : this.state.consultarSolicitud.s_id_solicitud,
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/eliminar/solicitud`)
                this.handleCloseModal()
                this.handleCloseEliminar()
                location.reload()
            }
        })
  }

  handleCloseModal = () => {
    this.setState({
      consultarSolicitud: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Empleados"}/>

        <div className="ConsultarLista">
          { this.state.solicitudes &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 's_id_solicitud', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'desc',
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  }, 
                },
                {
                  title: 'Proyecto', field: 'p_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: 'Fecha Solicitud', field: 's_fecha_solicitud', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Fecha Pago', field: 's_fecha_pago', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Estado', field: 'e_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                }
              ]}
              data={ this.state.solicitudes }
              title={null}
              
              options={{
                headerStyle: {
                  backgroundColor: '#0C5426',
                  color: "white",
                  fontSize: "large"
                },
                searchFieldAlignment: "left",
                exportButton: true,
                exportFileName: "empleados"
              }}

              onRowClick={(event, rowData) => this.handleConsultar(rowData.s_id_solicitud)}
              localization={{
                toolbar : {
                  searchPlaceholder : "Buscar ..."
                }
              }}

              actions={[
                {
                  icon : () => <img 
                    src="../resources/icons/Agregar.png"
                    width="25px"
                    onClick={this.handleAgregar}
                    className="IconoAgregar"
                  />,
                  tooltip: 'Agregar',
                  isFreeAction: true
                }
              ]}

            />
          }
    </div>
    </div>
  )
}
