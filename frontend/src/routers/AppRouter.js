// LIBRERIAS EXTERNAS
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// TIPOS DE PAGINAS - PATRON HOC (HIGH ORDER COMPONENT)
import {PrivateRoute} from './PrivateRoute';
import {PublicRoute} from './PublicRoute';

// PAGINAS
import {Home} from '../pages/Home';
import {NotFoundPage} from '../pages/NotFoundPage';
import {MainPanel} from "../pages/MainPanel";


import {ConfiguracionYacimientoAgregar} from '../pages/ConfiguracionYacimientoAgregar';

import {Cliente} from '../pages/Cliente';
import {Mineral} from '../pages/Mineral';
import {Empleado} from "../pages/Empleado";
import {ClienteAgregar} from '../pages/ClienteAgregar';
import {EmpleadoAgregar} from "../pages/EmpleadoAgregar";
import {MineralAgregar} from '../pages/MineralAgregar';
import {HorarioCrear} from "../pages/HorarioCrear";
import {MineralEditar} from '../pages/MineralEditar';
import {ClienteEditar} from '../pages/ClienteEditar';
import {EmpleadoEditar} from "../pages/EmpleadoEditar";

import {EmpleadosCrear} from "../pages/EmpleadosCrearRolando";
import {CrearVenta} from "../pages/CrearVenta";


export const history = createHistory(); // PARA LLEVAR EL CONTROL DE PAGINAS VISITADAS POR USER

const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        {/* SOLO SE ENTRA EN ALGUNA DE LAS PAGINAS A LA VEZ */}

        {/* PAGINAS QUE CARGAN DESLOGEADO */}
        <PublicRoute path="/" component={Home} exact={true} />
        <PublicRoute path="/configuracion-yacimiento-agregar" component={ConfiguracionYacimientoAgregar} />
        <PublicRoute path="/dashboard" component={MainPanel} />
        <PublicRoute path="/cliente" component={Cliente} />
        <PublicRoute path="/mineral" component={Mineral} />
        <PublicRoute path="/empleado" component={Empleado} />
        <PublicRoute path="/crear/cliente" component={ClienteAgregar} />
        <PublicRoute path="/crear/empleado" component={EmpleadoAgregar} />
        <PublicRoute path="/crear/mineral" component={MineralAgregar} />
        <PublicRoute path="/crear/horario" component={HorarioCrear} />
        <PublicRoute path="/editar/cliente/:id" component={ClienteEditar} />
        <PublicRoute path="/editar/mineral/:id" component={MineralEditar} />
        <PublicRoute path="/editar/empleado/:id" component={EmpleadoEditar} />
        <PublicRoute path="/crear/solicitud" component={CrearVenta} />

        <PublicRoute path="/crear/empleadoRolando" component={EmpleadosCrear} />

        {/* 
          PAGINAS QUE CARGAN LOGEADOS 
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/pagina1" component={Pagina1} />
          <PrivateRoute path="/pagina2" component={Pagina2} />
          <PrivateRoute path="/minerales/:id" component={EditMineral} />
        */}

        {/* SI SE INGRESA UNA PAGINA QUE NO TIENE SENTIDO */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export { AppRouter };