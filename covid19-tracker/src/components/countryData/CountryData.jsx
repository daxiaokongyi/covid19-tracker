import React, { useEffect } from 'react';
import styles from './CountryData.module.css';
import countryCumulative from '../../actions/countryCumulative';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CountryData = ({
  countryData: {
    confirmed,
    recovered,
    deaths,
    newConfirmed,
    newDeaths,
    dangerRank,
  },
  countryCumulative,
}) => {
  useEffect(() => {
    const getCountryData = async () => {
      countryCumulative();
    };
    getCountryData();
  }, [countryCumulative]);

  return (
    <div className={styles.container}>
      <div className={styles.countryRank}>
        <div>
          {' '}
          Select Country
          <select name='' id=''>
            <option value='US'>US</option>
          </select>
        </div>
        <div>Danger Rank: {dangerRank}</div>
      </div>
      <div className={styles.allBoxes}>
        <div className={[styles.box, styles.confirmed].join(' ')}>
          <h4>Confirmed</h4>
          <h2>{confirmed}</h2>
          <h4>New cases</h4>
          <h2>{newConfirmed}</h2>
        </div>
        <div className={[styles.box, styles.recovered].join(' ')}>
          <h4>Recovered</h4>
          <h2>{recovered}</h2>
          <h4>New cases</h4>
          <h2>------------</h2>
        </div>
        <div className={[styles.box, styles.deaths].join(' ')}>
          <h4>Deaths</h4>
          <h2>{deaths}</h2>
          <h4>New cases</h4>
          <h2>{newDeaths}</h2>
        </div>
      </div>
    </div>
  );
};

CountryData.propTypes = {
  countryCumulative: PropTypes.func.isRequired,
  CountryData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  countryData: state.countryData,
});

export default connect(mapStateToProps, { countryCumulative })(CountryData);
