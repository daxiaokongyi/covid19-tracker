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
            <option value={['US', 'US']}>US</option>
            {countries.map(({ name, iso2 }, i) => (
              <option value={[iso2, name]} key={i}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>
            Current Population:{' '}
            {/* <strong>
              {population
                ? population
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                : `loading ...`}
            </strong> */}
            <strong>
              {population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </strong>
          </p>
        </div>
        <div>
          <img
            src={`https://www.countryflags.io/${country}/shiny/64.png`}
            alt='flag-img'
          />
        </div>
        <div>
          Risk Ranking: <strong>{dangerRank}</strong>
        </div>
      </div>
      <div className={styles.allBoxes}>
        <div className={[styles.box, styles.confirmed].join(' ')}>
          <div className={styles.cumulative}>
            <p>Confirmed</p>
            <strong>
              {' '}
              <CountUp
                start={0}
                end={confirmed}
                duration={2.5}
                separator={', '}
              />
            </strong>
            <p>
              About{' '}
              {/* <strong>
                {population
                  ? ((confirmed / population) * 1000000).toFixed(0)
                  : 'loading ...'}
              </strong>{' '} */}
              <strong>{((confirmed / population) * 1000000).toFixed(0)}</strong>{' '}
              per 1M people
            </p>
          </div>
          <div className={styles.newCases}>
            <p>New Cases Today</p>
            <strong>
              {' '}
              <CountUp
                start={0}
                end={newConfirmed}
                duration={2.5}
                separator={', '}
              />
            </strong>
          </div>
          <div className={styles.newCasesRate}>
            <p>New Cases Rate </p>
            <strong>{`${(
              (newConfirmed / (confirmed - newConfirmed)) *
              100
            ).toFixed(2)}%`}</strong>
          </div>
        </div>
        <div className={[styles.box, styles.recovered].join(' ')}>
          <p>Recovered</p>
          <strong>
            {' '}
            <CountUp
              start={0}
              end={recovered}
              duration={2.5}
              separator={', '}
            />
          </strong>
          <p>
            About{' '}
            {/* <strong>
              {population
                ? ((recovered / population) * 1000000).toFixed(0)
                : 'loading ...'}
            </strong>{' '} */}
            <strong>{((recovered / population) * 1000000).toFixed(0)}</strong>{' '}
            per 1M people
          </p>
        </div>
        <div className={[styles.box, styles.deaths].join(' ')}>
          <div className={styles.cumulative}>
            <p>Deaths</p>
            <strong>
              {' '}
              <CountUp start={0} end={deaths} duration={2.5} separator={', '} />
            </strong>
            <p>
              About{' '}
              <strong>
                {((deaths / population) * 1000000).toFixed(0)} per 1M people
              </strong>
            </p>
          </div>
          <div className={styles.newCases}>
            <p>New Cases Today</p>
            <strong>
              {' '}
              <CountUp
                start={0}
                end={newDeaths}
                duration={2.5}
                separator={', '}
              />
            </strong>
          </div>
          <div className={styles.newCasesRate}>
            <p>New Cases Rate</p>
            <strong>{`${((newDeaths / (deaths - newDeaths)) * 100).toFixed(
              2
            )}%`}</strong>
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
