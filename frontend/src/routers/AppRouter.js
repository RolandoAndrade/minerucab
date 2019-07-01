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
import {ConfiguracionYacimientoEditar} from '../pages/ConfiguracionYacimientoEditar';

import {Cliente} from '../pages/Cliente';
import {Aliado} from '../pages/Aliado';
import {Mineral} from '../pages/Mineral';
import {Empleado} from "../pages/Empleado";
import {Yacimiento} from "../pages/Yacimiento";
import {Proyecto} from "../pages/Proyecto";
import {ConfiguracionYacimiento} from "../pages/ConfiguracionYacimiento";
import {ClienteAgregar} from '../pages/ClienteAgregar';
import {EmpleadoAgregar} from "../pages/EmpleadoAgregar";
import {MineralAgregar} from '../pages/MineralAgregar';
import {YacimientoAgregar} from '../pages/YacimientoAgregar';
import {ProyectoAgregar} from '../pages/ProyectoAgregar';
import {MineralEditar} from '../pages/MineralEditar';
import {ClienteEditar} from '../pages/ClienteEditar';
import {EmpleadoEditar} from "../pages/EmpleadoEditar";
import {YacimientoEditar} from "../pages/YacimientoEditar";

import {EmpleadosCrear} from "../pages/EmpleadosCrearRolando";
import {CrearVenta} from "../pages/CrearVenta";
import {Pedido} from "../pages/Pedido";
import {Scheduler} from "../components/Scheduler";
import {AgregarHorario} from "../pages/AgregarHorario";
import {Horario} from "../pages/Horario";
import {EditarHorario} from "../pages/EditarHorario";
import {Pagos} from "../pages/Pagos";
import {Facturita} from "../pages/Facturita";
import {InventarioMovs} from "../pages/InventarioMovs";

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
        <PublicRoute path="/empleado" component={Empleado} />
        <PublicRoute path="/yacimiento" component={Yacimiento} />
        <PublicRoute path="/proyecto" component={Proyecto} />
        <PublicRoute path="/yacimiento-configuracion" component={ConfiguracionYacimiento} />
        <PublicRoute path="/crear/cliente" component={ClienteAgregar} />
        <PublicRoute path="/crear/empleado" component={EmpleadoAgregar} />
        <PublicRoute path="/crear/mineral" component={MineralAgregar} />
        <PublicRoute path="/crear/yacimiento" component={YacimientoAgregar} />
        <PublicRoute path="/crear/yacimiento-configuracion" component={ConfiguracionYacimientoAgregar} />
        <PublicRoute path="/crear/proyecto" component={ProyectoAgregar} />
        <PublicRoute path="/editar/cliente/:id" component={ClienteEditar} />
        <PublicRoute path="/editar/mineral/:id" component={MineralEditar} />
        <PublicRoute path="/editar/empleado/:id" component={EmpleadoEditar} />
        <PublicRoute path="/editar/yacimiento/:id" component={YacimientoEditar} />
        <PublicRoute path="/editar/yacimiento-configuracion/:id" component={ConfiguracionYacimientoEditar} />
        <PublicRoute path="/crear/pedido" component={CrearVenta} />
        <PublicRoute path="/aliado" component={Aliado} />
        <PublicRoute path="/pedido" component={Pedido} />

        <PublicRoute path="/horario" component={Horario} />
        <PublicRoute path="/crear/horario" component={AgregarHorario} />
        <PublicRoute path="/editar/horario/:id" component={EditarHorario} />
        <PublicRoute path="/pago/:id" component={Pagos} />
        <PublicRoute path="/factura/:id" component={Facturita} />
        

        <PublicRoute path="/inventario" component={InventarioMovs} />
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