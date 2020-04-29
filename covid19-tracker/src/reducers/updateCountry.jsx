import { SELECT_COUNTRY } from '../actions/types';

const initialState = { country: 'US' };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_COUNTRY:
      return {
        ...state,
        country: payload,
      };
    default:
      return state;
  }
}
