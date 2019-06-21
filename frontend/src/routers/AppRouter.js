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


import {Cliente} from '../pages/Cliente';
import {Mineral} from '../pages/Mineral';
import {Empleados} from "../pages/Empleados";
import {ClienteAgregar} from '../pages/ClienteAgregar';
import {EmpleadosCrear} from "../pages/EmpleadosCrear";
import {MineralAgregar} from '../pages/MineralAgregar';
import {HorarioCrear} from "../pages/HorarioCrear";
import {MineralEditar} from '../pages/MineralEditar';
import {ClienteEditar} from '../pages/ClienteEditar';


export const history = createHistory(); // PARA LLEVAR EL CONTROL DE PAGINAS VISITADAS POR USER

const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        {/* SOLO SE ENTRA EN ALGUNA DE LAS PAGINAS A LA VEZ */}

        {/* PAGINAS QUE CARGAN DESLOGEADO */}
        <PublicRoute path="/" component={Home} exact={true} />
        <PublicRoute path="/dashboard" component={MainPanel} />
        <PublicRoute path="/cliente" component={Cliente} />
        <PublicRoute path="/mineral" component={Mineral} />
        <PublicRoute path="/crear/cliente" component={ClienteAgregar} />
        <PublicRoute path="/crear/empleado" component={EmpleadosCrear} />
        <PublicRoute path="/crear/mineral" component={MineralAgregar} />
        <PublicRoute path="/crear/horario" component={HorarioCrear} />
        <PublicRoute path="/editar/cliente/:id" component={ClienteEditar} />
        <PublicRoute path="/editar/mineral/:id" component={MineralEditar} />

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