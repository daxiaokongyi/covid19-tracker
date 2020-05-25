import { CLEAR_PROVINCE } from './types';

const clearProvince = () => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PROVINCE,
      payload: [],
    });
  } catch (err) {
    console.log(err);
  }
};

export default clearProvince;
