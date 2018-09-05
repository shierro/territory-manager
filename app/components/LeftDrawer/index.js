import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainFolderListItems, actionListItems } from './tileData';
import styles from './styles';

class LeftDrawer extends React.PureComponent {
  state = { folded: { people: true } };
  handleClick = () => {
    this.setState(state => ({ folded: { people: !state.folded.people } }));
  };
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
    const { classes, open, toggleDrawer, hidden, path, history } = this.props;
    const {
      folded: { people },
    } = this.state;
    const { drawerPaper, drawerPaperClose, nested } = classes;
    const paper = classNames(drawerPaper, !open && drawerPaperClose);
    const navProps = {
      foldPeople: this.handleClick,
      nestedClass: open ? nested : '',
      peopleFolded: people,
      path,
      history,
    };
    return (
      <Drawer
        classes={{ paper }}
        open={open}
        style={{ display: hidden && 'none' }}
        variant="permanent"
      >
        {this.renderToggleButton(classes, toggleDrawer)}
        <Divider />
        <List component="nav">{mainFolderListItems(navProps)}</List>
        <Divider />
        <List component="nav">{actionListItems(this.props.logout)}</List>
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
  path: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LeftDrawer);
