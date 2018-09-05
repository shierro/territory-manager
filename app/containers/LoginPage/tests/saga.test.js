/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';

import { LOGIN } from '../constants';
import { setToken } from '../../App/actions';
import { setError } from '../actions';
import defaultSaga, { login, loginFake } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('LoginPage Sagas', () => {
  describe('login Saga', () => {
    let generator;
    beforeEach(() => {
      generator = login({ data: {} });
      const requestURL = 'http://localhost:4000/api/login';
      const callDescriptor = generator.next(axios.get, requestURL).value;
      expect(callDescriptor).toMatchSnapshot();
    });

    it('should dispatch the setToken & redirect if login is successfull', () => {
      const response = 'token';
      const putDescriptor = generator.next(response).value;
      expect(putDescriptor).toEqual(put(setToken(response)));
      const nextRoute = '/people/map';
      const putDescriptor2 = generator.next(nextRoute).value;
      expect(putDescriptor2).toEqual(put(push(nextRoute)));
    });

    it('should call the setError action if the response errors - generic', () => {
      const response = 'Some error';
      const putDescriptor = generator.throw(response).value;
      expect(putDescriptor).toEqual(
        put(setError('Something went wrong. Try again later')),
      );
    });

    it('should call the setError action if the response errors - Error with message', () => {
      const response = {
        response: { data: { message: 'not enough tickets' } },
      };
      const putDescriptor = generator.throw(response).value;
      expect(putDescriptor).toEqual(put(setError('not enough tickets')));
    });
  });

  describe('loginFake Saga', () => {
    it('should dispatch the setTickets action if it requests the data successfully', () => {
      const generator = loginFake({ username: 'admin', password: 'admin' });
      const callDescriptor = generator.next({}).value;
      expect(callDescriptor).toEqual(put(setToken('testToken')));
      const callDescriptor2 = generator.next('/people/map').value;
      expect(callDescriptor2).toEqual(put(push('/people/map')));
    });

    it('should call the setError action if the response errors - generic', () => {
      const response = 'Some error';
      const generator = loginFake({ username: 'wrong', password: 'creds' });
      generator.next();
      const putDescriptor = generator.throw(response).value;
      expect(putDescriptor).toEqual(
        put(setError('Something went wrong. Try again later')),
      );
    });

    it('should call the setError action if the response errors - Error with message', () => {
      const response = {
        response: { data: { message: 'not enough tickets' } },
      };
      const generator = loginFake({ data: {} });
      generator.next();
      const putDescriptor = generator.throw(response).value;
      expect(putDescriptor).toEqual(
        put(setError(response.response.data.message)),
      );
    });
  });

  describe('defaultSaga Saga', () => {
    const watchLoginPageSaga = defaultSaga();
    it('should start task to watch for LOGIN action', () => {
      const takeLatestDescriptor = watchLoginPageSaga.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(LOGIN, loginFake));
    });
  });
});
