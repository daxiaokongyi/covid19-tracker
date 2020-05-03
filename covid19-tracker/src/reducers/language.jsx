import { SWITCH_LANGUAGE } from '../actions/types';

const initialState = {
  lang: 'en',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SWITCH_LANGUAGE: {
      return {
        ...state,
        lang: payload,
      };
    }
    default:
      return state;
  }
}
