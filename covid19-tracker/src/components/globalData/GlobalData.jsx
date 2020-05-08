import React, { useEffect } from 'react';
import styles from './GlobalData.module.css';
import { connect } from 'react-redux';
import globalCumulative from '../../actions/globalCumulative';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import Spinner from '../spinner/Spinner';
import { useTranslation } from 'react-i18next';

const GlobalData = ({
  globalData: { confirmed, recovered, deaths, newConfirmed, newDeaths },
  language: { lang },
  globalCumulative,
}) => {
  const { t } = useTranslation();

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
      <div className={styles.global}>
        <div className={[styles.boxContent, styles.cumulative].join(' ')}>
          <i className='fas fa-globe-americas'> {t('Global Today')}</i>
          <div>
            <p>
              {t('Confirmed')}:{' '}
              <strong>
                <CountUp
                  start={0}
                  end={confirmed}
                  duration={2.5}
                  separator={', '}
                />
              </strong>
            </p>
            <p>
              {t('Recovered')}:{' '}
              <strong>
                <CountUp
                  start={0}
                  end={recovered}
                  duration={2.5}
                  separator={', '}
                />
              </strong>
            </p>
            <p>
              {t('Deaths')}:{' '}
              <strong>
                <CountUp
                  start={0}
                  end={deaths}
                  duration={2.5}
                  separator={', '}
                />
              </strong>
            </p>
          </div>
        </div>

        <div className={[styles.boxContent, styles.newCases].join(' ')}>
          <i className='fas fa-calendar-plus'> {t('New Cases Today')}</i>
          <div>
            <p>
              {t('Confirmed')}:{' '}
              <strong>
                <CountUp
                  start={0}
                  end={newConfirmed}
                  duration={2.5}
                  separator={', '}
                />
              </strong>
            </p>
            <p>
              {t('Deaths')}:{' '}
              <strong>
                <CountUp
                  start={0}
                  end={newDeaths}
                  duration={2.5}
                  separator={', '}
                />
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

GlobalData.propTypes = {
  globalCumulative: PropTypes.func.isRequired,
  GlobalData: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  globalData: state.globalData,
  language: state.language,
});

export default connect(mapStateToProps, { globalCumulative })(GlobalData);
