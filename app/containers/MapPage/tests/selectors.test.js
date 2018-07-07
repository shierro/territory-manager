import { fromJS, List } from 'immutable';

import {
  selectMapPage,
  makeSelectInitialLocation,
  makeSelectInitialLocationLoaded,
  makeSelectZoom,
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
});
