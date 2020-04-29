import { combineReducers } from 'redux';
import globalData from './globalData';
import countryData from './countryData';
import updateCountry from './updateCountry';

export default combineReducers({
  globalData,
  countryData,
  updateCountry,
});
