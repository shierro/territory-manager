/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import getPrivateRoutes from './privateRoutes';

const base = process.env.PUBLIC_PATH || '';

const renderLeftDrawer = props => (
  <main className={props.classes.content}>
    <div className={props.classes.toolbar} />
    <Switch>
      <Route exact path={`${base}/login`} component={LoginPage} />
      <Route exact path={`${base}/`} component={LoginPage} />
      {getPrivateRoutes(props.token).map(prps => <PrivateRoute {...prps} />)}
      <Route component={NotFoundPage} />
    </Switch>
  </main>
);

export default renderLeftDrawer;
