import { fromJS, List } from 'immutable';

import {
  selectMapPage,
  makeSelectInitialLocation,
  makeSelectInitialLocationLoaded,
  makeSelectZoom,
  makeSelectLoading,
  makeSelectAddingPerson,
  makeSelectCompleted,
  makeSelectNewPerson,
  makeSelectSteps,
  makeSelectActiveStep,
  makeSelectPersons,
} from '../selectors';

describe('selectMapPage', () => {
  it('should select the selectMapPage state', () => {
    const mapPageState = fromJS({ tickets: [] });
    const mockedState = fromJS({ mapPage: mapPageState });
    expect(selectMapPage(mockedState)).toEqual(mapPageState);
  });

  it('should select the initialLocation state', () => {
    const ticketsSelector = makeSelectInitialLocation();
    const initialLocation = List([5, 5]);
    const mockedState = fromJS({ mapPage: { initialLocation } });
    expect(ticketsSelector(mockedState)).toEqual([5, 5]);
  });

  it('should select the initialLocationLoaded state', () => {
    const ticketsSelector = makeSelectInitialLocationLoaded();
    const initialLocationLoaded = true;
    const mockedState = fromJS({ mapPage: { initialLocationLoaded } });
    expect(ticketsSelector(mockedState)).toEqual(initialLocationLoaded);
  });

  it('should select the initialLocationLoaded state', () => {
    const ticketsSelector = makeSelectZoom();
    const zoom = 16;
    const mockedState = fromJS({ mapPage: { zoom } });
    expect(ticketsSelector(mockedState)).toEqual(zoom);
  });

  it('should select the addingPerson state', () => {
    const ticketsSelector = makeSelectAddingPerson();
    const addingPerson = true;
    const mockedState = fromJS({ mapPage: { addingPerson } });
    expect(ticketsSelector(mockedState)).toEqual(addingPerson);
  });

  it('should select the loading state', () => {
    const ticketsSelector = makeSelectLoading();
    const loading = true;
    const mockedState = fromJS({ mapPage: { loading } });
    expect(ticketsSelector(mockedState)).toEqual(loading);
  });

  it('should select the steps state', () => {
    const ticketsSelector = makeSelectSteps();
    const steps = ['step1', 'step2'];
    const mockedState = fromJS({ mapPage: { steps } });
    expect(ticketsSelector(mockedState)).toEqual(steps);
  });

  it('should select the newPerson state', () => {
    const ticketsSelector = makeSelectNewPerson();
    const newPerson = { firstName: 'test' };
    const mockedState = fromJS({ mapPage: { newPerson } });
    expect(ticketsSelector(mockedState)).toEqual(newPerson);
  });

  it('should select the completed state', () => {
    const ticketsSelector = makeSelectCompleted();
    const completed = { 1: true };
    const mockedState = fromJS({ mapPage: { completed } });
    expect(ticketsSelector(mockedState)).toEqual(completed);
  });

  it('should select the activeStep state', () => {
    const ticketsSelector = makeSelectActiveStep();
    const activeStep = 1;
    const mockedState = fromJS({ mapPage: { activeStep } });
    expect(ticketsSelector(mockedState)).toEqual(activeStep);
  });

  it('should select the persons state', () => {
    const ticketsSelector = makeSelectPersons();
    const persons = { firstName: 'test' };
    const mockedState = fromJS({ mapPage: { persons } });
    expect(ticketsSelector(mockedState)).toEqual(persons);
  });
});
