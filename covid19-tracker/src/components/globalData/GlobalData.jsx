import React, { useEffect } from 'react';
import styles from './GlobalData.module.css';
import { connect } from 'react-redux';
import globalCumulative from '../../actions/globalCumulative';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import Spinner from '../spinner/Spinner';

const GlobalData = ({
  globalData: { confirmed, recovered, deaths, newConfirmed, newDeaths },
  globalCumulative,
}) => {
  useEffect(() => {
    const getGlobalData = async () => {
      globalCumulative();
    };
    getGlobalData();
  }, [globalCumulative]);

  return !confirmed ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div>Last Update: {new Date().toDateString()}</div>
      <div className={styles.box}>
        <div>Cumulative:</div>
        <h4>
          Confirmed:{' '}
          <CountUp start={0} end={confirmed} duration={2.5} separator={', '} />
        </h4>
        <h4>
          Recovered:{' '}
          <CountUp start={0} end={recovered} duration={2.5} separator={', '} />
        </h4>
        <h4>
          Death:{' '}
          <CountUp start={0} end={deaths} duration={2.5} separator={', '} />
        </h4>
      </div>

      <div className={styles.box}>
        <div>New Cases:</div>
        <h4>
          Confirmed:{' '}
          <CountUp
            start={0}
            end={newConfirmed}
            duration={2.5}
            separator={', '}
          />
        </h4>
        <h4>Recovered: -------- </h4>
        <h4>
          Death:{' '}
          <CountUp start={0} end={newDeaths} duration={2.5} separator={', '} />
        </h4>
      </div>
    </div>
  );
};

GlobalData.propTypes = {
  globalCumulative: PropTypes.func.isRequired,
  GlobalData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  globalData: state.globalData,
});

export default connect(mapStateToProps, { globalCumulative })(GlobalData);
