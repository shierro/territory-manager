import { fromJS, Map, List } from 'immutable';
import { INCREMENT_PLACEMENT } from './constants';

export const initialState = {
  title: 'Placements',
  placements: Map({
    publications: List([]),
    videos: List([]),
  }),
  grouping: 'weekly',
};

// function randomDate(start, end) {
//   return new Date(
//     start.getTime() + Math.random(999) * (end.getTime() - start.getTime()),
//   );
// }

function placementsPageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    case INCREMENT_PLACEMENT: {
      // const date = randomDate(new Date(2018, 8, 24), new Date(2018, 8, 30));
      return state.updateIn(
        ['placements', action.placement],
        // type => type.push({ date }),
        type => type.push({ date: new Date() }),
      );
    }
    default:
      return state;
  }
}

export default placementsPageReducer;
