import { COUNTRY_TIMELINE } from './types';
import axios from 'axios';
import { urlDailyCountry } from '../apis/config';

const countryTimeline = () => async (dispatch) => {
  try {
    const { data } = await axios.get(urlDailyCountry);

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
      type: COUNTRY_TIMELINE,
      payload: customizedGlobalTimeline,
    });
  } catch (err) {
    console.log(err);
  }
};

export default globalTimeline;
