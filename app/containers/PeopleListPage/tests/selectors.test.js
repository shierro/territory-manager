import { fromJS } from 'immutable';
const {
  allSelectors: { order, orderBy, page, rowsPerPage, data },
  mapPage,
} = require('../selectors');
const { selectApp } = require('../../App/selectors');

describe('src/containers/PeopleListPage/selectors.js', () => {
  it('should select the App state', () => {
    const pageState = fromJS({ order: 'date' });
    const mockedState = fromJS({ App: pageState });
    expect(selectApp(mockedState)).toEqual(pageState);
  });
  it('should select the mapPage state', () => {
    const mapPageState = fromJS({ people: [] });
    const mockedState = fromJS({ mapPage: mapPageState });
    expect(mapPage(mockedState)).toEqual(mapPageState);
  });
  it('should select order state', () => {
    const mockedState2 = fromJS({ App: { order: 'asc' } });
    expect(order(mockedState2)).toEqual('asc');
  });
  it('should select orderBy state', () => {
    const mockedState3 = fromJS({ App: { orderBy: 'firstName' } });
    expect(orderBy(mockedState3)).toEqual('firstName');
  });
  it('should select page state', () => {
    const mockedState4 = fromJS({ App: { page: 5 } });
    expect(page(mockedState4)).toEqual(5);
  });
  it('should select rowsPerPage state', () => {
    const mockedState5 = fromJS({ App: { rowsPerPage: 5 } });
    expect(rowsPerPage(mockedState5)).toEqual(5);
  });
  it('should select data state', () => {
    const mockedState6 = fromJS({
      mapPage: { people: { 0: { firstName: 'fn' } } },
    });
    expect(data(mockedState6)).toEqual({ 0: { firstName: 'fn' } });
  });
});
