import {
  handlePersonUpdate,
  handlePersonClick,
  toggleAddingVisit,
  saveVisit,
} from '../MapPage/actions';
import {
  handleChangeRowsPerPage,
  handleRequestSort,
  handleChangePage,
} from '../App/actions';

export const pageActions = dispatch => ({
  handlePersonUpdate: (key, value) => dispatch(handlePersonUpdate(key, value)),
  handlePersonClick: index => dispatch(handlePersonClick(index)),
  handleRequestSort: (event, property) => dispatch(handleRequestSort(property)),
  handleChangePage: (event, page) => dispatch(handleChangePage(page)),
  handleChangeRowsPerPage: event =>
    dispatch(handleChangeRowsPerPage(event || { target: {} })),
  toggleAddingVisit: () => dispatch(toggleAddingVisit()),
  saveVisit: visitData => dispatch(saveVisit(visitData)),
});
