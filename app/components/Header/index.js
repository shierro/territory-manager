import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import './_Header.scss';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    height: 60,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 12,
  },
  hide: {
    display: 'none',
  },
  title: {
    marginLeft: 12,
  },
});

class Header extends React.PureComponent {
  render() {
    const { classes, open, handleDrawerOpen, token } = this.props;
    return (
      <AppBar
        position="absolute"
        className={classNames(
          classes.appBar,
          open && classes.appBarShift,
          'header',
        )}
      >
        <Toolbar disableGutters={!open}>
          {token && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                open && classes.hide,
                'drawer-toggle',
              )}
            >
              <MenuIcon />
            </IconButton>
          )}
          <NavLink to="/" className={classNames(classes.title)}>
            <h2>Territory Manager</h2>
          </NavLink>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
