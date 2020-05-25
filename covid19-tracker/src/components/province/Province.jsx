import React, { useEffect, useState } from 'react';
import getProvince from '../../actions/getProvince';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Province.module.css';
import { useTranslation } from 'react-i18next';
import Spinner from '../spinner/Spinner';

const Province = ({ provinces, getProvince }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const provinceResult = async () => {
      getProvince('US');
    };
    provinceResult();
  }, [getProvince]);

  const [thisProvince, setProvince] = useState('South Carolina');
  // console.log(thisProvince);
  const onHandleChange = (e) => {
    setProvince(e.target.value);
    // console.log(thisProvince);
  };

  // console.log(provinces);

  const citiesInThisProvince = provinces.filter(
    (each) => each.province === thisProvince
  );

  // console.log(
  //   !citiesInThisProvince[0] ? '' : citiesInThisProvince[0].cityInProvince
  // );

  return !provinces ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.title}>{t('City Cases By State')}</div>
      {t('Select State')} :
      <select onChange={(e) => onHandleChange(e)}>
        {provinces.map(({ province }, i) => (
          <option value={province} key={i}>
            {province}
          </option>
        ))}
      </select>
      <div className={styles.currentProvince}>
        <div className={styles.header}>
          <div className={styles.city}>City</div>
          <div className={styles.confirmed}>Confirmed</div>
          <div className={styles.death}>Death</div>
          <div className={styles.newConfirmed}>Confirmed Today</div>
          <div className={styles.newDeath}>Death Today</div>
        </div>
        {!citiesInThisProvince[0]
          ? ''
          : citiesInThisProvince[0].cityInProvince.map((each, i) =>
              i % 2 ? (
                <div className={styles.individualCityEven}>
                  <div className={styles.nameCity}>{each.name}</div>
                  <div className={styles.confirmedCity}>
                    {each.confirmed
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </div>
                  <div className={styles.deathsCity}>
                    {each.deaths
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </div>
                  <div className={styles.newConfirmedCity}>
                    {each.confirmed_diff
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </div>
                  <div className={styles.newDeathCity}>
                    {each.deaths_diff
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </div>
                </div>
              ) : (
                <div className={styles.individualCityOdd}>
                  <div className={styles.nameCity}>{each.name}</div>
                  <div className={styles.confirmedCity}>
                    {each.confirmed
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </div>
                  <div className={styles.deathsCity}>
                    {each.deaths
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </div>
                  <div className={styles.newConfirmedCity}>
                    {each.confirmed_diff
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </div>
                  <div className={styles.newDeathCity}>
                    {each.deaths_diff
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </div>
                </div>
              )
            )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  provinces: state.provinces,
});

Province.propTypes = {
  getProvince: PropTypes.func.isRequired,
  provinces: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { getProvince })(Province);
