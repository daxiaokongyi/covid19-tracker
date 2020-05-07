import { CHOOSE_STATE } from '../actions/types';

const initialState = {
  state: 'CA',
  customizedStateDaily: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHOOSE_STATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
