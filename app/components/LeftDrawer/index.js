import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
  mailFolderListItems,
  otherMailFolderListItems,
  actionListItems,
} from './tileData';
import styles from './styles';

class LeftDrawer extends React.PureComponent {
  renderToggleButton(classes, toggleDrawer) {
    return (
      <div className={classes.toolbar}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
    );
  }
  render() {
    const { classes, open, toggleDrawer, hidden } = this.props;
    const { drawerPaper, drawerPaperClose } = classes;
    const paper = classNames(drawerPaper, !open && drawerPaperClose);
    return (
      <Drawer
        classes={{ paper }}
        open={open}
        style={{ display: hidden && 'none' }}
        variant="permanent"
      >
        {this.renderToggleButton(classes, toggleDrawer)}
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
        <Divider />
        <List>{actionListItems(this.props.logout)}</List>
        <Divider />
      </Drawer>
    );
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  hidden: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(LeftDrawer);
