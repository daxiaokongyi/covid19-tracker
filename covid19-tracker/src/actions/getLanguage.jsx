import { SWITCH_LANGUAGE } from './types';

const getLanguage = (language) => (dispatch) => {
  try {
    console.log(language);
    dispatch({
      type: SWITCH_LANGUAGE,
      payload: language,
    });
  } catch (err) {
    console.log(err);
  }
};

export default getLanguage;
