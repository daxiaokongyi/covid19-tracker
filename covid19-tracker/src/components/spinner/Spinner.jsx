import React from 'react';
import loading from './loading.gif';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <img src={loading} alt='Loading ... ' />
    </div>
  );
};

export default Spinner;
