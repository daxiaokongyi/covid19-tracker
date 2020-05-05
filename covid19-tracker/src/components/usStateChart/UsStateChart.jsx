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
            align: 'center',
            position: 'bottom',
            labels: {
              boxWidth: 5,
              fontSize: 11,
            },
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                let dataset = data.datasets[tooltipItem.datasetIndex];
                let meta = dataset._meta[Object.keys(dataset._meta)[0]];
                let total = meta.total;
                let currentValue = dataset.data[tooltipItem.index];
                let percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return currentValue + ' (' + percentage + '%)';
              },
              title: function (tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              },
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
      <div className={styles.title}>{t('Comfirmed Cases By State')}</div>
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
