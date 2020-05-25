import { GET_PROVINCE } from '../actions/types';
import { CLEAR_PROVINCE } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROVINCE:
      return [...state, ...payload];
    case CLEAR_PROVINCE:
      return [];
    default:
      return state;
  }
}
