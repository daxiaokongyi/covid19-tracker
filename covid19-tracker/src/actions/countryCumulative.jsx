import { COUNTRY_CUMULATIVE } from './types';
import axios from 'axios';
import { urlCountry, urlForSelection } from '../apis/config';

const countryCumulative = (country) => async (dispatch) => {
  try {
    // console.log(country);
    const {
      data: { countrydata },
    } = await axios.get(`${urlCountry}=${country}`);
    // console.log(countrydata[0]);

    const resultCountryData = countrydata[0];

    // get countries only
    const {
      data: { countries },
    } = await axios(urlForSelection);
    // console.log(countries);

    const customizedCountryData = {
      confirmed: resultCountryData.total_cases,
      recovered: resultCountryData.total_recovered,
      deaths: resultCountryData.total_deaths,
      newConfirmed: resultCountryData.total_new_cases_today,
      newDeaths: resultCountryData.total_new_deaths_today,
      dangerRank: resultCountryData.total_danger_rank,
      countries,
      country,
    };

    // console.log(customizedCountryData);

    dispatch({
      type: COUNTRY_CUMULATIVE,
      payload: customizedCountryData,
    });
  } catch (err) {
    console.log(err);
  }
};

export default countryCumulative;
