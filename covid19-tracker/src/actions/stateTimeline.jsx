import { CHOOSE_STATE } from './types';
import { urlStateTimeline } from '../apis/config';
import axios from 'axios';

const stateTimeline = (state) => async (dispatch) => {
  try {
    // console.log(state);

    const { data } = await axios.get(urlStateTimeline);
    //   console.log(data);

    // console.log(state);
    const dataForCertainState = data.filter(
      (eachData) => eachData.state === state
    );

    // console.log(dataForCertainState);

    const customizedStateDaily = dataForCertainState.map(
      ({ date, state, positiveIncrease }) => ({
        date,
        state,
        positiveIncrease,
      })
    );

    // console.log(customizedStateDaily);

    dispatch({ type: CHOOSE_STATE, payload: { state, customizedStateDaily } });
  } catch (err) {
    console.log(err);
  }
};

export default stateTimeline;
