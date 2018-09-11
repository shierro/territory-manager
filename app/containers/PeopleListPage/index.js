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
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { allSelectors } from './selectors';
import { pageActions } from './actions';
import reducer from './reducer';
import saga from './saga';
import EnhancedTableToolbar from './tableToolbar';
import EnhancedTableHead from './tableHead';
import { mainStyles as styles } from './styles';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export class PeopleListPage extends React.Component {
  renderTableBody(data, order, orderBy) {
    const { rowsPerPage, page, history } = this.props;
    return stableSort(data, getSorting(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((n, i) => (
        <TableRow hover tabIndex={-1} key={i}>
          <TableCell>{n.firstName}</TableCell>
          <TableCell>{n.lastName}</TableCell>
          <TableCell>
            {n.ageRange.min}-{n.ageRange.max}
          </TableCell>
          <TableCell>{n.visits.length}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push(`/person/${i}`)}
            >
              Details
            </Button>
          </TableCell>
        </TableRow>
      ));
  }
  renderTablePagination(data, rowsPerPage, page) {
    return (
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={this.props.handleChangePage}
        onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
      />
    );
  }
  render() {
    const { data, order, orderBy } = this.props;
    const { rowsPerPage, page, classes } = this.props;
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.props.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>{this.renderTableBody(data, order, orderBy)}</TableBody>
          </Table>
        </div>
        {this.renderTablePagination(data, rowsPerPage, page)}
      </Paper>
    );
  }
}

PeopleListPage.propTypes = {
  data: PropTypes.array.isRequired,
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
