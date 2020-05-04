import { GET_STATES } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STATES:
      return [...state, ...payload];
    default:
      return state;
  }
}
