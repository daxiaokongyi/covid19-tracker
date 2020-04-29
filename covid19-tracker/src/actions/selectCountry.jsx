import { SELECT_COUNTRY } from './types';

const selectCountry = (country) => (dispatch) => {
  try {
    dispatch({
      type: SELECT_COUNTRY,
      payload: country,
    });
  } catch (err) {
    console.log(err);
  }
};

export default selectCountry;
