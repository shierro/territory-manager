import { DEFAULT_ACTION, GET_INITIAL_LOCATION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setInitialLocation() {
  return { type: GET_INITIAL_LOCATION };
}
