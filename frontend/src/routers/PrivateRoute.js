import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
  component: Component,
  permisoPagina,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      !!localStorage.getItem("user") && (
        !permisoPagina ||
        JSON.parse( localStorage.getItem("user") )
          .permisos.find( p => p.a_id_accion === permisoPagina )
      ) ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );
