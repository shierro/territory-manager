import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainFolderListItems } from './tileData';
import styles from './styles';

class LeftDrawer extends React.PureComponent {
  state = { folded: { people: true } };
  handleClick = () => {
    this.setState(state => ({ folded: { people: !state.folded.people } }));
  };
  renderToggleButton(classes, toggleDrawer) {
    return (
      <div className={classes.toolbar}>
        <IconButton onClick={toggleDrawer} className={classes.liButton}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
    );
  }
  getNavProps() {
    return {
      ...this.props,
      foldPeople: this.handleClick,
      peopleFolded: this.state.folded.people,
    };
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
        onBackdropClick={toggleDrawer}
        variant="temporary"
      >
        {this.renderToggleButton(classes, toggleDrawer)}
        <Divider />
        <List component="nav" classes={{ root: classes.list }}>
          {mainFolderListItems(this.getNavProps())}
        </List>
      </Drawer>
    );
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  hidden: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(LeftDrawer);
