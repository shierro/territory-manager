/* eslint-disable import/no-named-as-default-member */
import { appActions } from '../actions';
import * as constants from '../constants';
import actionsTester from '../../../utils/actionsTester';

const appConstants = Object.keys(constants).map(idx => constants[idx]);
const appActs = appActions(result => result);

describe('MapPage actions', () => actionsTester(appActs, appConstants));
