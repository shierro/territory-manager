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
import dateFns from 'date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { allSelectors } from './selectors';
import { pageActions } from './actions';
import reducer from './reducer';
import saga from './saga';
import PersonDetails from '../../components/PersonDetails';
import TableHead from '../../components/TableHead';
import TablePagination from '../../components/TablePagination';
import Divider from '../../components/Divider';
import AddVisit from '../../components/AddVisit';
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
    const { page, rowsPerPage } = this.props;
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
            {stableSort(visits, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((visit, i) => (
                <TableRow hover tabIndex={-1} key={i}>
                  <TableCell className={classes.cell}>
                    {dateFns.format(visit.date, 'MMMM DD, YYYY hh:mm a')}
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
  renderDialog(person) {
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="add-visit"
        open={this.props.addingVisit}
      >
        <DialogContent classes={{ root: this.props.classes.dialogContent }}>
          <AddVisit
            person={person}
            saveVisit={this.props.saveVisit}
            addingVisit
            toggleAddingVisit={this.props.toggleAddingVisit}
          />
        </DialogContent>
      </Dialog>
    );
  }
  renderVisitsHeader(classes) {
    return (
      <div className={classes.row}>
        <div className={classes.visitsTitle}>{this.props.visitsTitle}</div>
        <Button
          mini
          variant="fab"
          aria-label="add"
          color="secondary"
          onClick={this.props.toggleAddingVisit}
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
    const paginationProps = { ...this.props, count: person.visits.length };
    return (
      <div>
        <h2>{this.props.title}</h2>
        <Divider marginTop={10} />
        <PersonDetails
          person={person}
          handlePersonUpdate={this.props.handlePersonUpdate}
        />
        {this.renderVisitsHeader(classes)}
        <Divider marginTop={10} />
        {this.renderVisits(person.visits)}
        <TablePagination {...paginationProps} />
        {this.renderDialog(person)}
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
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  saveVisit: PropTypes.func.isRequired,
  addingVisit: PropTypes.bool.isRequired,
  toggleAddingVisit: PropTypes.func.isRequired,
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
