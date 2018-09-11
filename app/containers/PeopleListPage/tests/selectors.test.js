import { fromJS } from 'immutable';
const {
  allSelectors: { order, orderBy, page, rowsPerPage, data },
  peopleListPage,
  mapPage,
} = require('../selectors');

describe('src/containers/PeoplePage/selectors.js', () => {
  it('should select the peopleListPage state', () => {
    const pageState = fromJS({ order: 'date' });
    const mockedState = fromJS({ peopleListPage: pageState });
    expect(peopleListPage(mockedState)).toEqual(pageState);
  });
  it('should select the mapPage state', () => {
    const mapPageState = fromJS({ people: [] });
    const mockedState = fromJS({ mapPage: mapPageState });
    expect(mapPage(mockedState)).toEqual(mapPageState);
  });
  it('should select order state', () => {
    const mockedState2 = fromJS({ peopleListPage: { order: 'asc' } });
    expect(order(mockedState2)).toEqual('asc');
  });
  it('should select orderBy state', () => {
    const mockedState3 = fromJS({ peopleListPage: { orderBy: 'firstName' } });
    expect(orderBy(mockedState3)).toEqual('firstName');
  });
  it('should select page state', () => {
    const mockedState4 = fromJS({ peopleListPage: { page: 5 } });
    expect(page(mockedState4)).toEqual(5);
  });
  it('should select rowsPerPage state', () => {
    const mockedState5 = fromJS({ peopleListPage: { rowsPerPage: 5 } });
    expect(rowsPerPage(mockedState5)).toEqual(5);
  });
  it('should select data state', () => {
    const mockedState6 = fromJS({
      mapPage: { people: { 0: { firstName: 'fn' } } },
    });
    expect(data(mockedState6)).toEqual([{ firstName: 'fn' }]);
  });
});
