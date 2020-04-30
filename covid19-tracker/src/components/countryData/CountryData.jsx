import React, { useEffect } from 'react';
import styles from './CountryData.module.css';
import countryCumulative from '../../actions/countryCumulative';
import countryTimeline from '../../actions/countryTimeline';
import clearCountryTimeline from '../../actions/clearCountryTimeline';
import getCountryPopulation from '../../actions/getCountryPopulation';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import Spinner from '../spinner/Spinner';

const CountryData = ({
  countryData: {
    confirmed,
    recovered,
    deaths,
    newConfirmed,
    newDeaths,
    dangerRank,
    countries,
    country,
    population,
  },
  countryCumulative,
  countryTimeline,
  clearCountryTimeline,
  getCountryPopulation,
}) => {
  useEffect(() => {
    const getCountryData = async () => {
      countryCumulative(country);
      getCountryPopulation(country);
    };
    getCountryData();
  }, [countryCumulative, getCountryPopulation, country]);

  const onHandleChange = (e) => {
    // console.log(e.target.value.split(','));
    // console.log(e.target.value.split(',')[1]);
    getCountryPopulation(e.target.value.split(',')[0]);
    // console.log()
    countryCumulative(e.target.value.split(',')[0]);
    clearCountryTimeline();
    countryTimeline(e.target.value.split(',')[1]);
  };

  return !confirmed ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.countryRank}>
        <div>
          {' '}
          Select Country:{''}
          <select onChange={(e) => onHandleChange(e)}>
            <option value='us'>US</option>
            {countries.map(({ name, iso2 }, i) => (
              <option value={[iso2, name]} key={i}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          population:{' '}
          {population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </div>
        <div>
          <img
            src={`https://www.countryflags.io/${country}/shiny/64.png`}
            alt='flag-img'
          />
        </div>
        <div>Danger Rank: {dangerRank}</div>
      </div>
      <div className={styles.allBoxes}>
        <div className={[styles.box, styles.confirmed].join(' ')}>
          <h4>Confirmed</h4>
          <h2>
            {' '}
            <CountUp
              start={0}
              end={confirmed}
              duration={2.5}
              separator={', '}
            />
          </h2>
          <h4>Confirmed per 10000 people </h4>
          <h2>{((confirmed / population) * 10000).toFixed(0)}</h2>
          <h4>New cases</h4>
          <h2>
            {' '}
            <CountUp
              start={0}
              end={newConfirmed}
              duration={2.5}
              separator={', '}
            />
          </h2>
          <h4>New Cases rate </h4>
          <h2>{`${((newConfirmed / confirmed) * 100).toFixed(2)}%`}</h2>
        </div>
        <div className={[styles.box, styles.recovered].join(' ')}>
          <h4>Recovered</h4>
          <h2>
            {' '}
            <CountUp
              start={0}
              end={recovered}
              duration={2.5}
              separator={', '}
            />
          </h2>
          <h4>Recovered per 10000 people </h4>
          <h2>{((recovered / population) * 10000).toFixed(0)}</h2>
        </div>
        <div className={[styles.box, styles.deaths].join(' ')}>
          <h4>Deaths</h4>
          <h2>
            {' '}
            <CountUp start={0} end={deaths} duration={2.5} separator={', '} />
          </h2>
          <h4>Deaths per 10000 people </h4>
          <h2>{((deaths / population) * 10000).toFixed(0)}</h2>
          <h4>New cases</h4>
          <h2>
            {' '}
            <CountUp
              start={0}
              end={newDeaths}
              duration={2.5}
              separator={', '}
            />
          </h2>
          <h4>new cases rate</h4>
          <h2>{`${((newDeaths / deaths) * 100).toFixed(2)}%`}</h2>
        </div>
      </div>
    </div>
  );
};

CountryData.propTypes = {
  countryCumulative: PropTypes.func.isRequired,
  selectCountry: PropTypes.func.isRequired,
  clearCountryTimeline: PropTypes.func.isRequired,
  getCountryPopulation: PropTypes.func.isRequired,
  CountryData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  countryData: state.countryData,
});

export default connect(mapStateToProps, {
  countryCumulative,
  countryTimeline,
  clearCountryTimeline,
  getCountryPopulation,
})(CountryData);
