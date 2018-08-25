/* eslint-disable import/no-named-as-default-member */
import { mapPageActions } from '../actions';
import * as constants from '../constants';

const constsArray = Object.keys(constants).map(idx => constants[idx]);
const actions = mapPageActions(result => result);

describe('MapPage actions', () => {
  Object.keys(actions).forEach(action => {
    const { type } = actions[action]();
    it(`has a type [${type}]`, () => {
      expect(constsArray.indexOf(type) > -1).toEqual(true);
    });
  });
});
