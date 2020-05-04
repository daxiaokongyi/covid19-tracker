import { GET_STATES } from './types';
import { urlStates } from '../apis/config';
import axios from 'axios';

const getStates = () => async (dispatch) => {
  try {
    const { data } = await axios.get(urlStates);
    // console.log(data);

    const customizedGetStates = data.map(
      ({ state, totalTestResults, positive, negtive, recovered, death }) => ({
        state,
        totalTestResults,
        positive,
        negtive,
        recovered,
        death,
      })
    );

    // console.log(customizedGetStates);

    dispatch({ type: GET_STATES, payload: customizedGetStates });
  } catch (err) {
    console.log(err);
  }
};

export default getStates;
