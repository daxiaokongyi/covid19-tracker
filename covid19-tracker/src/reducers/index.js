import { combineReducers } from 'redux';
import globalData from './globalData';
import countryData from './countryData';
import globalDaily from './globalDaily';
import countryDaily from './countryDaily';
import language from './language';

export default combineReducers({
  globalData,
  countryData,
  globalDaily,
  countryDaily,
  language,
});
