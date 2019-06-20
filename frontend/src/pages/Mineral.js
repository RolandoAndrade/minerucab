import React from 'react';
import axios from 'axios';

import {Redirect} from 'react-router-dom';
import {Modal, Button} from 'react-bootstrap';
import MaterialTable from 'material-table';

import {cleanerMineral} from '../utils/cleaner';
import {MenuDashBoard} from "../components/MenuDashBoard";

export class Mineral extends React.Component {
  constructor(props){
    super(props)
    
    this.state  = {
      minerales : [],
      textoBuscardor : "",
      consultarMineral : null,
      agregarPresionado : null
    }
  }

  componentDidMount = () => {
    // API REQUEST GET
    console.log(`----> localhost:4000/consultarLista/mineral`)
    axios.get('http://127.0.0.1:4000/consultarLista/mineral')
      .then( (res) => {
        if(res.status === 200)
          console.log(`<---- (OK 200) localhost:4000/consultarLista/mineral`)

        this.setState({
            minerales : res.data.rows
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
    console.log(`consultarMineral(${id})`)
    const consultarMineral = this.state.minerales.find( m => m.m_id_mineral == id)

    this.setState({
      consultarMineral
    })
  }

  handleModificar = () => {
    console.log(`modificarMineral(${this.state.consultarMineral.m_id_mineral})`)
    this.setState({
      modificarMineral : this.state.consultarMineral.m_id_mineral
    })
  }

  handleEliminar = () => {
    console.log(`eliminarMineral(${this.state.consultarMineral.m_id_mineral})`)

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
    console.log(`----> localhost:4000/eliminar/mineral/${this.state.consultarMineral.m_id_mineral}`)
    axios.post('http://127.0.0.1:4000/eliminar/mineral', 
        {
            "m_id_mineral" : this.state.consultarMineral.m_id_mineral,
        })
        .then( (res) => {
            if( res.status === 200) {
                console.log(`<---- (OK 200) localhost:4000/eliminar/mineral`)
                this.handleCloseModal()
                this.handleCloseEliminar()
                location.reload()
            }
        })
  }

  handleCloseModal = () => {
    this.setState({
      consultarMineral: null
    })
  }
    
  render = () => (
    <div>
        <MenuDashBoard title={"Minerales"}/>

        <div className="ConsultarLista">
          { this.state.minerales &&
            <MaterialTable
              style={{margin: "0 5%"}}
              columns={[
                {
                  title: 'ID', field: 'm_id_mineral', type: 'string', headerStyle:{ textAlign : "center"}, defaultSort : 'asc',
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  }, 
                },
                {
                  title: 'Nombre', field: 'm_nombre', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"                    
                  },
                },
                {
                  title: '¿Metal?', field: 'm_metalico', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: '¿Radioactivo?', field: 'm_radioactivo', type: 'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign : "center"
                  },
                },
                { 
                  title: 'Nacionalizado', field: 'm_fecha_nacionalizacion', type:'string', headerStyle:{ textAlign : "center"},
                  cellStyle : {
                    fontSize : "large",
                    textAlign: "center"
                  },
                }
              ]}
              data={ cleanerMineral.limpiarLista( this.state.minerales ) }
              title={null}
              
              options={{
                headerStyle: {
                  backgroundColor: '#0C5426',
                  color: "white",
                  fontSize: "large"
                },
                searchFieldAlignment: "left",
                exportButton: true,
                exportFileName: "Minerales"
              }}

              onRowClick={(event, rowData) => this.handleConsultar(rowData.m_id_mineral)}
              localization={{
                toolbar : {
                  searchPlaceholder : "Buscar ..."
                }
              }}

              actions={[
                {
                  icon: () => <img 
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
          
          {!!this.state.consultarMineral && 
          <Modal 
            size="lg"
            show={!!this.state.consultarMineral} 
            onHide={this.handleCloseModal}
            centered
            scrollable
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>{this.state.consultarMineral.m_nombre.toUpperCase()}</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <p>
                <span className="mc-atributo">ID</span>
                <span> : {this.state.consultarMineral.m_id_mineral.toString(10).padStart(4, '0')}</span>
              </p>
              <p>
                <span className="mc-atributo">¿Metal?</span>
                <span> : {this.state.consultarMineral.m_metalico ? "Si" : "No"}</span>
              </p>
              <p>
                <span className="mc-atributo">¿Radioactivo?</span>
                <span> : {this.state.consultarMineral.m_radioactivo ? "Si" : "No"}</span>
              </p>
              <p>
                <span className="mc-atributo">Nacionalizado</span>
                <span> : {this.state.consultarMineral.m_fecha_nacionalizacion ? this.state.consultarMineral.m_fecha_nacionalizacion.split('T')[0] : "No"}</span>
              </p>
              <p>
                <span className="mc-atributo">Descripción</span>
                <span> : {this.state.consultarMineral.m_descripcion || "El mineral no posee descripción"}</span>
              </p>
              <p><span className="mc-atributo">Yacimientos</span><span> :</span></p>
              { this.state.consultarMineral.yacimientos ?
                this.state.consultarMineral.yacimientos.map( (yacimiento, i) => (
                  <p className="mc-multivalor" key={i}>- {yacimiento}</p>
                )) :
                <p className="mc-multivalor">El mineral no se ha registrado en ningún yacimiento.</p>
              }
              <p><span className="mc-atributo">Compuesto de</span><span> :</span></p>
              { this.state.consultarMineral.compuestos ?
                this.state.consultarMineral.compuestos.map( (compuesto, i) => (
                  <p className="mc-multivalor" key={i}>- {compuesto.nombre}</p>
                )) :
                <p className="mc-multivalor">El mineral no esta compuesto de otros minerales.</p>
              }
             
            </Modal.Body>
            
            <Modal.Footer className="mc-footer">
              <Button variant="primary" className="mc-boton mc-boton-guardar" onClick={this.handleModificar}>
                Modificar
              </Button>

              <Button variant="danger" className="mc-boton" onClick={this.handleEliminar}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
          }

          {!!this.state.warningEliminar && 
          <Modal 
            size="lg"
            show={!!this.state.warningEliminar} 
            onHide={this.handleCloseEliminar}
            centered
            dialogClassName="ModalConsultar"
          >
            <Modal.Header closeButton className="mc-header">
              <div></div>
              <h1>ADVERTENCIA !!</h1>
            </Modal.Header>

            <Modal.Body className="mc-body"> 
              <div>
                <p style={{textAlign: "center"}}>{`¿Estas segur@ que deseas eliminar el ${this.state.consultarMineral && this.state.consultarMineral.m_nombre}?`}</p>
              </div>
             
            </Modal.Body>
            
            <Modal.Footer className="mc-footer">
              <Button variant="primary" className="mc-boton mc-boton-guardar" onClick={this.handleCloseEliminar}>
                No
              </Button>

              <Button variant="danger" className="mc-boton" onClick={this.handleEliminarSeguro}>
                Si
              </Button>
            </Modal.Footer>
          </Modal>
          }

          {!!this.state.modificarMineral 
            && <Redirect to={`/editar/mineral/${this.state.modificarMineral}`} />
          }
          {this.state.agregarPresionado && <Redirect to="/crear/mineral" />}
      </div>
    </div>  
  )
}
