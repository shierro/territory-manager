import {
  SET_TOKEN,
  LOGOUT,
  TOGGLE_DRAWER,
  SORT,
  PAGE_CHANGE,
  ROWS_PER_PAGE_CHANGE,
} from './constants';

export function handleRequestSort(property) {
  return { type: SORT, property };
}

export function handleChangePage(page) {
  return { type: PAGE_CHANGE, page };
}

export function handleChangeRowsPerPage({ target }) {
  return { type: ROWS_PER_PAGE_CHANGE, rowsPerPage: target.value };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

export const appActions = dispatch => ({
  logout: () => dispatch(logout()),
  toggleDrawer: () => dispatch(toggleDrawer()),
});
