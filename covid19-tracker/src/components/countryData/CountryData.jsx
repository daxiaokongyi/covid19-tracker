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
      <div className={styles.countryInfo}>
        <div className={styles.select}>
          {' '}
          Select Country:{' '}
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
          Current Population:{' '}
          {population
            ? population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            : `loading ...`}
        </div>
        <div>
          <img
            src={`https://www.countryflags.io/${country}/shiny/64.png`}
            alt='flag-img'
          />
        </div>
        <div>Risk Ranking: {dangerRank}</div>
      </div>
      <div className={styles.allBoxes}>
        <div className={[styles.box, styles.confirmed].join(' ')}>
          <div className={styles.cumulative}>
            <p>Confirmed</p>
            <h4>
              {' '}
              <CountUp
                start={0}
                end={confirmed}
                duration={2.5}
                separator={', '}
              />
            </h4>
            <span>
              About {((confirmed / population) * 10000).toFixed(0)} per 10, 000
              people
            </span>
          </div>
          <div className={styles.newCases}>
            <p>New Cases Today</p>
            <h4>
              {' '}
              <CountUp
                start={0}
                end={newConfirmed}
                duration={2.5}
                separator={', '}
              />
            </h4>
            <p>New Cases Rate </p>
            <h4>{`${((newConfirmed / (confirmed - newConfirmed)) * 100).toFixed(
              2
            )}%`}</h4>
          </div>
        </div>
        <div className={[styles.box, styles.recovered].join(' ')}>
          <p>Recovered</p>
          <h4>
            {' '}
            <CountUp
              start={0}
              end={recovered}
              duration={2.5}
              separator={', '}
            />
          </h4>
          <span>
            About {((recovered / population) * 10000).toFixed(0)} per 10, 000
            people
          </span>
        </div>
        <div className={[styles.box, styles.deaths].join(' ')}>
          <div className={styles.cumulative}>
            <p>Deaths</p>
            <h4>
              {' '}
              <CountUp start={0} end={deaths} duration={2.5} separator={', '} />
            </h4>
            <span>
              About {((deaths / population) * 10000).toFixed(0)} per 10, 000
              people
            </span>
          </div>
          <div className={styles.newCases}>
            <p>New Cases Today</p>
            <h4>
              {' '}
              <CountUp
                start={0}
                end={newDeaths}
                duration={2.5}
                separator={', '}
              />
            </h4>
            <p>new cases rate</p>
            <h4>{`${((newDeaths / (deaths - newDeaths)) * 100).toFixed(
              2
            )}%`}</h4>
          </div>
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
