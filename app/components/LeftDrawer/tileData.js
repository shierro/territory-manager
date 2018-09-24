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
import Placements from '@material-ui/icons/Assignment';
import ViewList from '@material-ui/icons/ViewList';
import List from '@material-ui/core/List';

export const mainFolderListItems = params => {
  const getLiProps = nested => ({
    classes: {
      root: `${params.classes.liRoot} ${nested && params.classes.liNested}`,
      button: params.classes.liButton,
      divider: params.classes.liDivider,
    },
    button: true,
    divider: true,
  });
  return (
    <div>
      <ListItem
        {...getLiProps()}
        selected={params.path === '/home'}
        onClick={() => params.history.push('/home')}
      >
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText inset primary="Home" />
      </ListItem>
      <ListItem
        {...getLiProps()}
        selected={params.path === '/placements'}
        onClick={() => params.history.push('/placements')}
      >
        <ListItemIcon>
          <Placements />
        </ListItemIcon>
        <ListItemText inset primary="Placements" />
      </ListItem>
      <ListItem {...getLiProps()} onClick={params.foldPeople}>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText inset primary="People" />
        {params.peopleFolded ? (
          <ExpandLess color="secondary" />
        ) : (
          <ExpandMore color="secondary" />
        )}
      </ListItem>
      <Collapse in={params.peopleFolded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            {...getLiProps(true)}
            selected={params.path === '/people/list'}
            onClick={() => params.history.push('/people/list')}
          >
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText inset primary="List View" />
          </ListItem>
          <ListItem
            {...getLiProps(true)}
            selected={params.path === '/people/map'}
            onClick={() => params.history.push('/people/map')}
          >
            <ListItemIcon>
              <Terrain />
            </ListItemIcon>
            <ListItemText inset primary="Map View" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem {...getLiProps()} onClick={params.logout}>
        <ListItemIcon>
          <PowerSettingsNew />
        </ListItemIcon>
        <ListItemText inset primary="Logout" />
      </ListItem>
    </div>
  );
};
