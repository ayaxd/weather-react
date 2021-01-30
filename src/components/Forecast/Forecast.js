import React, { useState, useEffect } from 'react';
import styles from './Forecast.module.css';
import Weather from '../Forecast/Weather';
import getForecast from '../../apis/getForecast';

const Forecast = ({ coords }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentForecast = async () => {
      const lat = coords.lat;
      const lon = coords.lon;
      const exclude = 'minutely,hourly';

      console.log(lat);

      const { data } = await getForecast(lat, lon, exclude);
      console.log(data);
      setData(data);
      setLoading(false);
    };
    getCurrentForecast();
  }, [coords]);

  return (
    <div className={styles.forecast}>
      <h3 className={styles.header}>Forecast</h3>

      <div className={styles.weathers}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.daily.map((item) => (
            <Weather
              day={new Date(item.dt * 1000).toLocaleString('en-US', {
                weekday: 'short',
              })}
              temperature={Math.floor(item.temp.day)}
              weather={{
                icon: item.weather[0].icon,
                description: item.weather[0].main,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Forecast;
