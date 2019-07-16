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
import {Solicitud} from "../pages/Solicitud";
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
import {ProyectoEditar} from '../pages/ProyectoEditar';

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
        <PrivateRoute path="/dashboard" component={MainPanel} />
        <PrivateRoute path="/cliente" component={Cliente} />
        <PrivateRoute path="/mineral" component={Mineral} />
        <PrivateRoute path="/empleado" component={Empleado} />
        <PrivateRoute path="/yacimiento" component={Yacimiento} />
        <PrivateRoute path="/proyecto" component={Proyecto} />
        <PrivateRoute path="/solicitud" component={Solicitud} />
        <PrivateRoute path="/yacimiento-configuracion" component={ConfiguracionYacimiento} />
        <PrivateRoute path="/crear/cliente" component={ClienteAgregar} />
        <PrivateRoute path="/crear/empleado" component={EmpleadoAgregar} />
        <PrivateRoute path="/crear/mineral" component={MineralAgregar} />
        <PrivateRoute path="/crear/yacimiento" component={YacimientoAgregar} />
        <PrivateRoute path="/crear/yacimiento-configuracion" component={ConfiguracionYacimientoAgregar} />
        <PrivateRoute path="/crear/proyecto" component={ProyectoAgregar} />
        <PrivateRoute path="/editar/cliente/:id" component={ClienteEditar} />
        <PrivateRoute path="/editar/mineral/:id" component={MineralEditar} />
        <PrivateRoute path="/editar/empleado/:id" component={EmpleadoEditar} />
        <PrivateRoute path="/editar/yacimiento/:id" component={YacimientoEditar} />
        <PrivateRoute path="/editar/yacimiento-configuracion/:id" component={ConfiguracionYacimientoEditar} />
        <PrivateRoute path="/editar/proyecto/:id" component={ProyectoEditar} />
        <PrivateRoute path="/crear/pedido" component={CrearVenta} />
        <PrivateRoute path="/aliado" component={Aliado} />
        <PrivateRoute path="/pedido" component={Pedido} />

        <PrivateRoute path="/horario" component={Horario} />
        <PrivateRoute path="/crear/horario" component={AgregarHorario} />
        <PrivateRoute path="/editar/horario/:id" component={EditarHorario} />
        <PrivateRoute path="/pago/:id" component={Pagos} />
        <PrivateRoute path="/factura/:id" component={Facturita} />
        

        <PrivateRoute path="/inventario" component={InventarioMovs} />
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