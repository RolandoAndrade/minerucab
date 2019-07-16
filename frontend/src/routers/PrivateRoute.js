import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      !!localStorage.getItem("user") ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );
