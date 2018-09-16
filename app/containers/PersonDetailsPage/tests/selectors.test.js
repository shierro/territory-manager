import { fromJS } from 'immutable';
import {
  makeSelectTitle,
  personDetailsPage,
  makeSelectVisitsTitle,
} from '../selectors';

describe('selectPersonDetailsPageDomain', () => {
  it('should select the whole pageDetailsPage state', () => {
    const pageState = fromJS({ title: 'testTitle' });
    const mockedState = fromJS({ personDetailsPage: pageState });
    expect(personDetailsPage(mockedState)).toEqual(pageState);
  });

  it('should select title correctly', () => {
    const titleSelector = makeSelectTitle();
    const title = 'my test title';
    const pageState = fromJS({ personDetailsPage: { title } });
    expect(titleSelector(pageState)).toEqual(title);
  });
  it('should select title correctly', () => {
    const visitsTitleSelector = makeSelectVisitsTitle();
    const visitsTitle = 'my visits';
    const pageState = fromJS({ personDetailsPage: { visitsTitle } });
    expect(visitsTitleSelector(pageState)).toEqual(visitsTitle);
  });
});
