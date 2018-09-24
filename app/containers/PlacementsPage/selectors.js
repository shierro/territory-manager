import { createSelector } from 'reselect';
import moment from 'moment';
import { groupBy } from '../../utils/dateUtils';

const DATE_FORMAT = 'YYYY-MM-DD';
const now = moment().clone();
const today = now.format(DATE_FORMAT);

const getFilter = grouping => {
  let before = `${today} 00:00:00`;
  let after = `${today} 23:59:59`;
  if (grouping === 'weekly') {
    const startOfWeek = now.startOf('isoWeek');
    before = `${startOfWeek.format(DATE_FORMAT)} 00:00:00`;
    after = `${startOfWeek.add(6, 'days').format(DATE_FORMAT)} 23:59:59`;
  }
  return item => moment(item.date).isBetween(before, after);
};

export const placementsPage = state => state.get('placementsPage');

export const makeSelectTitle = () =>
  createSelector(placementsPage, state => state.get('title'));
export const makeSelectPlacements = () =>
  createSelector(placementsPage, state => state.get('placements').toJS());
export const makeSelectGrouping = () =>
  createSelector(placementsPage, state => state.get('grouping'));

export const makeSelectGroupedPlacements = () =>
  createSelector(placementsPage, state => {
    const grouping = state.get('grouping');
    const placements = state.get('placements').toJS();
    const filter = getFilter(grouping);
    const videos = placements.videos.filter(filter);
    const publications = placements.publications.filter(filter);
    const grpedVds = groupBy(grouping, videos);
    const grpedPcs = groupBy(grouping, publications);
    return {
      videos: {
        values: Object.keys(grpedVds).map(key => grpedVds[key].length),
        total: videos.length,
      },
      publications: {
        values: Object.keys(grpedPcs).map(key => grpedPcs[key].length),
        total: publications.length,
      },
    };
  });

export const allSelectors = {
  title: makeSelectTitle(),
  placements: makeSelectGroupedPlacements(),
  grouping: makeSelectGrouping(),
};
