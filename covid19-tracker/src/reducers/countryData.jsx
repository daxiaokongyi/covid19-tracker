import { COUNTRY_CUMULATIVE } from '../actions/types';

const initialState = {
  confirmed: '',
  recovered: '',
  deaths: '',
  newConfirmed: '',
  newDeaths: '',
  dangerRank: '',
  countries: [],
  country: 'US',
  population: 100,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COUNTRY_CUMULATIVE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
