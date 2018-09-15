import { fromJS } from 'immutable';

export const initialState = {
  title: 'Person Details',
  visitsTitle: 'Visits',
};

function personDetailsPageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default personDetailsPageReducer;
