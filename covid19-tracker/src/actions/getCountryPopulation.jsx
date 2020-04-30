import axios from 'axios';
import { urlPopulation } from '../apis/config';
import { GET_POPULATION } from './types';

const getCountryPopulation = () => async (dispatch) => {
  try {
    console.log('test');
    const data = await axios.get(urlPopulation);
    console.log(data);

    dispatch({ type: GET_POPULATION, payload: 'test' });
  } catch (err) {
    console.log(err);
  }
};

export default getCountryPopulation;
