/* DEPENDENCIAS */
import {daoPedido} from "./DAOs/daoPedido";

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
  console.log(`/eliminar/cliente/${req.body.e_id_empleado}`)
  daoCliente.eliminar(req.body.e_id_empleado)
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

/* ****************************** YACIMIENTO ****************************** */
import {daoProyecto} from './DAOs/daoProyecto'
import {daoProducto} from "./DAOs/daoProducto";
import {daoPediProd} from "./DAOs/daoPediProd";
import {daoPediEsta} from "./DAOs/daoPediEsta";
import {daoInventario} from "./DAOs/daoInventario";
import {daoHorario} from "./DAOs/daoHorario";

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
  daoPedido.eliminar(req.body.p_id_pedido)
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

app.get('/consultarCantidad/inventario', (req, res) => {

  console.log("\n\n")
  console.log(`----------------------> ${getAhora()}`)
  console.log("/consultarCantidad/inventario"+req.body.mineral_id)

  daoInventario.cantidadMineralGuardado(req.body.mineral_id)
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
          res.status(200).json({"rows" : bd_response.rows});
          let h=req.body.horario_id;

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
      })
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