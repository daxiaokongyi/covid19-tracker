import React from 'react';
import styles from './Navbar.module.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <small className={styles.update}>
        {t('Lastest Updates')}: {new Date().toDateString()}
      </small>
      <div>COVID-19 {t('GLOBAL TRACKER')}</div>
      <div className={styles.buttons}>
        <Link to='/' className={styles.button}>
          {t('World')}
        </Link>
        <Link to='/us' className={styles.button}>
          {t('United States')}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
