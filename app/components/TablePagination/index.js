import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

class Pagination extends React.PureComponent {
  render() {
    return (
      <TablePagination
        component="div"
        count={this.props.count}
        rowsPerPage={this.props.rowsPerPage}
        page={this.props.page}
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
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default Pagination;
