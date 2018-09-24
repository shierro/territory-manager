import { fromJS } from 'immutable';
import {
  makeSelectTitle,
  placementsPage,
  makeSelectGrouping,
} from '../selectors';

describe('PlacementsPageDomain', () => {
  it('should select the whole pageDetailsPage state', () => {
    const pageState = fromJS({ title: 'testTitle' });
    const mockedState = fromJS({ placementsPage: pageState });
    expect(placementsPage(mockedState)).toEqual(pageState);
  });

  it('should select placements correctly', () => {
    const titleSelector = makeSelectTitle();
    const title = 'my test title';
    const pageState = fromJS({ placementsPage: { title } });
    expect(titleSelector(pageState)).toEqual(title);
  });
  it('should select grouping correctly', () => {
    const visitsTitleSelector = makeSelectGrouping();
    const grouping = 'weekly';
    const pageState = fromJS({ placementsPage: { grouping } });
    expect(visitsTitleSelector(pageState)).toEqual(grouping);
  });
});
