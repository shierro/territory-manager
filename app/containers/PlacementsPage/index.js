import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import VideoLabel from '@material-ui/icons/VideoLabel';
import Add from '@material-ui/icons/AddCircleOutline';
import Publications from '@material-ui/icons/LibraryBooks';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Divider from '../../components/Divider';
import DynamicChart from '../../components/DynamicChart';
import { allSelectors } from './selectors';
import { pageActions } from './actions';
import reducer from './reducer';
import saga from './saga';
import styles from './styles';
import chartMetaData from './chartMetaData';
import getChartLabels from './getChartLabels';

/* eslint-disable react/no-array-index-key, no-param-reassign */
export class PlacementsPage extends React.Component {
  renderItem({ Component, text, increment, key, color }) {
    return (
      <ListItem key={key} divider>
        <ListItemIcon>
          <IconButton aria-label="Add" disabled>
            <Component color={color} />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={text} />
        <ListItemSecondaryAction onClick={increment}>
          <IconButton aria-label="Add">
            <Add color={color} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
  placements(data) {
    const { increment } = this.props;
    return [
      {
        Component: Publications,
        text: `[${data.publications.total}] Publications`,
        key: `counter-publications`,
        increment: () => increment('publications'),
        color: 'secondary',
      },
      {
        Component: VideoLabel,
        text: `[${data.videos.total}] Videos`,
        key: `counter-videos`,
        increment: () => increment('videos'),
        color: 'primary',
      },
    ];
  }
  placementsToDataPoints(placements) {
    return Object.keys(placements).map(key => {
      placements[key].label = key;
      placements[key].dataSetMeta = chartMetaData[key];
      return placements[key];
    });
  }
  render() {
    const { classes, title, placements, grouping } = this.props;
    return (
      <Paper elevation={1} className={classes.container}>
        <Typography variant="headline" classes={{ root: classes.title }}>
          {title}
        </Typography>
        <Divider marginTop={10} />
        <div className={classes.content}>
          <List>{this.placements(placements).map(this.renderItem)}</List>
        </div>
        <Divider marginTop={10} />
        <DynamicChart
          type="Line"
          data={[...this.placementsToDataPoints(placements)]}
          labels={getChartLabels(grouping)}
        />
      </Paper>
    );
  }
}

PlacementsPage.propTypes = {
  title: PropTypes.string.isRequired,
  grouping: PropTypes.string.isRequired,
  increment: PropTypes.func.isRequired,
  placements: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const withConnect = connect(
  createStructuredSelector(allSelectors), // map state to props
  pageActions, // map actions to props
);

const withReducer = injectReducer({ key: 'placementsPage', reducer });
const withSaga = injectSaga({ key: 'placementsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(PlacementsPage));
