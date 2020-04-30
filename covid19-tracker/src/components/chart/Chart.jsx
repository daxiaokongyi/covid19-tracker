import React, { useEffect } from 'react';
import globalTimeline from '../../actions/globalTimeline';
import { connect } from 'react-redux';
import styles from './Chart.module.css';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';

const Chart = ({ globalDaily, globalTimeline }) => {
  useEffect(() => {
    const getGlobalTimeline = async () => {
      // console.log('triggered');
      globalTimeline();
    };
    getGlobalTimeline();
  }, [globalTimeline]);

  // !globalDaily.length && console.log(globalDaily);
  console.log(globalDaily);

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
            fill: false,
          },
        ],
      }}
    />
  );

  const lineChartCountry = (
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
            fill: false,
          },
        ],
      }}
    />
  );

  return <div className={styles.container}>{lineChartGlobal}</div>;
};

Chart.propTypes = {
  globalTimeline: PropTypes.func.isRequired,
  globalDaily: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  globalDaily: state.globalDaily,
});

export default connect(mapStateToProps, { globalTimeline })(Chart);
