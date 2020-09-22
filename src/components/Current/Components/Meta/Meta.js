import React from 'react';
import styles from './Meta.module.css';

const Meta = ({ title, value }) => (
  <div className={styles.meta}>
    <div className={styles.title}>{title}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

export default Meta;
