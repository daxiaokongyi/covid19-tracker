import React, { useEffect } from 'react';
import styles from './CountryData.module.css';
import countryCumulative from '../../actions/countryCumulative';
import selectCountry from '../../actions/selectCountry';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

const CountryData = ({
  countryData: {
    confirmed,
    recovered,
    deaths,
    newConfirmed,
    newDeaths,
    dangerRank,
    countries,
  },
  updateCountry,
  countryCumulative,
  selectCountry,
}) => {
  useEffect(() => {
    const getCountryData = async () => {
      countryCumulative();
    };
    getCountryData();
  }, [countryCumulative]);

  const onHandleChange = (e) => {
    console.log(e.target.value);
    selectCountry(e.target.value);
    console.log(updateCountry);
  };

  return (
    <div className={styles.container}>
      <div className={styles.countryRank}>
        <div>
          {' '}
          Select Country:{''}
          <select onChange={(e) => onHandleChange(e)}>
            {countries.map(({ name, iso2 }, i) => (
              <option value={iso2} key={i}>
                {name}
              </option>
            ))}
          </select>
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
          <h4>New cases</h4>
          <h2>------------</h2>
        </div>
        <div className={[styles.box, styles.deaths].join(' ')}>
          <h4>Deaths</h4>
          <h2>
            {' '}
            <CountUp start={0} end={deaths} duration={2.5} separator={', '} />
          </h2>
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
        </div>
      </div>
    </div>
  );
};

CountryData.propTypes = {
  countryCumulative: PropTypes.func.isRequired,
  selectCountry: PropTypes.func.isRequired,
  CountryData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  countryData: state.countryData,
  updateCountry: state.updateCountry,
});

export default connect(mapStateToProps, { countryCumulative, selectCountry })(
  CountryData
);
