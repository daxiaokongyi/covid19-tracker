import styles from './Footer.module.css';

import React from 'react';
const Footer = () => {
  return (
    <div className={styles.container}>
      <small>
        Copyright <i className='far fa-copyright'></i> 2020 Jason Jin, All
        rights reserved
      </small>
    </div>
  );
};

export default Footer;
