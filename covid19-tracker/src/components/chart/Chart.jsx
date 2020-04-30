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
    />
  );

  return (
    <div className={styles.container}>
      {lineChartGlobal}
      {lineChartCountry}
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
