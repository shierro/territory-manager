import React from 'react';
import Header from 'components/Header';

const renderHeader = (drawerOpen, token, toggleDrawer) => (
  <Header open={drawerOpen} handleDrawerOpen={toggleDrawer} token={token} />
);

export default renderHeader;
