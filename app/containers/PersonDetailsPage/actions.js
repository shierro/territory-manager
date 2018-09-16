import { handlePersonUpdate, handlePersonClick } from '../MapPage/actions';
import { handleRequestSort } from '../App/actions';

export const pageActions = dispatch => ({
  handlePersonUpdate: (key, value) => dispatch(handlePersonUpdate(key, value)),
  handlePersonClick: index => dispatch(handlePersonClick(index)),
  handleRequestSort: (event, property) => dispatch(handleRequestSort(property)),
});
