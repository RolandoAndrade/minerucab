/* DEPENDENCIAS */
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
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

    })
    .catch( (bd_err) => {
      console.log(`STATUS ERROR: 500`)      
      console.error(`bd_err : ${JSON.stringify(bd_err)}`)

      res.status(500).json(bd_err)

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
      
      res.status(200).json({"rowCount" : bd_response.rowCount})

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

/* ****************************** YACIMIENTO ****************************** */
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


/* ****************************** YACIMIENTO ****************************** */
app.get('/consultarLista/yacimiento', (req, res) => { 
  res.send({x: "NO IMPLEMETADO"})
});


/* ****************************** LEVANTAR API ****************************** */
app.listen(port, () => {
  console.log('************************************************************');
  console.log('************************************************************');
  console.log('********************BACKEND ESTA ARRIBA!********************');
  console.log('************************************************************');
  console.log('************************************************************');
});