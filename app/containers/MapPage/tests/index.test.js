import React from 'react';
import { shallow } from 'enzyme';

import { MapPage } from '../index';
// import { changeUsername } from '../actions';
// import { loadRepos } from '../../App/actions';

const pageProps = {
  coords: {
    latitude: 5,
    longitude: 5,
  },
  initialLocationLoaded: true,
  initialLocation: [5, 5],
  zoom: 5,
  setInitialLocation: () => true,
};

describe('<MapPage />', () => {
  it('should render page successfully', () => {
    const renderedComponent = shallow(<MapPage {...pageProps} />);
    expect(renderedComponent.contains('You are here!')).toEqual(true);
  });

  it('should render page with loading screen', () => {
    pageProps.initialLocationLoaded = false;
    const renderedComponent = shallow(<MapPage {...pageProps} />);
    expect(renderedComponent.contains('waiting for location data...')).toEqual(
      true,
    );
  });
});
