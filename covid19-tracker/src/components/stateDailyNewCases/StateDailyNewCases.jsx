import React, { useEffect } from 'react';
import styles from './StateDailyNewCases.module.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import stateTimeline from '../../actions/stateTimeline';
import { Bar } from 'react-chartjs-2';
import Spinner from '../spinner/Spinner';
import { useTranslation } from 'react-i18next';

const StateDailyNewCases = ({
  states,
  chooseState: { state, customizedStateDaily },
  stateTimeline,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const getStateTimeline = async () => {
      //   console.log(typeof state);
      stateTimeline(state);
    };
    getStateTimeline();
  }, [stateTimeline, state]);

  const onHandleChange = (e) => {
    stateTimeline(e.target.value);
    console.log(e.target.value);
  };

  const barChartByState = (
    <Bar
      data={{
        labels: customizedStateDaily.map(({ date }) => date).reverse(),
        datasets: [
          {
            data: customizedStateDaily
              .map(({ positiveIncrease }) => positiveIncrease)
              .reverse(),
            label: 'New Confimred Cases',
            // borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            hoverBackgroundColor: 'rgba(255,0,0,0.5)',
          },
        ],
      }}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function (label, index, labels) {
                  if (label > 999999) {
                    return label / 1000000 + ' M';
                  } else if (label > 1000 && label < 1000000) {
                    return label / 1000 + ' K';
                  } else {
                    return label;
                  }
                },
              },
            },
          ],
        },
        maintainAspectRatio: false, // Don't maintain w/h ratio
      }}
    />
  );

  return !customizedStateDaily ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.title}> {t('New Daily Cases By State')}</div>
      <select name='select-state' onChange={(e) => onHandleChange(e)}>
        {states.map(({ state }, i) => (
          <option value={state} key={i}>
            {state}
          </option>
        ))}
      </select>
      <div className={styles.barChart}>{barChartByState}</div>
    </div>
  );
};

StateDailyNewCases.propTypes = {
  states: PropTypes.array.isRequired,
  stateTimeline: PropTypes.func.isRequired,
  chooseState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  states: state.states,
  chooseState: state.chooseState,
});

export default connect(mapStateToProps, { stateTimeline })(StateDailyNewCases);
