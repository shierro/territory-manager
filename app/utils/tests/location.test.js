import { getLocation } from '../location';

describe('utils/location.js', () => {
  it('should be able to get location successfully', () => {
    const mockData = { coords: { lat: 1, long: 1 } };
    navigator.geolocation = {
      getCurrentPosition: cbSuccess => {
        cbSuccess(mockData);
      },
    };
    getLocation().then(coords => {
      expect(coords).toEqual(mockData.coords);
    });
  });

  it('should be throw error gracefully', () => {
    navigator.geolocation = {
      getCurrentPosition: (cbSuccess, cbError) => cbError(),
    };
    getLocation().catch(err => {
      expect(err).toEqual(new Error('Sorry, no position available.'));
    });
  });
});
