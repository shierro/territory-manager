/* eslint-disable import/no-named-as-default-member */
import { pageActions } from '../actions';
import * as constants from '../constants';
import actionsTester from '../../../utils/actionsTester';

const placementsConstants = Object.keys(constants).map(idx => constants[idx]);
const PlacementsPageActions = pageActions(result => result);

describe('PlacementsPage actions', () =>
  actionsTester(PlacementsPageActions, placementsConstants));
