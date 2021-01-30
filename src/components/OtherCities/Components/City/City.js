import React from 'react';
import styles from './City.module.css';
import Temperature from '../../../Temperature';

const City = ({ city }) => {
  const name = city.name;
  const temperature = parseInt(city.main.temp);
  const weather = city.weather[0];

  return (
    <div className={styles.city}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.temperature}>
        <Temperature>{temperature}</Temperature>
      </div>
      <img
        className={styles.weather}
        src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
        alt={weather.description}
      />
      <div className={styles.description}>{weather.description}</div>
    </div>
  );
};

export default City;
