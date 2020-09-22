import React from 'react';
import styles from './Temperature.module.css';

const Temperature = ({ children }) => (
  <span className={styles.temperature}>
    <span>{children}</span>
    <span>&nbsp;</span>
    <span>&deg;</span>
  </span>
);

export default Temperature;
