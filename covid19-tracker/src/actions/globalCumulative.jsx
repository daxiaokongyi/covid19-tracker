import { GLOBAL_CUMULATIVE } from './types';
import { urlGlobal } from '../apis/config';
import axios from 'axios';

// const globalCumulative = () => async (dispatch) => {
//   try {
//     const { data } = await axios.get(urlGlobal);
//     // console.log(data);

//     const resultGlobalData = data.results[0];
//     // console.log(resultGlobalData);

//     const customizedGlobalData = {
//       confirmed: resultGlobalData.total_cases,
//       recovered: resultGlobalData.total_recovered,
//       deaths: resultGlobalData.total_deaths,
//       newConfirmed: resultGlobalData.total_new_cases_today,
//       newDeaths: resultGlobalData.total_new_deaths_today,
//     };

//     // console.log(customizedGlobalData);

//     dispatch({
//       type: GLOBAL_CUMULATIVE,
//       payload: customizedGlobalData,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

const globalCumulative = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get(urlGlobal);
    console.log(data);

    const customizedGlobalData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      newConfirmed: data.confirmed_diff,
      newRecovered: data.recovered_diff,
      newDeaths: data.deaths_diff,
    };

    console.log(customizedGlobalData);

    dispatch({
      type: GLOBAL_CUMULATIVE,
      payload: customizedGlobalData,
    });
  } catch (err) {
    console.log(err);
  }
};

export default globalCumulative;
