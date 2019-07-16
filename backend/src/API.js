/* DEPENDENCIAS */
import {daoPedido} from "./DAOs/daoPedido";
import {validadorYacimientoConfiguracion, validadorProyecto, validadorGestorProyecto} from "./utils/validador"

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/* CONFIGURACION */
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/* HORA CON FORMATO PARA EL LOGGER */
const getAhora = () => {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return (date+' '+time);
}

/* METODO DE PRUEBA */
app.get('/prueba', (req, res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/prueba")
  
  const respuesta = {
    stringInterno: "TODO BIEN, REQUEST FUNCIONANDO"
  }

  res.status(200).json(respuesta);
});
/* ****************************** EQUIPO ****************************** */

import {daoEquipo} from './DAOs/daoEquipo'

app.get('/consultarLista/equipo', (req,res) =>{
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/equipo")

  daoEquipo.consultarTodos()
    .then(({rows}) => {
      res.status(200).json({"rows" : rows})
    })
    .catch((bd_err) => {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)
    })
})

/* ****************************** COMPANIA ****************************** */
import {daoCompania} from './DAOs/daoCompania'

app.get('/consultarLista/compania', (req,res) =>{
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/compania")

  daoCompania.consultarTodos()
    .then(({rows}) => {
      res.status(200).json({"rows" : rows})
    })
    .catch((bd_err) => {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)
    })
})

app.post('/consultar/compania', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultar/compania")

  daoCompania.consultar(req.body.c_id_compania)
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
})

app.post('/eliminar/compania', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/compania/${req.body.c_id_compania}`)
  daoCompania.eliminar(req.body.c_id_compania)
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});
/* ****************************** FASE CONFIGURACION ****************************** */
import {daoFaseConfiguracion} from './DAOs/daoFaseConfiguracion'

app.post('/consultar/fase_configuracion', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultar/fase_configuracion")

  let f = req.body.f_id_fase_configuracion

  daoFaseConfiguracion.consultar(f)
    .then( ({rows}) => {
      let fase = rows[0]
      daoFaseConfiguracion.consultarCargos(f)
        .then(({rows}) => {
          fase["cargos"] = rows
          daoFaseConfiguracion.consultarMaquinarias(f)
            .then(({rows}) => {
              fase["maquinarias"] = rows
              res.status(200).json({"fase" : fase})
            })
            .catch( (bd_err)=> {
              console.error(`bd_err : ${JSON.stringify(bd_err)}`)
              res.status(500).json(bd_err)
        
            })
        })
        .catch( (bd_err)=> {
          console.error(`bd_err : ${JSON.stringify(bd_err)}`)
          res.status(500).json(bd_err)
    
        })

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })

})

app.post('/insertar/fase_configuracion', (req,res) =>{
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/insertar/fase_configuracion")

  etapa = req.body.etapa_configuracion_id
  fases = req.body.fases
  fases.forEach((f) => {
    daoFaseConfiguracion.insertar(f.f_nombre,f.f_orden,f.f_duracion,f.f_descripcion,etapa,f.unidad_id)
      .then(({rows}) => {
        let fase_id = rows[0]
        cargos = f.cargos
        daoFaseConfiguracion.asignarVariosCargo(fase_id,cargos)
        .then()
          .catch((bd_err) => {
            console.error(`bd_err : ${JSON.stringify(bd_err)}`)
            res.status(500).json(bd_err)
          })
        
        maquinarias = f.maquinarias
        daoFaseConfiguracion.asignarVariosMaquinaria(fase_id,maquinarias)
        .then()
          .catch((bd_err) => {
            console.error(`bd_err : ${JSON.stringify(bd_err)}`)
            res.status(500).json(bd_err)
          })
      })
  })
})

/* ****************************** MAQUINARIA ****************************** */
import {daoMaquinaria} from './DAOs/daoMaquinaria'

app.get('/consultarLista/maquinaria', (req,res) =>{
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/maquinaria")

  daoMaquinaria.consultarTodos()
    .then(({rows}) => {
      res.status(200).json({"rows" : rows})
    })
    .catch((bd_err) => {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)
    })
})

app.post('/consultar/maquinaria', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultar/maquinaria")

  daoMaquinaria.consultar(req.body.m_id_maquinaria)
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
})

/* ****************************** MINERAL ****************************** */
import {daoMineral} from './DAOs/daoMineral'

app.get('/consultarLista/mineral', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/mineral")

  daoMineral.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
});

app.post('/consultar/mineral', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/mineral/${req.body.m_id_mineral}`)
  daoMineral.consultar(req.body.m_id_mineral)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/eliminar/mineral', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/mineral/${req.body.m_id_mineral}`)
  daoMineral.eliminar(req.body.m_id_mineral)
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/insertar/mineral', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/insertar/mineral/`)
  console.log(req.body)

  daoMineral.insertar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)
      return (bd_response)
    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
    .then( (bd_response) => {
        if (req.body.compuestos.length !== 0 ){
          daoMineral.insertarCompuestos( bd_response.rows[0].m_id_mineral , req.body.compuestos)
            .then( (bd_response) => {
              console.log(`STATUS OK : 200`) 
              // CUANDO SI TIENE COMPUESTOS
              res.status(200).json({"rowCount" : bd_response.rowCount})
            })
            .catch( (bd_err) => {
              console.log(`STATUS ERROR: 500`)      
              console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        
              res.status(500).json(bd_err)
        
            })
        } else {
          // CUANDO NO TIENE COMPUESTOS
          res.status(200).json({"rowCount" : bd_response.rowCount})
        }

    })


});

app.post('/modificar/mineral', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/modificar/mineral/${req.body.m_id_mineral}`)
  console.log(req.body)


  daoMineral.modificar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      if (!req.body.modificado){
        res.status(200).json({"rowCount" : bd_response.rowCount})
        return "listo"
      }
    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)
      return "error"
    })
    .then( mensaje => {
      

      if ( mensaje !== "listo" ){
        
        daoMineral.eliminarCompuestos( req.body.m_id_mineral )
          .then( (bd_response) => {
            console.log(`STATUS OK : 200`) 

          })
          .catch( (bd_err) => {
            console.log(`STATUS ERROR: 500`)      
            console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      
            res.status(500).json(bd_err)

          })
        .then( () => {

            daoMineral.insertarCompuestos( req.body.m_id_mineral , req.body.compuestos)
            .then( (bd_response) => {
              console.log(`STATUS OK : 200`) 
              res.status(200).json({"rowCount" : bd_response.rowCount})
            })
            .catch( (bd_err) => {
              console.log(`STATUS ERROR: 500`)      
              console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        
              res.status(500).json(bd_err)
      
            })
        })
        
      } else {
        res.status(200).json({"rowCount" : bd_response.rowCount})
      }
  })
});

app.post('/consultarLista/mineral/hijos', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultarLista/mineral/hijos/${req.body.m_id_mineral}`)
  console.log(req.body)


  daoMineral.consultarHijos( req.body )
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/consultarLista/mineral/padres', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultarLista/mineral/padres/${req.body.m_id_mineral}`)
  console.log(req.body)


  daoMineral.consultarPadres( req.body )
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/consultarLista/mineral/posiblesHijos', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultarLista/mineral/posiblesHijos/${req.body.m_id_mineral}`)
  console.log(req.body)


  daoMineral.consultarPosiblesHijos( req.body )
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

/* ****************************** SOLICITUD ****************************** */
import {daoSolicitud} from './DAOs/daoSolicitud'

app.get('/consultarLista/solicitud', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/solicitud")

  daoSolicitud.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
});

app.post('/eliminar/solicitud', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/solicitud/${req.body.s_id_solicitud}`)

  let s_id_solicitud = req.body.s_id_solicitud
  let proyecto_id = 0
  let pedido_id = 0
  daoSolicitud.obtenerProyectoPedidoDisparador(s_id_solicitud)
  .then((req_bd) => {
    proyecto_id = req_bd.rows[0].proyecto_id ? req_bd.rows[0].proyecto_id : 0
    pedido_id = req_bd.rows[0].pedido_id ? req_bd.rows[0].pedido_id : 0
    return daoSolicitud.eliminar(s_id_solicitud)
  })
  .then((resp_bd) => {
    return daoProyecto.liberarEmpleadosProyecto(proyecto_id)
  })
  .then((resp_bd) => {
    return daoProyecto.liberarEquiposProyecto(proyecto_id)
  })
  .then((resp_bd) => {
    return daoProyecto.eliminar(proyecto_id)
  })
  .then((resp_bd) => {
    return daoPedido.eliminar(pedido_id)
  })
  .then( ({rows}) => {
    console.log(`STATUS OK : 200`)      
    res.status(200).json({"resp" : "solitud eliminada exitosamente"})

  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)
    res.status(500).json(bd_err)
  })
})

app.post('/atender/solicitud', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/atender/solicitud/${req.body.s_id_solicitud}`)

  let s_id_solicitud = req.body.s_id_solicitud

  daoSolicitud.obtenerArticulosSolicitados(s_id_solicitud)
  .then((resp_bd) => {
    let articulos = resp_bd.rows
    return daoSolicitud.almacenarProductos(s_id_solicitud, articulos)
  })
  .then((resp_bd) => {
    return daoSolicitud.atenderSolicitud(s_id_solicitud)
  })
  .then( ({rows}) => {
    console.log(`STATUS OK : 200`)      
    res.status(200).json({"resp" : "solitud de recursos registrada exitosamente"})

  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)
    res.status(500).json(bd_err)
  }) 
})

/*
app.post('/consultar/mineral', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/mineral/${req.body.m_id_mineral}`)
  daoSolicitud.consultar(req.body.m_id_mineral)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/eliminar/mineral', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/mineral/${req.body.m_id_mineral}`)
  daoSolicitud.eliminar(req.body.m_id_mineral)
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/insertar/mineral', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/insertar/mineral/`)
  console.log(req.body)

  daoSolicitud.insertar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)
      return (bd_response)
    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
    .then( (bd_response) => {
        if (req.body.compuestos.length !== 0 ){
          daoSolicitud.insertarCompuestos( bd_response.rows[0].m_id_mineral , req.body.compuestos)
            .then( (bd_response) => {
              console.log(`STATUS OK : 200`) 
              // CUANDO SI TIENE COMPUESTOS
              res.status(200).json({"rowCount" : bd_response.rowCount})
            })
            .catch( (bd_err) => {
              console.log(`STATUS ERROR: 500`)      
              console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        
              res.status(500).json(bd_err)
        
            })
        } else {
          // CUANDO NO TIENE COMPUESTOS
          res.status(200).json({"rowCount" : bd_response.rowCount})
        }

    })


});

app.post('/modificar/mineral', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/modificar/mineral/${req.body.m_id_mineral}`)
  console.log(req.body)


  daoSolicitud.modificar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      if (!req.body.modificado){
        res.status(200).json({"rowCount" : bd_response.rowCount})
        return "listo"
      }
    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)
      return "error"
    })
    .then( mensaje => {
      

      if ( mensaje !== "listo" ){
        
        daoSolicitud.eliminarCompuestos( req.body.m_id_mineral )
          .then( (bd_response) => {
            console.log(`STATUS OK : 200`) 

          })
          .catch( (bd_err) => {
            console.log(`STATUS ERROR: 500`)      
            console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      
            res.status(500).json(bd_err)

          })
        .then( () => {

            daoSolicitud.insertarCompuestos( req.body.m_id_mineral , req.body.compuestos)
            .then( (bd_response) => {
              console.log(`STATUS OK : 200`) 
              res.status(200).json({"rowCount" : bd_response.rowCount})
            })
            .catch( (bd_err) => {
              console.log(`STATUS ERROR: 500`)      
              console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        
              res.status(500).json(bd_err)
      
            })
        })
        
      } else {
        res.status(200).json({"rowCount" : bd_response.rowCount})
      }
  })
});
*/
/* ****************************** CLIENTE ****************************** */
import {daoCliente} from './DAOs/daoCliente'

app.get('/consultarLista/cliente', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/cliente")

  daoCliente.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
});

app.post('/consultar/cliente', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/cliente/${req.body.e_id_empleado}`)
  daoCliente.consultar(req.body.e_id_empleado)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/eliminar/cliente', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/cliente/${req.body.c_id_cliente}`)
  daoCliente.eliminar(req.body.c_id_cliente)
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/insertar/cliente', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/insertar/cliente/`)
  console.log(req.body)

  daoCliente.insertar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/modificar/cliente', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/modificar/cliente/${req.body.c_id_cliente}`)
  console.log(req.body)


  daoCliente.modificar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

/* ****************************** EMPLEADO ****************************** */
import {daoEmpleado} from './DAOs/daoEmpleado'

app.get('/consultarLista/empleado', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/empleado")

  daoEmpleado.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
});

app.post('/consultar/empleado', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/empleado/${req.body.e_id_empleado}`)
  daoEmpleado.consultar(req.body.e_id_empleado)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/eliminar/empleado', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/empleado/${req.body.e_id_empleado}`)
  daoEmpleado.eliminar(req.body.e_id_empleado)
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/insertar/empleado', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/insertar/empleado/`)
  console.log(req.body)

  daoEmpleado.insertar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/modificar/empleado', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/modificar/empleado/${req.body.e_id_empleado}`)
  console.log(req.body)


  daoEmpleado.modificar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

/* ****************************** LUGAR ****************************** */
import {daoLugar} from './DAOs/daoLugar'

app.get('/consultarLista/lugar', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/lugar")

  daoLugar.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
});

app.post('/consultar/lugar', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/lugar/${req.body.l_id_lugar}`)
  daoLugar.consultar(req.body.l_id_lugar)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/consultarLista/lugar/porTipo', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultarLista/lugar/porTipo/${req.body.l_tipo}`)
  daoLugar.consultarTodosPorTipo(req.body.l_tipo)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

/* ****************************** CARGO ****************************** */
import {daoCargo} from './DAOs/daoCargo'

app.get('/consultarLista/cargo', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/cargo")

  daoCargo.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
});

app.post('/consultar/cargo', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/cargo/${req.body.c_id_cargo}`)
  daoCargo.consultar(req.body.c_id_cargo)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

/* ****************************** ESTADO ****************************** */
import {daoEstado} from './DAOs/daoEstado'

app.get('/consultarLista/estado', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/estado")

  daoEstado.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
});

app.post('/consultar/estado', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/estado/${req.body.e_id_estado}`)
  daoEstado.consultar(req.body.e_id_estado)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

/* ****************************** YACIMIENTO ****************************** */
import {daoYacimiento} from './DAOs/daoYacimiento'

app.get('/consultarLista/yacimiento', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/yacimiento")

  daoYacimiento.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})
    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)
    })
});

app.post('/consultar/yacimiento', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/yacimiento/${req.body.y_id_yacimiento}`)
  daoYacimiento.consultar(req.body.y_id_yacimiento)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/eliminar/yacimiento', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/yacimiento/${req.body.y_id_yacimiento}`)
  daoYacimiento.eliminar(req.body.y_id_yacimiento)
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/insertar/yacimiento', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/insertar/yacimiento/`)
  console.log(req.body)

  daoYacimiento.insertar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/modificar/yacimiento', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/modificar/yacimiento/${req.body.y_id_yacimiento}`)
  console.log(req.body)


  daoYacimiento.modificar( req.body )
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

/* ****************************** YACIMIENTO_CONFIGURACION ****************************** */
import {daoYacimientoConfiguracion} from './DAOs/daoYacimientoConfiguracion'

app.get('/consultarLista/yacimiento_configuracion', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/yacimiento_configuracion")

  daoYacimientoConfiguracion.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
});

app.post('/consultar/detalle_yacimiento_configuracion', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultar/detalle_yacimiento_configuracion")

  let yac_id = req.body.y_id_yacimiento_configuracion
  let yacimiento_configuracion = null

  daoYacimientoConfiguracion.consultar(yac_id)
  .then(({rows}) => {
    yacimiento_configuracion = rows[0]
    return daoEtapaConfiguracion.consultarTodosYacimiento(yac_id)
  })
  .then((resp_bd) => {
    yacimiento_configuracion["etapas"]=resp_bd.rows
  })
  .then(() => {
    return new Promise((resolve,reject) => {
      let promesas2 = []
      yacimiento_configuracion["etapas"].map((e,i) => { 
        daoFaseConfiguracion.consultarTodosEtapa(e.e_id_etapa_configuracion)
        .then((resp_bd) => {
          yacimiento_configuracion["etapas"][i]["fases"] = resp_bd.rows
          yacimiento_configuracion["etapas"][i]["fases"].map((f,j) => {
            promesas2.push(new Promise((solve, jet) => {
              daoFaseConfiguracion.consultarCargos(f.f_id_fase_configuracion)
              .then((resp_bd) => {
                yacimiento_configuracion["etapas"][i]["fases"][j]["cargos"] = resp_bd.rows
                return daoFaseConfiguracion.consultarMaquinarias(f.f_id_fase_configuracion)
              })
              .then((resp_bd) => {
                yacimiento_configuracion["etapas"][i]["fases"][j]["maquinarias"] = resp_bd.rows ? resp_bd.rows : []
                solve("continua")
                if( (i === (yacimiento_configuracion["etapas"].length - 1)) && (j === (yacimiento_configuracion["etapas"][i]["fases"].length - 1)))
                Promise.all(promesas2).then(() => resolve("bien!"))    
              })              
            }))
          })   
        })
      })
    })    
  })
  .then((DATA_RESPUESTA) => {
    return daoYacimientoConfiguracion.consultarRequisitos(yac_id) 
  })
  .then((resp_bd) => {
    yacimiento_configuracion["requisitos"] = resp_bd.rows
    return daoYacimientoConfiguracion.proyectosAsociados(yac_id)
  })
  .then((resp_bd) => {
    yacimiento_configuracion["no_modificable"] = resp_bd.rowCount > 0 ? true : false
    console.log(`STATUS OK : 200`)      
    res.status(200).json({"yacimiento_configuracion" : yacimiento_configuracion})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  })
});

app.post('/insertar/yacimiento_configuracion', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/insertar/yacimiento_configuracion `)

  let y = req.body
  const m = validadorYacimientoConfiguracion.validar(y)
  if (m !== "") {
    console.log(`\n\nSTATUS ERROR: 500`)      
    console.error(`\n\nERROR: Formato invalido: ${m}`)

    res.status(500).json({"ErrorMessage" : m})
    return 0;
  }
  let yac_id =  null
  daoYacimientoConfiguracion.insertar(y.y_nombre,y.y_capacidad_explotacion,y.mineral_id,7)  
  .then((resp_bd) => {
    yac_id = resp_bd.rows[0].y_id_yacimiento_configuracion
    if (!y["requisitos"] || y["requisitos"].length === 0 )
      return 0;
    return daoYacimientoConfiguracion.agregarRequisitos(yac_id,y["requisitos"])
  })
  .then((resp_bd) => {
    return new Promise((resolve,reject) => {
      y["etapas"].map((e,i) => {
        daoEtapaConfiguracion.insertar(e.e_nombre,e.e_orden,e.e_tipo,yac_id)
        .then((resp_bd) => {
          let e_id = resp_bd.rows[0].e_id_etapa_configuracion
          y["etapas"][i]["fases"].map((f,j) => {
            daoFaseConfiguracion.insertar(f.f_nombre,f.f_orden,f.f_duracion,f.f_descripcion,e_id,f.unidad_id)
            .then((resp_bd) => {
              let f_id = resp_bd.rows[0].f_id_fase_configuracion
              if (f["cargos"].length > 0) {
                daoFaseConfiguracion.asignarVariosCargo(f_id,f["cargos"])
                .then((resp_bd) => {
                  if (f["maquinarias"] && f["maquinarias"].length > 0) {
                    daoFaseConfiguracion.asignarVariosMaquinaria(f_id,f["maquinarias"])
                    .then((resp_bd) => {
                      if( (i === (y["etapas"].length - 1)) && (j === (y["etapas"][i]["fases"].length - 1)))
                      resolve("bien!")
                    })
                  }else{
                    if( (i === (y["etapas"].length - 1)) && (j === (y["etapas"][i]["fases"].length - 1)))
                    resolve("bien!")
                  }                  
                })
              }else{
                if( (i === (y["etapas"].length - 1)) && (j === (y["etapas"][i]["fases"].length - 1)))
                resolve("bien!") 
              }                           
            })
          }) 
        })
      })
    })    
  })
  .then((DATA_RESPUESTA) => {
    console.log(`STATUS OK : 200`)      
    res.status(200).json({"message" : "Configuracion de Yacimiento Insertada Exitosamente!!!!!"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  }) 
})

app.post('/modificar/yacimiento_configuracion', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/modificar/yacimiento_configuracion/${req.body.y_id_yacimiento_configuracion}`)

  let y = req.body
  const m = validadorYacimientoConfiguracion.validar(y)
  if (m !== "") {
    console.log(`\n\nSTATUS ERROR: 500`)      
    console.error(`\n\nERROR: Formato invalido: ${m}`)

    res.status(500).json({"ErrorMessage" : m})
    return 0;
  }
  daoYacimientoConfiguracion.BorrarRequisitos(y.y_id_yacimiento_configuracion)
  .then((resp_bd) => {
    return daoYacimientoConfiguracion.BorrarEtapas(y.y_id_yacimiento_configuracion)
  })
  .then((resp_bd) => {
    return daoYacimientoConfiguracion.modificar(y.y_id_yacimiento_configuracion,y.y_nombre,y.y_capacidad_explotacion,y.mineral_id,y.unidad_id)
  })
  .then((resp_bd) => {
    if (!y["requisitos"] || y["requisitos"].length === 0 )
      return 0;
    return daoYacimientoConfiguracion.agregarRequisitos(y.y_id_yacimiento_configuracion,y["requisitos"])
  })
  .then((resp_bd) => {
    return new Promise((resolve,reject) => {
      y["etapas"].map((e,i) => { 
        daoEtapaConfiguracion.insertar(e.e_nombre,e.e_orden,e.e_tipo,y.y_id_yacimiento_configuracion)
        .then((resp_bd) => {
          let e_id = resp_bd.rows[0].e_id_etapa_configuracion
          y["etapas"][i]["fases"].map((f,j) => {
            daoFaseConfiguracion.insertar(f.f_nombre,f.f_orden,f.f_duracion,f.f_descripcion,e_id,f.unidad_id)
            .then((resp_bd) => {
              let f_id = resp_bd.rows[0].f_id_fase_configuracion
              console.log(`\n\n fase insertada, id : ${f_id}`)
              if (f["cargos"].length > 0) {
                daoFaseConfiguracion.asignarVariosCargo(f_id,f["cargos"])
                .then((resp_bd) => {
                  console.log(`\n\n cargos insertads en la fase_id : ${f_id}`)
                  if (f["maquinarias"].length > 0) {
                    daoFaseConfiguracion.asignarVariosMaquinaria(f_id,f["maquinarias"])
                    .then((resp_bd) => {
                      if( (i === (y["etapas"].length - 1)) && (j === (y["etapas"][i]["fases"].length - 1)))
                      resolve("bien!")
                    })
                  }else{
                    if( (i === (y["etapas"].length - 1)) && (j === (y["etapas"][i]["fases"].length - 1)))
                    resolve("bien!")
                  }                  
                })
              }else{
                if( (i === (y["etapas"].length - 1)) && (j === (y["etapas"][i]["fases"].length - 1)))
                resolve("bien!") 
              }                           
            })
          }) 
        })
      })
    })    
  })
  .then((DATA_RESPUESTA) => {
    console.log(`STATUS OK : 200`)      
    res.status(200).json({"message" : "exito! configuracion de yacimiento modificada"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)

  }) 
})

app.post('/consultar/yacimiento_configuracion', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/yacimiento_configuracion/${req.body.y_id_yacimiento_configuracion}`)
  daoYacimientoConfiguracion.consultar(req.body.y_id_yacimiento_configuracion)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/eliminar/yacimiento_configuracion', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/yacimiento_configuracion/${req.body.y_id_yacimiento_configuracion}`)
  daoYacimientoConfiguracion.eliminar(req.body.y_id_yacimiento_configuracion)
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

/* ****************************** TIPO_YACIMIENTO ****************************** */
import {daoTipoYacimiento} from './DAOs/daoTipoYacimiento'
import { daoEtapaConfiguracion } from "./DAOs/daoEtapaConfiguracion";

app.get('/consultarLista/tipo_yacimiento', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/tipo_yacimiento")

  daoTipoYacimiento.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})
    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)

    })
});

app.post('/consultar/tipo_yacimiento', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/tipo_yacimiento/${req.body.t_id_yacimiento}`)
  daoTipoYacimiento.consultar(req.body.t_id_yacimiento)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/eliminar/tipo_yacimiento', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/tipo_yacimiento/${req.body.t_id_yacimiento}`)
  daoTipoYacimiento.eliminar(req.body.t_id_yacimiento)
    .then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

/* ****************************** PROYECTO ****************************** */
import {daoProyecto} from "./DAOs/daoProyecto";
import {daoProducto} from "./DAOs/daoProducto";
import {daoPediProd} from "./DAOs/daoPediProd";
import {daoPediEsta} from "./DAOs/daoPediEsta";
import {daoInventario} from "./DAOs/daoInventario";
import {daoHorario} from "./DAOs/daoHorario";
import {daoEtapa} from "./DAOs/daoEtapa";
import {daoFase} from "./DAOs/daoFase";

app.get('/consultarLista/proyecto', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/proyecto")

  daoProyecto.consultarTodos()
    .then( ({rows}) => {
      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err)=> {
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)
      res.status(500).json(bd_err)
    })
});

app.post('/consultar/proyecto', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/proyecto/${req.body.p_id_proyecto}`)
  daoProyecto.consultar(req.body.p_id_proyecto)
    .then( ({rows}) => {
      console.log(`STATUS OK : 200`)      

      res.status(200).json({"rows" : rows})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post(`/consultar/detalle_proyecto`,(req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultar/detalle_proyecto")

  let proy_id = req.body.p_id_proyecto
  let proyecto = null

  daoProyecto.consultar(proy_id)
  .then(({rows}) => {
    proyecto = rows[0]
    return daoEtapa.consultarTodosProyecto(proy_id)
  })
  .then((resp_bd) => {
    proyecto["etapas"]=resp_bd.rows
  })
  .then(() => {
    return new Promise((resolve,reject) => {
      let promesas2 = []
      proyecto["etapas"].map((e,i) => { 
        daoFase.consultarTodosEtapa(e.e_id_etapa)
        .then((resp_bd) => {
          proyecto["etapas"][i]["fases"] = resp_bd.rows
          proyecto["etapas"][i]["fases"].map((f,j) => {
            promesas2.push(new Promise((solve, jet) => {
              daoFase.consultarEmpleados(f.f_id_fase)
              .then((resp_bd) => {
                proyecto["etapas"][i]["fases"][j]["empleados"] = resp_bd.rows ? resp_bd.rows : []
                return daoFase.consultarEquipos(f.f_id_fase)
              })
              .then((resp_bd) => {
                proyecto["etapas"][i]["fases"][j]["equipos"] = resp_bd.rows ? resp_bd.rows : []
                return daoFase.consultarGastos(f.f_id_fase)
              })
              .then((resp_bd) => {
                proyecto["etapas"][i]["fases"][j]["gastos"] = resp_bd.rows ? resp_bd.rows : []
                solve("continua")
                if( (i === (proyecto["etapas"].length - 1)) && (j === (proyecto["etapas"][i]["fases"].length - 1)))
                Promise.all(promesas2).then(() => resolve("bien!"))
              })
            }))                                
          }) 
        })   
      })
    })
  })
  .then((DATA_RESPUESTA) => {
    console.log(`STATUS OK : 200`)      
    res.status(200).json({"proyecto" : proyecto})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  })
})

app.post('/insertar/proyecto', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/insertar/proyecto `)

  let p = req.body
  const m = validadorProyecto.validar(p)
  if (m !== "") {
    console.log(`\n\nSTATUS ERROR: 500`)      
    console.error(`\n\nERROR: Formato invalido: ${m}`)

    res.status(500).json({"ErrorMessage" : m})
    return 0;
  }
  let proy_id =  null
  daoProyecto.insertar(p.p_nombre,p.p_fecha_inicio,3,p.yacimiento_id,p.pedido_id? p.pedido_id : null)  
  .then((resp_bd) => {
    proy_id = resp_bd.rows[0].p_id_proyecto    
  })
  .then(() => {
    return new Promise((resolve,reject) => {
      p["etapas"].map((e,i) => {
        daoEtapa.insertar(e.e_fecha_inicio,3,proy_id,e.e_id_etapa_configuracion)
        .then((resp_bd) => {
          let e_id = resp_bd.rows[0].e_id_etapa
          p["etapas"][i]["fases"].map((f,j) => {
            let f_id = null
            daoFase.insertar(f.f_fecha_inicio,f.f_fecha_fin,e_id,f.f_id_fase_configuracion,3)
            .then((resp_bd) => {
              f_id = resp_bd.rows[0].f_id_fase
              daoFase.asignarVariosEmpleados(f_id,f["empleados"])
            })
            .then((resp_bd) => {
              daoEmpleado.modificarEstatusEmpleados(f["empleados"],12)
            })
            .then((resp_bd) => {
              if (f["equipos"] && f["equipos"].length > 0) {
                daoFase.asignarVariosEquipos(f_id,f["equipos"])
              }
            })
            .then((resp_bd) => {
              if (f["equipos"] && f["equipos"].length > 0) {
                daoEquipo.modificarEstatusEquipos(f["equipos"],12)
              }
            })
            .then((resp_bd) => {
              if ( f["gastos"] && f["gastos"].length > 0){
                daoFase.asignarVariosGastos(f_id,f["gastos"])
              }
            })
            .then((resp_bd) => {
              if( (i === (p["etapas"].length - 1)) && (j === (p["etapas"][i]["fases"].length - 1)))
                  resolve("bien!")
            })                         
          })
        }) 
      })
    })
  })
  .then((DATA_RESPUESTA) => {
    console.log(`STATUS OK : 200`)      
    res.status(200).json({"message" : "Proyecto Insertado Exitosamente!!!!!"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)
  
    res.status(500).json(bd_err)
  })
})

app.post('/modificar/proyecto', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/modificar/proyecto/${req.body.p_id_proyecto}`)

  let p = req.body
  const m = validadorProyecto.validar(p)
  if (m !== "") {
    console.log(`\n\nSTATUS ERROR: 500`)      
    console.error(`\n\nERROR: Formato invalido: ${m}`)

    res.status(500).json({"ErrorMessage" : m})
    return 0;
  }
  daoEmpleado.liberarEmpleadosProyecto(p.p_id_proyecto)
  .then((resp_bd) => {
    return daoEquipo.liberarEquiposProyecto(p.p_id_proyecto)
  })
  .then((resp_bd) => {
    return daoProyecto.borrarEtapas(p.p_id_proyecto)
  })
  .then((resp_bd) => {
    return daoProyecto.modificar(p.p_id_proyecto,p.p_nombre,p.p_fecha_inicio,p.estado_id,p.yacimiento_id,p.pedido_id)
  })
  .then(() => {
    return new Promise((resolve,reject) => {
      p["etapas"].map((e,i) => {
        daoEtapa.insertar(e.e_fecha_inicio,3,p.p_id_proyecto,e.e_id_etapa_configuracion)
        .then((resp_bd) => {
          let e_id = resp_bd.rows[0].e_id_etapa
          p["etapas"][i]["fases"].map((f,j) => {
            let f_id = null
            daoFase.insertar(f.f_fecha_inicio,f.f_fecha_fin,e_id,f.f_id_fase_configuracion,3)
            .then((resp_bd) => {
              f_id = resp_bd.rows[0].f_id_fase
              daoFase.asignarVariosEmpleados(f_id,f["empleados"])
            })
            .then((resp_bd) => {
              daoEmpleado.modificarEstatusEmpleados(f["empleados"],12)
            })
            .then((resp_bd) => {
              if (f["equipos"] && f["equipos"].length > 0) {
                daoFase.asignarVariosEquipos(f_id,f["equipos"])
              }
            })
            .then((resp_bd) => {
              if (f["equipos"] && f["equipos"].length > 0) {
                daoEquipo.modificarEstatusEquipos(f["equipos"],12)
              }
            })
            .then((resp_bd) => {
              if ( f["gastos"] && f["gastos"].length > 0){
                daoFase.asignarVariosGastos(f_id,f["gastos"])
              }
            })
            .then((resp_bd) => {
              if( (i === (p["etapas"].length - 1)) && (j === (p["etapas"][i]["fases"].length - 1)))
                  resolve("bien!")
            })                         
          })
        }) 
      })
    })
  })
  .then((DATA_RESPUESTA) => {
    console.log(`STATUS OK : 200`)      
    res.status(200).json({"message" : "Proyecto Modificado Exitosamente!!!!!"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)
  
    res.status(500).json(bd_err)
  })
})

app.post('/iniciar/proyecto', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/iniciar/proyecto ${req.body.p_id_proyecto}`)

  let proy_id = req.body.p_id_proyecto ? req.body.p_id_proyecto : 0
  let requisitos = req.body.requisitos ? req.body.requisitos : []
  
  if (proy_id === 0) {
    res.status(500).json({"ErrorMessage" : "id proyecto invalido o vacio"})
    return 0;
  }
  if (requisitos.length === 0){
    daoProyecto.actualizarEstado(proy_id,15)
    res.status(200).json({"resp" : "Proyecto sin requisitos, puede avanzar de etapa"})
    return 0;
  }
  //verificar minerales del inventario
  let inventario = null
  let comprables = null
  let mensaje = ""
  let lista_compra = []
  let lista_articulos = []
  daoInventario.consultarRequisitos(requisitos)
  .then((resp_bd) => {
    inventario = resp_bd.rows
    console.log(`\n\n:Lista inventario: \n${JSON.stringify(inventario)}`)
    return new Promise((resolve,reject) => {
      requisitos.forEach((m, index) =>{
        let n = inventario.find((s) => s.m_id_mineral === m.m_id_mineral )
        if (!n.cantidad_actual) lista_compra.push({"m_cantidad": m.m_cantidad*1000, "m_id_mineral": m.m_id_mineral})
        else if (m.m_cantidad*1000 > n.cantidad_actual) lista_compra.push({"m_cantidad": m.m_cantidad*1000 - n.cantidad_actual, "m_id_mineral": m.m_id_mineral})
        if (index === requisitos.length - 1) resolve("bien")
      })
    })    
  })
  .then((DATA_RESPUESTA) => {
    console.log(`\n\n:Lista compra: \n${JSON.stringify(lista_compra)}`)
    return daoMineral.consultarMineralesComprables()
  })
  .then((resp_bd) => {
    comprables = resp_bd.rows
    console.log(`\n\n:Lista comprables: \n${JSON.stringify(comprables)}`)
    return new Promise((resolve, reject) => {
      lista_compra.forEach((arti, index) => {
        console.log(`\naqui ${index}\n`)
        let c = comprables.find( (d) => d.mineral_id === arti.m_id_mineral )
        console.log(`\naalla ${index}\n`)
        if (c) console.log(`\n\n:ariculo : \n${JSON.stringify({...c,"p_cantidad": Math.ceil(arti.m_cantidad/c.p_peso)})}`)
        if (c) lista_articulos.push({...c,"p_cantidad": Math.ceil(arti.m_cantidad/c.p_peso)})
        else mensaje += `m_id_minera: ${arti.m_id_mineral} `
        if (index === lista_compra.length - 1) resolve("bien")
      })
    })
  })
  .then((DATA_RESPUESTA) =>{
    console.log(`\n\n:lista_articulos: \n${JSON.stringify(lista_articulos)}`)
    //res.status(200).json({"resp" : "todo bien hasta ahora"})
    return new Promise((resolve, reject) =>{
      if (lista_articulos.length < lista_compra.length){
        console.log(`\n\nNO SE PUEDE REALIZAR LA SOLICITUD`)
        mensaje = `Los siguientes minerales no pueden ser comprados por falta de productos: ${mensaje}`
        reject("Hay minerales no comprables, registre producto apara continuar")
      }else{
        daoSolicitud.insertar(proy_id)
        .then((resp_bd) => {
          return daoSolicitud.asignarVariosArticulos(resp_bd.rows[0].s_id_solicitud,lista_articulos)
        })
        .then((resp_bd) => {
          return daoProyecto.actualizarEstado(proy_id,15)
        })
        .then((resp_bd) => {
          resolve("bien")
        })
      }
    })
  })
  .then((DATA_RESPUESTA) => {
    console.log(`STATUS OK : 200`)
    res.status(200).json({"resp" : "Solitud registrada exitosamente"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json({"resp": mensaje})
  }) 
})

app.post('/eliminar/proyecto', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/proyecto/${req.body.p_id_proyecto}`)
  let proy_id = req.body.p_id_proyecto
  daoEmpleado.liberarEmpleadosProyecto(proy_id)
  .then((resp_bd) => {
    return daoEquipo.liberarEquiposProyecto(proy_id)
  })
  .then ((resp_bd) => {
    return daoProyecto.eliminar(proy_id)
  })  
  .then( (bd_response) => {
    console.log(`STATUS OK : 200`)
    res.status(200).json({"rowCount" : bd_response.rowCount})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  })
});

app.post('/activar/proyecto', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/activar/proyecto/${req.body.p_id_proyecto}`)

  let proy_id = req.body.p_id_proyecto ? req.body.p_id_proyecto : 0
  let requisitos = req.body.requisitos ? req.body.requisitos : []

  if (proy_id === 0) {
    res.status(500).json({"ErrorMessage" : "id proyecto invalido o vacio"})
    return 0;
  }
  if (requisitos.length === 0){
    res.status(200).json({"resp" : "Proyecto sin requisitos, puede avanzar de estado"})
    return 0;
  }

  daoProyecto.tomarRecursos(proy_id,requisitos)
  .then((resp_bd) => {
    return daoProyecto.actualizarEstado(proy_id,8)
  })
  .then((DATA_RESPUESTA) => {
    console.log(`STATUS OK : 200`)
    res.status(200).json({"resp" : "Recursos asignados exitosamente"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  })

})

app.post('/opcional/proyecto', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/opcional/proyecto/${req.body.p_id_proyecto}`)

  let proy_id = req.body.p_id_proyecto ? req.body.p_id_proyecto : 0
  if (proy_id === 0) {
    res.status(500).json({"ErrorMessage" : "id proyecto invalido o vacio"})
    return 0;
  }

  daoProyecto.actualizarEstado(proy_id,15)
  .then((DATA_RESPUESTA) => {
    console.log(`STATUS OK : 200`)
    res.status(200).json({"resp" : "Proyecto iniciado exitosamente"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  })

})

/******************************************** FASE **********************************************/

app.post('/activar/fase', (req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/activar/fase/${req.body.f_id_fase}`)

  const fase_id = req.body.f_id_fase ? req.body.f_id_fase : 0
  const inicio_fase = req.body.f_fecha_inicio ? req.body.f_fecha_inicio : null
  const inicio_etapa = req.body.e_fecha_inicio ? req.body.e_fecha_inicio : null

  const m = validadorGestorProyecto.validarActivarFase(inicio_etapa, inicio_fase, fase_id)
  if (m !== "") {
    console.log(`\n\nSTATUS ERROR: 500`)      
    console.error(`\n\nERROR: ${m}`)

    res.status(500).json({"ErrorMessage" : m})
    return 0;
  }

  daoFase.modificarFechaInicio(fase_id, inicio_fase)
  .then((resp_bd) => {
    return daoFase.modificarEstado(fase_id,8)
  })
  .then((resp_bd) => {
    console.log(`STATUS OK : 200`)
    res.status(200).json({"resp" : "fase iniciada exitosamente"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  })

})

app.post('/finalizar/fase',(req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/finalizar/fase/${req.body.f_id_fase}`)

  const fase_id = req.body.f_id_fase ? req.body.f_id_fase : 0
  const inicio_fase = req.body.f_fecha_inicio ? req.body.f_fecha_inicio : null
  const fin_fase = req.body.f_fecha_fin ? req.body.f_fecha_fin : null

  const m = validadorGestorProyecto.validarFinalizarFase(inicio_fase, fin_fase, fase_id)
  if (m !== "") {
    console.log(`\n\nSTATUS ERROR: 500`)      
    console.error(`\n\nERROR: ${m}`)

    res.status(500).json({"ErrorMessage" : m})
    return 0;
  }

  daoEmpleado.liberarEmpleadosFase(fase_id)
  .then((resp_bd) => {
    return daoEquipo.liberarEquiposFase(fase_id)
  })
  .then((resp_bd) => {
    return daoFase.modificarEstado(fase_id,10)
  })
  .then((resp_bd) => {
    return daoFase.modificarFechaFin(fase_id, fin_fase)
  })
  .then((resp_bd) => {
    console.log(`STATUS OK : 200`)
    res.status(200).json({"resp" : "fase finalizada exitosamente"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  })

})

/*************************************** ETAPA **********************************/

app.post('/activar/etapa',(req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/activar/etapa/${req.body.e_id_etapa}`)

  const etapa_id = req.body.e_id_etapa ? req.body.e_id_etapa : 0
  const inicio_proyecto = req.body.p_fecha_inicio ? req.body.p_fecha_inicio : null
  const inicio_etapa = req.body.e_fecha_inicio ? req.body.e_fecha_inicio : null

  const m = validadorGestorProyecto.validarActivaEtapa(inicio_proyecto, inicio_etapa, etapa_id)
  if (m !== "") {
    console.log(`\n\nSTATUS ERROR: 500`)      
    console.error(`\n\nERROR: ${m}`)

    res.status(500).json({"ErrorMessage" : m})
    return 0;
  }
  daoEtapa.modificarFechaInicio(etapa_id,inicio_etapa)
  .then((resp_bd) => {
    return daoEtapa.modificarEstado(etapa_id,8)
  })  
  .then((resp_bd) => {
    console.log(`STATUS OK : 200`)
    res.status(200).json({"resp" : "Etapa iniciada exitosamente"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  })
})

app.post('/finalizar/etapa',(req,res) => {
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/finalizar/etapa/${req.body.e_id_etapa}`)

  let etapa_id = req.body.f_id_etapa
  
  if (etapa_id === 0) {
    res.status(500).json({"ErrorMessage" : "id etapa invalido o vacio"})
    return 0;
  }

  daoEtapa.modificarEstado(etapa_id,10)
  .then((resp_bd) => {
    console.log(`STATUS OK : 200`)
    res.status(200).json({"resp" : "fase finalizada exitosamente"})
  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)
  })

})


function error(bd_err)
{
  console.log(`STATUS ERROR: 500`)
  console.error(`bd_err : ${JSON.stringify(bd_err)}`)

  res.status(500).json(bd_err)
}

/* ****************************** PEDIDO ****************************** */

app.post('/insertar/pedido', (req, res) => {

  console.log("\n\n");
  console.log(`----------------------> ${getAhora()}`);
  console.log(`/insertar/pedido/`);
  req.body.p_fecha_solicitud=getAhora();
  console.log(req.body);


  daoPedido.insertar( req.body )
      .then( (bd_response) => {

        console.log(`STATUS OK : 200`)
        res.status(200).json({"rowCount" : bd_response.rowCount})
        req.body.pedido_id = bd_response.rows[0].p_id_pedido;
        let r = {
          p_fecha_modificacion: getAhora(),
          estado_id: 15,
          pedido_id: req.body.pedido_id}

        daoPediEsta.insertar(r).then((ans)=>{
          for(let i=0;i<req.body.minerales.length;i++)
          {
            let newReq={
              producto_id: req.body.minerales[i].presentacion_id,
              p_precio_unitario: req.body.minerales[i].precio,
              p_cantidad: req.body.minerales[i].cantidad,
              unidad_id: 11,
              pedido_id: req.body.pedido_id
            }
            daoPediProd.insertar(newReq).then((bd_response) => {
                  console.log(`STATUS OK : 200`)
                }
            ).catch((e)=>error(e))

          }
        }).catch((e)=>{error(e)})
      })
      .catch( (bd_err) => {
        error(bd_err);
      })
});

app.get('/consultarLista/pedido', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/pedido")

  daoPedido.consultarTodos()
      .then( ({rows}) => {
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)
      })
});

app.post('/eliminar/pedido', (req, res) => {
  
  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/eliminar/pedido/${req.body.p_id_pedido}`)
  
  p_id_pedido = req.body.p_id_pedido
  let proyecto_id = 0
  daoProyecto.obtenerProyectoDesdePedido(p_id_pedido)
  .then((resp_bd) => {
    proyecto_id = resp_bd.rows.length > 0 ? resp_bd.rows[0].p_id_proyecto : 0
    return daoProyecto.liberarEmpleadosProyecto(proyecto_id)
  })
  .then((resp_bd) => {
    return daoProyecto.liberarEquiposProyecto(proyecto_id)
  })
  .then((resp_bd) => {
    return daoProyecto.eliminar(proyecto_id)
  })
  .then((resp_bd) => {
    return daoPedido.eliminar(p_id_pedido)
  })
  .then( (bd_response) => {
    console.log(`STATUS OK : 200`)      
    
    res.status(200).json({"rowCount" : bd_response.rowCount})

  })
  .catch( (bd_err) => {
    console.log(`STATUS ERROR: 500`)      
    console.error(`bd_err : ${JSON.stringify(bd_err)}`)

    res.status(500).json(bd_err)

  })
});

app.post('/editarEstado/pedido', (req, res) => {

  console.log("\n\n");
  console.log(`----------------------> ${getAhora()}`);
  console.log(`/editarEstado/pedido/`);
  req.body.p_fecha_modificacion=getAhora();
  console.log(req.body);
  daoPediEsta.insertar(req.body).then( (bd_response) => {
      console.log(`STATUS OK : 200`)      
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

    })
});

app.post('/consultar/pedido', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultar/pedido")

  daoPedido.consultar(req.body.p_id_pedido)
      .then( ({rows}) => {
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});

app.post('/insertar/tipo', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/insertar/tipo")
  switch(req.body.tipo_pago)
  {
    case 1: 
      daoPedido.insertarCredito(req.body).then( ({rows}) => {res.status(200).json({"rows" : rows})}).catch( (bd_err)=> {console.error(`bd_err : ${JSON.stringify(bd_err)}`);res.status(500).json(bd_err)}); 
      break;
    case 2: 
      daoPedido.insertarDebito(req.body).then( ({rows}) => {res.status(200).json({"rows" : rows})}).catch( (bd_err)=> {console.error(`bd_err : ${JSON.stringify(bd_err)}`);res.status(500).json(bd_err)}); 
      break;
    case 3: 
      daoPedido.insertarCheque(req.body).then( ({rows}) => {res.status(200).json({"rows" : rows})}).catch( (bd_err)=> {console.error(`bd_err : ${JSON.stringify(bd_err)}`);res.status(500).json(bd_err)}); 
      break;
    case 4: 
      daoPedido.insertarTransferencia(req.body).then( ({rows}) => {res.status(200).json({"rows" : rows})}).catch( (bd_err)=> {console.error(`bd_err : ${JSON.stringify(bd_err)}`);res.status(500).json(bd_err)}); 
      break;
  }
  
});

app.post('/insertar/pedi_tipo', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/insertar/pedi_tipo")
  req.body.p_fecha_pago=getAhora();
  daoPedido.pagar(req.body)
      .then( ({rows}) => {
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});

app.post('/consultar/pedi_tipo', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultar/pedi_tipo")
  daoPedido.consultarPago(req.body.p_id_pedido)
      .then( ({rows}) => {
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});

app.post('/consultar/tipo', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultar/tipo")
  console.log(req.body)
  if(req.body.credito_id)
    daoPedido.consultarCredito(req.body.credito_id).then( ({rows}) => {res.status(200).json({"rows" : rows})}).catch( (bd_err)=> {console.error(`bd_err : ${JSON.stringify(bd_err)}`); res.status(500).json(bd_err)})
  else if(req.body.debito_id)
    daoPedido.consultarDebito(req.body.debito_id).then( ({rows}) => {res.status(200).json({"rows" : rows})}).catch( (bd_err)=> {console.error(`bd_err : ${JSON.stringify(bd_err)}`); res.status(500).json(bd_err)})
  else if(req.body.cheque_id)
    daoPedido.consultarCheque(req.body.cheque_id).then( ({rows}) => {res.status(200).json({"rows" : rows})}).catch( (bd_err)=> {console.error(`bd_err : ${JSON.stringify(bd_err)}`); res.status(500).json(bd_err)})
  else if(req.body.transferencia_id)
    daoPedido.consultarTransferencia(req.body.transferencia_id).then( ({rows}) => {res.status(200).json({"rows" : rows})}).catch( (bd_err)=> {console.error(`bd_err : ${JSON.stringify(bd_err)}`); res.status(500).json(bd_err)})
});


/* ****************************** PRODUCTO ****************************** */
app.get('/consultarLista/producto', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/producto")

  daoProducto.consultarTodos()
      .then( ({rows}) => {
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});


/* ****************************** INVENTARIO ****************************** */
app.get('/consultarLista/inventario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/inventario")

  daoInventario.consultarTodos()
      .then( ({rows}) => {
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});

app.post('/consultarCantidad/inventario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarCantidad/inventario/"+req.body.mineral_id)

  daoInventario.cantidadMineralGuardado(req.body.mineral_id)
      .then( ({rows}) => {
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});


app.post('/insertar/inventario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/insertar/inventario")
  req.body.i_fecha_modificacion=getAhora();
  console.log(req.body);
  daoInventario.insertar(req.body)
      .then( ({rows}) => {
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});

app.get('/consultarMovimiento/inventario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarMovimiento/inventario")

  daoInventario.todosLosMovimientos()
      .then( ({rows}) => {
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});

/* ****************************** HORARIO ****************************** */
app.get('/consultarLista/horario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/horario")

  daoHorario.consultarTodos()
      .then( ({rows}) => {
        console.log(rows);
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});

app.get('/consultarLista/horario_v2', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarLista/horario_v2")

  daoHorario.consultarTodosV2()
      .then( ({rows}) => {
        console.log(rows);
        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err)=> {
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)
        res.status(500).json(bd_err)

      })
});

app.post('/consultar/horario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(`/consultar/horario/${req.body.h_id_horario}`)
  daoHorario.consultar(req.body.h_id_horario)
      .then( ({rows}) => {
        console.log(`STATUS OK : 200`)

        res.status(200).json({"rows" : rows})

      })
      .catch( (bd_err) => {
        console.log(`STATUS ERROR: 500`)
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)

        res.status(500).json(bd_err)

      })
});

app.post('/insertar/horario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(req.body)
  daoHorario.insertar(req.body)
      .then( (bd_response) => {
        console.log(`STATUS OK : 200`)
        res.status(200).json({"rows" : bd_response.rows})
        let h=bd_response.rows[0].h_id_horario;

        let jor=req.body.jornadas;
        try
        {
          for (let i in jor)
          {
            for(let j=0;j<jor[i].length;j++)
            {
              let data={j_dia: i, j_hora_entrada: jor[i][j].hora_entrada, j_hora_salida: jor[i][j].hora_salida, horario_id: h};
              console.log(data);

              daoHorario.insertarJornada(data).then(
                  (bd_response) => {
                  console.log(`STATUS OK : 200`)}).catch((e)=>error(e));
            }
          }
        }
        catch (e)
        {

        }
      })
      .catch( (bd_err) => {
        console.log(`STATUS ERROR: 500`)
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)

        res.status(500).json(bd_err)

      })
});


app.post('/editar/horario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(req.body)
  daoHorario.eliminarJornadas(req.body.horario_id)
      .then( (bd_response) => {
        console.log(`STATUS OK : 200`)
        daoHorario.modificar(req.body).then((bd_response)=>{
          res.status(200).json({"rowCount" : bd_response.rowCount})
          })
      })
      .catch( (bd_err) => {
        console.log(`STATUS ERROR: 500`)
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)

        res.status(500).json(bd_err)

      })
});

app.post('/eliminar/horario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log(req.body)
  daoHorario.eliminarJornadas(req.body.horario_id)
      .then( (bd_response) => {
        console.log(`STATUS OK : 200`)
        daoHorario.eliminar(req.body.horario_id).then((bd_response)=>{
          console.log(`STATUS OK : 200`)
          res.status(200).json({"rows" : bd_response.rows});
      }).catch((e)=>error(e))})
      .catch( (bd_err) => {
        console.log(`STATUS ERROR: 500`)
        console.error(`bd_err : ${JSON.stringify(bd_err)}`)

        res.status(500).json(bd_err)

      })
});


/* ****************************** LEVANTAR API ****************************** */
app.listen(port, () => {
  console.log('************************************************************');
  console.log('************************************************************');
  console.log('********************BACKEND ESTA ARRIBA!********************');
  console.log('************************************************************');
  console.log('************************************************************');
});