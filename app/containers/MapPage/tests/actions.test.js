/* eslint-disable import/no-named-as-default-member */
import { mapPageActions } from '../actions';
import * as constants from '../constants';
import actionsTester from '../../../utils/actionsTester';

const mapConstants = Object.keys(constants).map(idx => constants[idx]);
const mapActions = mapPageActions(result => result);

describe('MapPage actions', () => actionsTester(mapActions, mapConstants));
