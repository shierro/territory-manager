import { addPersonStart, cancelAdd } from '../actions';
import { ADD_PERSON_START, CANCEL_ADD } from '../constants';

describe('MapPage actions', () => {
  it('has a type of ADD_PERSON_START', () => {
    const expected = {
      type: ADD_PERSON_START,
    };
    expect(addPersonStart()).toEqual(expected);
  });
  it('has a type of CANCEL_ADD', () => {
    const expected = {
      type: CANCEL_ADD,
    };
    expect(cancelAdd()).toEqual(expected);
  });
});
