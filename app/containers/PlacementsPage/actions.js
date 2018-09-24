import { INCREMENT_PLACEMENT } from './constants';

export function increment(placement) {
  return { type: INCREMENT_PLACEMENT, placement };
}

export const pageActions = dispatch => ({
  increment: type => dispatch(increment(type)),
});
