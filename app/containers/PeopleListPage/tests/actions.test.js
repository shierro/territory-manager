/* eslint-disable import/no-named-as-default-member */
import { pageActions } from '../actions';
import * as constants from '../constants';
import actionsTester from '../../../utils/actionsTester';

const pplListConstants = Object.keys(constants).map(idx => constants[idx]);
const peopleListActions = pageActions(result => result);

describe('PeopleListPage actions', () =>
  actionsTester(peopleListActions, pplListConstants));
