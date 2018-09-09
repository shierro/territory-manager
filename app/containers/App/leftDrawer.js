/* eslint-disable react/prop-types */
import React from 'react';
import LeftDrawer from 'components/LeftDrawer';

const renderLeftDrawer = props => (
  <LeftDrawer
    open={props.drawerOpen}
    hidden={!props.token}
    toggleDrawer={props.toggleDrawer}
    path={props.location.pathname}
    history={props.history}
    logout={props.logout}
  />
);

export default renderLeftDrawer;
