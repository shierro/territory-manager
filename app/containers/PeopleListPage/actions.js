import { SORT, PAGE_CHANGE, ROWS_PER_PAGE_CHANGE } from './constants';

export function handleRequestSort(property) {
  return { type: SORT, property };
}

export function handleChangePage(page) {
  return { type: PAGE_CHANGE, page };
}

export function handleChangeRowsPerPage({ target }) {
  return { type: ROWS_PER_PAGE_CHANGE, rowsPerPage: target.value };
}

export const pageActions = dispatch => ({
  handleRequestSort: (event, property) => dispatch(handleRequestSort(property)),
  handleChangePage: (event, page) => dispatch(handleChangePage(page)),
  handleChangeRowsPerPage: event =>
    dispatch(handleChangeRowsPerPage(event || { target: {} })),
});
