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
  makeSelectPeople,
  makeSelectDefaultAgeRange,
  makeSelectPersonLabels,
  makeSelectAddingVisit,
} from '../selectors';

describe('selectMapPage', () => {
  it('should select the selectMapPage state', () => {
    const mapPageState = fromJS({ tickets: [] });
    const mockedState = fromJS({ mapPage: mapPageState });
    expect(selectMapPage(mockedState)).toEqual(mapPageState);
  });

  it('should select the initialLocation state', () => {
    const initialLocationSelector = makeSelectInitialLocation();
    const initialLocation = List([5, 5]);
    const mapState = fromJS({ mapPage: { initialLocation } });
    expect(initialLocationSelector(mapState)).toEqual([5, 5]);
  });

  it('should select the initialLocationLoaded state', () => {
    const initLocLoadedSelector = makeSelectInitialLocationLoaded();
    const initialLocationLoaded = true;
    const mapState2 = fromJS({ mapPage: { initialLocationLoaded } });
    expect(initLocLoadedSelector(mapState2)).toEqual(initialLocationLoaded);
  });

  it('should select the zoom state', () => {
    const zoomSelector = makeSelectZoom();
    const zoom = 16;
    const mapState3 = fromJS({ mapPage: { zoom } });
    expect(zoomSelector(mapState3)).toEqual(zoom);
  });

  it('should select the addingPerson state', () => {
    const addingPersonSelector = makeSelectAddingPerson();
    const addingPerson = true;
    const mapState4 = fromJS({ mapPage: { addingPerson } });
    expect(addingPersonSelector(mapState4)).toEqual(addingPerson);
  });

  it('should select the loading state', () => {
    const loadingSelector = makeSelectLoading();
    const loading = true;
    const mapState5 = fromJS({ mapPage: { loading } });
    expect(loadingSelector(mapState5)).toEqual(loading);
  });

  it('should select the steps state', () => {
    const stepsSelector = makeSelectSteps();
    const steps = ['step1', 'step2'];
    const mapState6 = fromJS({ mapPage: { steps } });
    expect(stepsSelector(mapState6)).toEqual(steps);
  });

  it('should select the newPerson state', () => {
    const newPersonSelector = makeSelectNewPerson();
    const newPerson = { firstName: 'test' };
    const mapState7 = fromJS({ mapPage: { newPerson } });
    expect(newPersonSelector(mapState7)).toEqual(newPerson);
  });

  it('should select the completed state', () => {
    const completedSelector = makeSelectCompleted();
    const completed = { 1: true };
    const mapState8 = fromJS({ mapPage: { completed } });
    expect(completedSelector(mapState8)).toEqual(completed);
  });

  it('should select the activeStep state', () => {
    const activeStepSelector = makeSelectActiveStep();
    const activeStep = 1;
    const mapState9 = fromJS({ mapPage: { activeStep } });
    expect(activeStepSelector(mapState9)).toEqual(activeStep);
  });

  it('should select the people state', () => {
    const peopleSelector = makeSelectPeople();
    const people = { firstName: 'test' };
    const mapState10 = fromJS({ mapPage: { people } });
    expect(peopleSelector(mapState10)).toEqual(people);
  });

  it('should select the defaultAgeRange state', () => {
    const selector = makeSelectDefaultAgeRange();
    const defaultAgeRange = { min: 1, max: 5 };
    const mapState11 = fromJS({ mapPage: { defaultAgeRange } });
    expect(selector(mapState11)).toEqual(defaultAgeRange);
  });
  it('should select the personLabels state', () => {
    const personLabelsSelector = makeSelectPersonLabels();
    const personLabels = { test: 'test' };
    const mapState12 = fromJS({ mapPage: { personLabels } });
    expect(personLabelsSelector(mapState12)).toEqual(personLabels);
  });
  it('should select addingVisit state correctly', () => {
    const addingVisitSelector = makeSelectAddingVisit();
    const addingVisit = true;
    const mapState13 = fromJS({ mapPage: { addingVisit } });
    expect(addingVisitSelector(mapState13)).toEqual(addingVisit);
  });
});
