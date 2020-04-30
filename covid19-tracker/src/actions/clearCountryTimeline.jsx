import { CLEAR_COUNTRYTIMELINE } from './types';

const clearCountryTimeline = () => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_COUNTRYTIMELINE,
      payload: [],
    });
  } catch (err) {
    console.log(err);
  }
};

export default clearCountryTimeline;
