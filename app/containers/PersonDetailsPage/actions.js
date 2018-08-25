import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return { type: DEFAULT_ACTION };
}

export const pageActions = dispatch => ({
  defaultAction: () => dispatch(defaultAction()),
});
