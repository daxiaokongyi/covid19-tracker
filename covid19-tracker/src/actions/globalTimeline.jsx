import { GLOBAL_TIMELINE } from './types';
import axios from 'axios';
import { urlDailyGlobal } from '../apis/config';

const globalTimeline = () => async (dispatch) => {
  try {
    const { data } = await axios.get(urlDailyGlobal);

    // console.log(data);

    const customizedGlobalTimeline = data.map(
      ({ confirmed, deaths, reportDate }) => ({
        confirmed: confirmed.total,
        deaths: deaths.total,
        reportDate: reportDate,
      })
    );

    // console.log(customizedGlobalTimeline);

    dispatch({
      type: GLOBAL_TIMELINE,
      payload: customizedGlobalTimeline,
    });
  } catch (err) {
    console.log(err);
  }
};

export default globalTimeline;
