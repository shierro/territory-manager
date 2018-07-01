import { doLogin, setError } from '../actions';
import { LOGIN, SET_ERROR } from '../constants';

describe('LoginPage actions', () => {
  describe('LOGIN Action', () => {
    it('has a type of LOGIN', () => {
      const expected = {
        type: LOGIN,
      };
      expect(doLogin()).toEqual(expected);
    });
    it('has a type of SET_ERROR', () => {
      const expected = {
        type: SET_ERROR,
      };
      expect(setError()).toEqual(expected);
    });
  });
});
