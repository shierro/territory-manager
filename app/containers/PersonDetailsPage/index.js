import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { allSelectors } from './selectors';
import { pageActions } from './actions';
import reducer from './reducer';
import saga from './saga';
import PersonDetails from '../../components/PersonDetails';
import TableHead from '../../components/TableHead';
import Divider from '../../components/Divider';
// import AddVisit from '../../components/AddVisit';
import columns from './tableColumns';
import { stableSort, getSorting } from '../../utils/sorting';
import styles from './styles';

/* eslint-disable react/no-array-index-key */
export class PersonDetailsPage extends React.Component {
  componentDidMount() {
    this.props.handlePersonClick(this.props.match.params.id);
  }
  renderVisits(visits) {
    const { order, orderBy, handleRequestSort, classes } = this.props;
    return (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(visits, getSorting(order, orderBy)).map((visit, i) => (
              <TableRow hover tabIndex={-1} key={i}>
                <TableCell className={classes.cell}>
                  {visit.date.toString()}
                </TableCell>
                <TableCell className={classes.cell}>
                  {visit.found ? 'Found' : 'Not found'}
                </TableCell>
                <TableCell className={classes.cell}>{visit.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  renderVisitsHeader(person, classes) {
    return (
      <div className={classes.row}>
        <div className={classes.visitsTitle}>{this.props.visitsTitle}</div>
        {/* <AddVisit
          containerCLass={classes.col}
          person={person}
          saveVisit={this.props.saveVisit}
          addingVisit={this.props.addingVisit}
          toggleAddingVisit={this.props.toggleAddingVisit}
        /> */}
        <Button
          mini
          variant="fab"
          aria-label="add"
          color="secondary"
          // onClick={this.props.addVisit}
        >
          <Add />
        </Button>
      </div>
    );
  }
  renderNotFound() {
    return <h2>Person not found.</h2>;
  }
  render() {
    const { match, people, classes } = this.props;
    const person = people[match.params.id];
    if (!person) {
      return this.renderNotFound();
    }
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Divider marginTop={10} />
        <PersonDetails
          person={person}
          handlePersonUpdate={this.props.handlePersonUpdate}
        />
        {this.renderVisitsHeader(person, classes)}
        <Divider marginTop={10} />
        {this.renderVisits(person.visits)}
      </div>
    );
  }
}

PersonDetailsPage.propTypes = {
  title: PropTypes.string.isRequired,
  visitsTitle: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  people: PropTypes.object.isRequired,
  handlePersonUpdate: PropTypes.func.isRequired,
  handlePersonClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  // saveVisit: PropTypes.func.isRequired,
  // addingVisit: PropTypes.func.isRequired,
  // toggleAddingVisit: PropTypes.func.isRequired,
};

const withConnect = connect(
  createStructuredSelector(allSelectors), // map state to props
  pageActions, // map actions to props
);

const withReducer = injectReducer({ key: 'personDetailsPage', reducer });
const withSaga = injectSaga({ key: 'personDetailsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(PersonDetailsPage));
