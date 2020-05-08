import React, { useEffect } from 'react';
import getStates from '../../actions/getStates';
import clearCountryTimeline from '../../actions/clearCountryTimeline';
import clearGlobalTimeline from '../../actions/clearGlobalTimeline';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import styles from './GetUsStates.module.css';
import { useTranslation } from 'react-i18next';

const GetUsStates = ({
  getStates,
  clearCountryTimeline,
  clearGlobalTimeline,
  states,
}) => {
  useEffect(() => {
    const usStates = async () => {
      clearCountryTimeline();
      clearGlobalTimeline();
      getStates();
    };
    usStates();
  }, [getStates]);

  // console.log(states);

  // return <div>test</div>;

  const { t } = useTranslation();

  return !states ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.title}>{t('Cases in the United States')}</div>
      <div className={styles.header}>
        <div className={styles.headerState}>State</div>
        <div className={styles.headerTotalTest}>Total Test Results</div>
        <div className={styles.headerPositive}>Positive</div>
        <div className={styles.headerRecovered}>Recovered</div>
        <div className={styles.headerDeath}>Death</div>
      </div>
      {states.map((eachState, i) =>
        i % 2 ? (
          <div className={styles.individualStateEven}>
            <div className={styles.state}>{eachState.state}</div>
            <div className={styles.totalTest}>
              {eachState.totalTestResults
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
            <div className={styles.positive}>
              {eachState.positive
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
            <div className={styles.recovered}>
              {eachState.recovered &&
                eachState.recovered
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
            <div className={styles.death}>
              {eachState.death
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
          </div>
        ) : (
          <div className={styles.individualStateOdd}>
            <div className={styles.state}>{eachState.state}</div>
            <div className={styles.totalTest}>
              {eachState.totalTestResults
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
            <div className={styles.positive}>
              {eachState.positive
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
            <div className={styles.recovered}>
              {eachState.recovered &&
                eachState.recovered
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
            <div className={styles.death}>
              {eachState.death
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </div>
          </div>
        )
      )}
    </div>
  );
};

GetUsStates.propTypes = {
  getStates: PropTypes.func.isRequired,
  clearCountryTimeline: PropTypes.func.isRequired,
  clearGlobalTimeline: PropTypes.func.isRequired,
  states: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  states: state.states,
});
export default connect(mapStateToProps, {
  getStates,
  clearCountryTimeline,
  clearGlobalTimeline,
})(GetUsStates);
