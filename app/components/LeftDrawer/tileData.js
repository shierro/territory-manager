import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import Terrain from '@material-ui/icons/Terrain';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

const renderListItemButton = (Component, primary, key, onClick) => (
  <ListItem button onClick={onClick} key={key}>
    <ListItemIcon>
      <Component />
    </ListItemIcon>
    <ListItemText primary={primary} />
  </ListItem>
);
export const mailFolderListItems = (
  <div>
    {renderListItemButton(Home, 'Home')}
    {renderListItemButton(Terrain, 'Map')}
  </div>
);

const navListItems = [
  { component: InboxIcon, text: 'Inbox' },
  { component: StarIcon, text: 'Starred' },
  { component: SendIcon, text: 'Send mail' },
  { component: DraftsIcon, text: 'Drafts' },
  { component: MailIcon, text: 'All mail' },
  { component: DeleteIcon, text: 'Trash' },
  { component: ReportIcon, text: 'Spam' },
];
export const otherMailFolderListItems = (
  <div>
    {navListItems.map(({ component, text }, key) =>
      renderListItemButton(component, text, key),
    )}
  </div>
);

export const actionListItems = logout =>
  renderListItemButton(PowerSettingsNew, 'Logout', null, logout);
