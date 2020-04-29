import { GLOBAL_CUMULATIVE } from '../actions/types';

const initialState = {
  confirmed: '',
  recovered: '',
  deaths: '',
  newConfirmed: '',
  newDeaths: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  //   console.log(payload);
  //   console.log(state);
  switch (type) {
    case GLOBAL_CUMULATIVE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
