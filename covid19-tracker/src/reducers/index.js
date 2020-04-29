import { combineReducers } from 'redux';
import globalData from './globalData';
import countryData from './countryData';

export default combineReducers({
  globalData,
  countryData,
});
