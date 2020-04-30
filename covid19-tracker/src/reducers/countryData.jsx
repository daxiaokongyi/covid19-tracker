import { COUNTRY_CUMULATIVE } from '../actions/types';
import { GET_POPULATION } from '../actions/types';

const initialState = {
  confirmed: '',
  recovered: '',
  deaths: '',
  newConfirmed: '',
  newDeaths: '',
  dangerRank: '',
  countries: [],
  country: 'US',
  population: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COUNTRY_CUMULATIVE:
      return {
        ...state,
        ...payload,
      };
    case GET_POPULATION:
      return { ...state, population: payload };
    default:
      return state;
  }
}
