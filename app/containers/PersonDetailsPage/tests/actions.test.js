/* eslint-disable import/no-named-as-default-member */
import { pageActions } from '../actions';
import * as constants from '../../App/constants';
import * as constants2 from '../../MapPage/constants';
import actionsTester from '../../../utils/actionsTester';

const mergedConstants = { ...constants, ...constants2 };

const pplListConstants = Object.keys(mergedConstants).map(
  idx => mergedConstants[idx],
);
const PersonDetailsActions = pageActions(result => result);

describe('PersonDetailsPage actions', () =>
  actionsTester(PersonDetailsActions, pplListConstants));
