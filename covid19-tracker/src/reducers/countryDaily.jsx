import { COUNTRY_TIMELINE } from '../actions/types';
import { CLEAR_COUNTRYTIMELINE } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case COUNTRY_TIMELINE:
      return [...state, ...payload];
    case CLEAR_COUNTRYTIMELINE:
      return [];
    default:
      return state;
  }
}
