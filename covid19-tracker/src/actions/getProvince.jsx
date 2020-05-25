import { urlProvince } from '../apis/config';
import axios from 'axios';
import { GET_PROVINCE } from '../actions/types';

const getProvince = () => async (dispatch) => {
  try {
    // console.log('hello');
    const {
      data: { data },
    } = await axios.get(urlProvince);
    // console.log(data);

    const result = data.filter((each) => each.region.name === 'US');
    // console.log(result);

    const customizedProvince = result.map((each) => ({
      province: each.region.province,
      cityInProvince: each.region.cities,
      onfirmedProvince: each.confirmed,
      deathsProvince: each.deaths,
      recoveredProvince: each.recovered,
      newConfirmedProvince: each.confirmed_diff,
      newDeathsProvince: each.deaths_diff,
      newRecoveredProvince: each.recovered_diff,
      fatalityRateProvince: each.fatality_rate,
    }));

    // console.log(customizedProvince);

    dispatch({
      type: GET_PROVINCE,
      payload: customizedProvince,
    });
  } catch (err) {
    console.log(err);
  }
};

export default getProvince;
