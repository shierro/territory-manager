import { fromJS } from 'immutable';

export const initialState = {};

function PeopleListPageReducer(state = fromJS(initialState), action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default PeopleListPageReducer;
