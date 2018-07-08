import React from 'react';
import { shallow } from 'enzyme';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  loading: false,
  zoom: 5,
  setInitialLocation: () => true,
  classes: {},
};

describe('<MapPage />', () => {
  it('should render error component if geolocation is not supported', () => {
    const renderedComponent = shallow(<MapPage {...pageProps} />);
    expect(renderedComponent.html()).toEqual(
      '<p>Geolocation is not supported by your browser.. Please download the latest <a href="https://www.google.com/chrome/" target="_blank">Chrome</a></p>',
    );
  });
  it('should render page successfully', () => {
    navigator.geolocation = true;
    const renderedComponent = shallow(<MapPage {...pageProps} />);
    expect(renderedComponent.contains('You are here!')).toEqual(true);
  });

  it('should render page with loading indicator', () => {
    pageProps.loading = true;
    navigator.geolocation = true;
    const renderedComponent = shallow(<MapPage {...pageProps} />);
    expect(renderedComponent.contains(<LinearProgress />)).toEqual(true);
  });
});
