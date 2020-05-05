import { COUNTRY_TIMELINE } from './types';
import axios from 'axios';
import { urlDailyCountry } from '../apis/config';

const countryTimeline = (country) => async (dispatch) => {
  try {
    const { data } = await axios.get(urlDailyCountry);

    // console.log(data[country]);
    country = !country ? 'US' : country;

    if (country === 'Korea') {
      country = 'Korea, South';
    }

    const customizedCountryTimeline = data[country].map(
      ({ confirmed, recovered, deaths, date }) => ({
        confirmed,
        recovered,
        deaths,
        date,
      })
    );

    // console.log(customizedCountryTimeline);

    dispatch({
      type: COUNTRY_TIMELINE,
      payload: customizedCountryTimeline,
    });
  } catch (err) {
    console.log(err);
  }
};

export default countryTimeline;
