import { combineReducers } from 'redux';
import globalData from './globalData';
import countryData from './countryData';
import updateCOuntry from './updateCountry';

export default combineReducers({
  globalData,
  countryData,
  updateCOuntry,
});
