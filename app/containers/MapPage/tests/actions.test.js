import { addPersonStart } from '../actions';
import { ADD_PERSON_START } from '../constants';

describe('MapPage actions', () => {
  describe('ADD_PERSON_START Action', () => {
    it('has a type of ADD_PERSON_START', () => {
      const expected = {
        type: ADD_PERSON_START,
      };
      expect(addPersonStart()).toEqual(expected);
    });
  });
});
