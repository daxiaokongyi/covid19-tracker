import { combineReducers } from 'redux';
import globalData from './globalData';
import countryData from './countryData';
import globalDaily from './globalDaily';

export default combineReducers({
  globalData,
  countryData,
  globalDaily,
});
