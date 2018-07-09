import React from 'react';
import { shallow } from 'enzyme';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MapPage } from '../index';
const pageProps = {
  coords: {
    latitude: 5,
    longitude: 5,
  },
  initialLocationLoaded: false,
  initialLocation: [5, 5],
  loading: false,
  zoom: 5,
  classes: {},
  steps: ['Info', 'Address & Notes', 'Map Location'],
  completed: { 1: true, 0: true },
  newPerson: {},
  activeStep: 0,
  addingPerson: false,
  persons: { 1: { location: [1, 1] } },
  setInitialLocation: () => true,
  addPersonStart: () => true,
  savePersonData: () => true,
  handleFormChange: () => true,
  goNextStep: () => true,
  handleNewPersonPositionChange: () => true,
};

describe('<MapPage />', () => {
  it('should render error component if geolocation is not supported', () => {
    const renderedComponent = shallow(<MapPage {...pageProps} />);
    expect(renderedComponent.html()).toEqual(
      '<p>Geolocation is not supported by your browser.. Please download the latest <a href="https://www.google.com/chrome/" target="_blank">Chrome</a></p>',
    );
  });
  it('should render page on step 3(mapping person)', () => {
    navigator.geolocation = true;
    pageProps.addingPerson = true;
    pageProps.activeStep = 2;
    pageProps.initialLocationLoaded = true;
    const renderedComponent = shallow(<MapPage {...pageProps} />);
    expect(renderedComponent.contains('You are here!')).toEqual(true);
  });

  it('should render page with loading indicator', () => {
    pageProps.loading = true;
    pageProps.addingPerson = true;
    pageProps.activeStep = 1;
    navigator.geolocation = true;
    const renderedComponent = shallow(<MapPage {...pageProps} />);
    expect(renderedComponent.contains(<LinearProgress />)).toEqual(true);
  });
});
