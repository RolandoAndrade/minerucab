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
      yacimiento_configuracion["etapas"].map((e,i) => { 
        daoFaseConfiguracion.consultarTodosEtapa(e.e_id_etapa_configuracion)
        .then((resp_bd) => {
          yacimiento_configuracion["etapas"][i]["fases"] = resp_bd.rows
          yacimiento_configuracion["etapas"][i]["fases"].map((f,j) => {
            daoFaseConfiguracion.consultarCargos(f.f_id_fase_configuracion)
            .then((resp_bd) => {
              yacimiento_configuracion["etapas"][i]["fases"][j]["cargos"] = resp_bd.rows
              daoFaseConfiguracion.consultarMaquinarias(f.f_id_fase_configuracion)
              .then((resp_bd) => {
                yacimiento_configuracion["etapas"][i]["fases"][j]["maquinarias"] = resp_bd.rows ? resp_bd.rows : []
                if( (i === (yacimiento_configuracion["etapas"].length - 1)) && (j === (yacimiento_configuracion["etapas"][i]["fases"].length - 1)))
                resolve("bien!")    
              })
            })
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
  daoYacimientoConfiguracion.insertar(y.y_nombre,y.y_capacidad_explotacion,y.mineral_id,7)
  .then((resp_bd) => {
    console.log(`\n\ninsetado yamiento_config id ${resp_bd.rows[0].y_id_yacimiento_configuracion}`)
    return resp_bd.rows[0].y_id_yacimiento_configuracion
  })
  .then((yac_id) => {
    return new Promise((resolve,reject) => {
      y["etapas"].map((e,i) => { 
        daoEtapaConfiguracion.insertar(e.e_nombre,e.e_orden,e.e_tipo,yac_id)
        .then((resp_bd) => {
          let e_id = resp_bd.rows[0].e_id_etapa_configuracion
          console.log(`\n\nInsertada etapa ${e_id} en el yac_config ${yac_id}`)
          y["etapas"][i]["fases"].map((f,j) => {
            daoFaseConfiguracion.insertar(f.f_nombre,f.f_orden,f.f_duracion,f.f_descripcion,e_id,f.unidad_id)
            .then((resp_bd) => {
              let f_id = resp_bd.rows[0].f_id_fase_configuracion
              console.log(`\n\nInsertada fase ${f_id} en la etapa ${e_id} en el yac_config ${yac_id}`)
              if (f["cargos"].length > 0) {
                daoFaseConfiguracion.asignarVariosCargo(f_id,f["cargos"])
                .then((resp_bd) => {
                  console.log(`\n\n cargos insertads en la fase_id : ${f_id}`)
                  if (f["maquinarias"].length > 0) {
                    daoFaseConfiguracion.asignarVariosMaquinaria(f_id,f["maquinarias"])
                    .then((resp_bd) => {
                      console.log(`\n\n maquinarias insertads en la fase_id : ${f_id}`)
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
    res.status(200).json({"message" : "exito!"})
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
  daoYacimientoConfiguracion.BorrarRequisitos(y.y_id_yacimiento_configuracion)
  .then((resp_bd) => {
    return daoYacimientoConfiguracion.BorrarEtapas(y.y_id_yacimiento_configuracion)
  })
  .then((resp_bd) => {
    return daoYacimientoConfiguracion.modificar(y.y_id_yacimiento_configuracion,y.y_nombre,y.y_capacidad_explotacion,y.mineral_id,y.unidad_id)
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

/* ****************************** YACIMIENTO ****************************** */
import {daoProyecto} from './DAOs/daoProyecto'
import {daoProducto} from "./DAOs/daoProducto";
import {daoPediProd} from "./DAOs/daoPediProd";
import {daoPediEsta} from "./DAOs/daoPediEsta";

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


/* ****************************** LEVANTAR API ****************************** */
app.listen(port, () => {
  console.log('************************************************************');
  console.log('************************************************************');
  console.log('********************BACKEND ESTA ARRIBA!********************');
  console.log('************************************************************');
  console.log('************************************************************');
});