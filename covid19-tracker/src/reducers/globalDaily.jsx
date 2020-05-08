import { GLOBAL_TIMELINE } from '../actions/types';
import { CLEAR_GLOBALTIMELINE } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GLOBAL_TIMELINE:
      return [...state, ...payload];
    case CLEAR_GLOBALTIMELINE:
      return [];
    default:
      return state;
  }
}
