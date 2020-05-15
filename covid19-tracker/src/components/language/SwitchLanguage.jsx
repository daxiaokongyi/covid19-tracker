import React from 'react';
import styles from './SwitchLanguage.module.css';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getLanguage from '../../actions/getLanguage';

const SwitchLanguage = ({ getLanguage }) => {
  const { i18n } = useTranslation();

  const onClickChange = (lang) => {
    // console.log(lang);
    i18n.changeLanguage(lang);
    getLanguage(lang);
  };

  return (
    <div>
      <div className={styles.container}>
        <button onClick={() => onClickChange('en')}>English</button>
        <button onClick={() => onClickChange('sc')}>简体</button>
        <button onClick={() => onClickChange('tc')}>繁體</button>
        <button onClick={() => onClickChange('jp')}>日本語</button>
        <button onClick={() => onClickChange('kr')}>한국어</button>
      </div>
      {/* <p>{t('thanks.1')}</p>
      <p>{t('why.1')}</p> */}
    </div>
  );
};

SwitchLanguage.propTypes = {
  SwitchLanguage: PropTypes.func.isRequired,
};

export default connect(null, { getLanguage })(SwitchLanguage);
