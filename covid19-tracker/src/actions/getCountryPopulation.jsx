import axios from 'axios';
import { urlPopulation } from '../apis/config';
import { GET_POPULATION } from './types';

const getCountryPopulation = (country) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.get(urlPopulation);

    // console.log(data);

    const customizedPopulation = data.map(
      ({ countrycode, countrylabel, population }) => ({
        countrycode,
        countrylabel,
        population,
      })
    );

    // console.log(customizedPopuation);
    // console.log(country);
    const countrySelected = customizedPopulation.filter(
      (customizedPopulation) => customizedPopulation.countrycode === country
    );

    // console.log(countrySelected[0].population);

    dispatch({
      type: GET_POPULATION,
      payload: countrySelected[0].population,
    });
  } catch (err) {
    console.log(err);
  }
};

export default getCountryPopulation;
