import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const styles = (theme) => ({
  appBar: {
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

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { classes, open, handleDrawerOpen, token } = this.props;
    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!open}>
          {
            token &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide, 'drawer-toggle')}
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography
            variant="title"
            color="inherit"
            className={classNames(classes.title)}
            noWrap
          >
            Territory Manager
          </Typography>
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
