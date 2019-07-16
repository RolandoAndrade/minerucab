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
        <PrivateRoute permisoPagina={1} path="/crear/mineral" component={MineralAgregar} />
        <PrivateRoute permisoPagina={2} path="/mineral" component={Mineral} />
        <PrivateRoute permisoPagina={3} path="/editar/mineral/:id" component={MineralEditar} />
        <PrivateRoute permisoPagina={9} path="/crear/empleado" component={EmpleadoAgregar} />
        <PrivateRoute permisoPagina={10} path="/empleado" component={Empleado} />
        <PrivateRoute permisoPagina={11} path="/editar/empleado/:id" component={EmpleadoEditar} />
        <PrivateRoute permisoPagina={17} path="/crear/pedido" component={CrearVenta} />
        <PrivateRoute permisoPagina={18} path="/pedido" component={Pedido} />
        <PrivateRoute permisoPagina={21} path="/crear/cliente" component={ClienteAgregar} />
        <PrivateRoute permisoPagina={22} path="/cliente" component={Cliente} />
        <PrivateRoute permisoPagina={23} path="/editar/cliente/:id" component={ClienteEditar} />
        <PrivateRoute permisoPagina={25} path="/crear/proyecto" component={ProyectoAgregar} />
        <PrivateRoute permisoPagina={26} path="/proyecto" component={Proyecto} />
        <PrivateRoute permisoPagina={26} path="/editar/proyecto/:id" component={ProyectoEditar} />
        <PrivateRoute permisoPagina={29} path="/crear/yacimiento" component={YacimientoAgregar} />
        <PrivateRoute permisoPagina={30} path="/yacimiento" component={Yacimiento} />
        <PrivateRoute permisoPagina={31} path="/editar/yacimiento/:id" component={YacimientoEditar} />
        <PrivateRoute permisoPagina={34} path="/solicitud" component={Solicitud} />
        <PrivateRoute permisoPagina={42} path="/aliado" component={Aliado} />
        <PrivateRoute permisoPagina={45} path="/crear/yacimiento-configuracion" component={ConfiguracionYacimientoAgregar} />
        <PrivateRoute permisoPagina={46} path="/yacimiento-configuracion" component={ConfiguracionYacimiento} />
        <PrivateRoute permisoPagina={47} path="/editar/yacimiento-configuracion/:id" component={ConfiguracionYacimientoEditar} />

        <PrivateRoute permisoPagina={53} path="/crear/horario" component={AgregarHorario} />
        <PrivateRoute permisoPagina={54} path="/horario" component={Horario} />
        <PrivateRoute permisoPagina={55} path="/editar/horario/:id" component={EditarHorario} />
        <PrivateRoute permisoPagina={18} path="/pago/:id" component={Pagos} />
        <PrivateRoute permisoPagina={18} path="/factura/:id" component={Facturita} />
        

        <PrivateRoute permisoPagina={38} path="/inventario" component={InventarioMovs} />
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