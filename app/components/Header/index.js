import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import styles from './styles';
import img from '../../images/icon-512x512.png';

class Header extends React.PureComponent {
  renderToolbar() {
    const { classes, open, handleDrawerOpen, token } = this.props;
    return (
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
        <NavLink to="/" className={classes.title}>
          <img src={img} alt="LOGO" className={classes.logoContainer} />
          <div className={classes.appNameContainer}>
            <span className={classes.appName}>Territory</span>
            <span className={classes.appName}>Manager</span>
          </div>
        </NavLink>
      </Toolbar>
    );
  }
  render() {
    const { classes, open } = this.props;
    return (
      <AppBar
        position="absolute"
        className={classNames(
          classes.appBar,
          open && classes.appBarShift,
          'header',
        )}
      >
        {this.renderToolbar()}
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
