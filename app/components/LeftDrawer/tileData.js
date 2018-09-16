/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import Terrain from '@material-ui/icons/Terrain';
import People from '@material-ui/icons/People';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ViewList from '@material-ui/icons/ViewList';
import List from '@material-ui/core/List';

const renderListItemButton = (Component, primary, params, content) => (
  <ListItem
    button
    selected={params.path === params.navPath}
    onClick={params.onClick || (() => params.history.push(params.navPath))}
  >
    <ListItemIcon>
      <Component />
    </ListItemIcon>
    <ListItemText inset primary={primary} />
    {content}
  </ListItem>
);

const getParams = (navPath, params) => ({
  ...params,
  navPath,
});

export const mainFolderListItems = params => (
  <div>
    {renderListItemButton(Home, 'Home', getParams('/home', params))}
    {renderListItemButton(
      People,
      'People',
      getParams('', { ...params, onClick: params.foldPeople }),
      params.peopleFolded ? <ExpandLess /> : <ExpandMore />,
    )}
    <Collapse in={params.peopleFolded} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {renderListItemButton(
          ViewList,
          'List View',
          getParams('/people/list', params),
        )}
        {renderListItemButton(
          Terrain,
          'Map View',
          getParams('/people/map', params),
        )}
      </List>
    </Collapse>
  </div>
);

export const actionListItems = onClick =>
  renderListItemButton(PowerSettingsNew, 'Logout', {
    onClick,
    navPath: '/login',
  });
