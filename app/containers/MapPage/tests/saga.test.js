import { put, takeLatest } from 'redux-saga/effects';
import {
  SET_INITIAL_LOCATION,
  GET_INITIAL_LOCATION,
  SET_PAGE_ERROR,
  SET_LOADING,
  ADD_PERSON_START,
} from '../constants';

// import { setInitialLocation } from './actions';

import watchMapsPageSagas, { setInitLocation, getLocation } from '../saga';

describe('MapPage Sagas', () => {
  describe('setInitialLocation Saga', () => {
    let generator;
    beforeEach(() => {
      generator = setInitLocation();
      const callDescriptor = generator.next(getLocation).value;
      expect(callDescriptor).toMatchSnapshot();
    });

    it('should dispatch the setTickets action if it requests the data successfully', () => {
      const response = {
        latitude: 5,
        longitude: 5,
      };
      const putDescriptor = generator.next(response).value;
      expect(putDescriptor).toEqual(
        put({
          type: SET_INITIAL_LOCATION,
          coords: [response.latitude, response.longitude],
        }),
      );
    });

    it('should set error action if there is something wrong', () => {
      const error = 'Some error';
      const putDescriptor = generator.throw(error).value;
      expect(putDescriptor).toEqual(put({ type: SET_PAGE_ERROR, error }));
      expect(generator.next().value).toEqual(
        put({ type: SET_LOADING, value: false }),
      );
    });
  });

  describe('watchMapsPageSagas Saga', () => {
    const sagas = watchMapsPageSagas();
    it('should start task to watch ALL actions', () => {
      const takeLatestDescriptor = sagas.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(GET_INITIAL_LOCATION, setInitLocation),
      );
      const takeLatestDescriptorSecond = sagas.next().value;
      expect(takeLatestDescriptorSecond).toEqual(
        takeLatest(ADD_PERSON_START, setInitLocation),
      );
    });
  });
});
