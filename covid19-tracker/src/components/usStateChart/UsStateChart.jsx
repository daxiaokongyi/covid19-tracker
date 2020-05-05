import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import styles from './UsStateChart.module.css';
import { useTranslation } from 'react-i18next';
import { Pie } from 'react-chartjs-2';

const UsStateChart = ({ states }) => {
  const { t } = useTranslation();
  //   console.log(states);
  //   console.log(states.positive);

  // Generate color for each state
  const colorGenerator = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  };

  const colorWheel = [];
  for (let i = 0; i < states.length; i++) {
    colorWheel.push(colorGenerator());
  }

  //   console.log(colorWheel);

  const pieChartState = (
    <div className={styles.canvasContainer}>
      {' '}
      <Pie
        data={{
          labels: states.map(({ state }) => state),
          datasets: [
            {
              data: states.map(({ positive }) => positive),
              label: states.map(({ state }) => state),

              backgroundColor: colorWheel,
            },
          ],
        }}
        // data={{
        //   labels: ['a', 'b', 'c'],
        //   datasets: [
        //     {
        //       data: [1, 3, 6],
        //       backgroundColor: ['red', 'blue', 'green'],
        //     },
        //   ],
        // }}
        // maintainAspectRatio: false,
        // responsive: false,
        options={{
          legend: {
            // display: false,
            position: 'bottom',
            labels: {
              boxWidth: 5,
              fontSize: 11,
            },
          },
        }}
      />
    </div>
  );

  return !states ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.title}>{t('Pie Chart By States')}</div>
      <div className={styles.stateChart}>{pieChartState}</div>
    </div>
  );
};

UsStateChart.propTypes = {
  states: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  states: state.states,
});

export default connect(mapStateToProps)(UsStateChart);
