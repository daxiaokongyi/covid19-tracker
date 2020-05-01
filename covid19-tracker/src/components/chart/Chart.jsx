import React, { useEffect } from 'react';
import globalTimeline from '../../actions/globalTimeline';
import countryTimeline from '../../actions/countryTimeline';
import { connect } from 'react-redux';
import styles from './Chart.module.css';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';

const Chart = ({
  globalDaily,
  countryDaily,
  globalTimeline,
  countryTimeline,
}) => {
  useEffect(() => {
    const Timeline = async () => {
      // console.log('triggered');
      globalTimeline();
      countryTimeline();
    };
    Timeline();
  }, [globalTimeline, countryTimeline]);

  // !globalDaily.length && console.log(globalDaily);
  // console.log(globalDaily);

  const lineChartGlobal = (
    <Line
      data={{
        labels: globalDaily.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: globalDaily.map(({ confirmed }) => confirmed),
            label: 'Confimred',
            borderColor: 'blue',
            fill: true,
          },
          {
            data: globalDaily.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            fill: true,
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
      }}
    />
  );

  const lineChartCountry = (
    <Line
      data={{
        labels: countryDaily.map(({ date }) => date),
        datasets: [
          {
            data: countryDaily.map(({ confirmed }) => confirmed),
            label: 'Confimred',
            borderColor: 'blue',
            fill: true,
          },
          {
            data: countryDaily.map(({ recovered }) => recovered),
            label: 'Recovered',
            borderColor: 'green',
            fill: true,
          },
          {
            data: countryDaily.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            fill: false,
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
      }}
    />
  );

  return !globalDaily[0] && !countryDaily[0] ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <h2>Global Cumulative Cases</h2>
      <div className={styles.chart}>{lineChartGlobal}</div>
      <h2>Country Cumulative Cases</h2>
      <div className={styles.chart}>{lineChartCountry}</div>
    </div>
  );
};

Chart.propTypes = {
  globalTimeline: PropTypes.func.isRequired,
  countryTimeline: PropTypes.func.isRequired,
  globalDaily: PropTypes.array.isRequired,
  countryDaily: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  globalDaily: state.globalDaily,
  countryDaily: state.countryDaily,
});

export default connect(mapStateToProps, {
  globalTimeline,
  countryTimeline,
})(Chart);
