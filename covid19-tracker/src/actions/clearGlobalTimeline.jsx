import { CLEAR_GLOBALTIMELINE } from './types';

const clearGlobalTimeline = () => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_GLOBALTIMELINE,
      payload: [],
    });
  } catch (err) {
    console.log(err);
  }
};

export default clearGlobalTimeline;
