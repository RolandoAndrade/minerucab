import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      localStorage.getItem("user") ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );
