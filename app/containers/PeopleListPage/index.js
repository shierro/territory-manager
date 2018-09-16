/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { allSelectors } from './selectors';
import { pageActions } from './actions';
import reducer from './reducer';
import saga from './saga';
import EnhancedTableToolbar from './tableToolbar';
import TableHead from '../../components/TableHead';
import TablePagination from '../../components/TablePagination';
import { mainStyles as styles } from './styles';
import columns from './tableColumns';
import { stableSort, getSorting } from '../../utils/sorting';
import { objToArray } from '../../utils/parser';

export class PeopleListPage extends React.Component {
  renderTableBody(people, order, orderBy) {
    const { rowsPerPage, page, history, classes } = this.props;
    return stableSort(people, getSorting(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((n, i) => (
        <TableRow hover tabIndex={-1} key={i}>
          <TableCell className={classes.cell}>{n.firstName}</TableCell>
          <TableCell className={classes.cell}>{n.lastName}</TableCell>
          <TableCell className={classes.cell}>
            {n.ageRange.min}-{n.ageRange.max}
          </TableCell>
          <TableCell className={classes.cell}>{n.visits.length}</TableCell>
          <TableCell className={classes.cell}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push(`/person/${n.id}`)}
            >
              Details
            </Button>
          </TableCell>
        </TableRow>
      ));
  }
  render() {
    const { data, order, orderBy, classes } = this.props;
    const people = objToArray(data);
    const paginationProps = { ...this.props, count: people.length };
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.props.handleRequestSort}
            />
            <TableBody>
              {this.renderTableBody(people, order, orderBy)}
            </TableBody>
          </Table>
        </div>
        <TablePagination {...paginationProps} />
      </Paper>
    );
  }
}

PeopleListPage.propTypes = {
  data: PropTypes.object.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const withConnect = connect(
  createStructuredSelector(allSelectors), // map state to props
  pageActions, // map actions to props
);

const withReducer = injectReducer({ key: 'peopleListPage', reducer });
const withSaga = injectSaga({ key: 'peopleListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(PeopleListPage));
