import {
  handleChangeRowsPerPage,
  handleRequestSort,
  handleChangePage,
} from '../App/actions';

export const pageActions = dispatch => ({
  handleRequestSort: (event, property) => dispatch(handleRequestSort(property)),
  handleChangePage: (event, page) => dispatch(handleChangePage(page)),
  handleChangeRowsPerPage: event =>
    dispatch(handleChangeRowsPerPage(event || { target: {} })),
});
