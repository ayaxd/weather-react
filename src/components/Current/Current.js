import React, { useEffect, Fragment, useState } from 'react';
import styles from './Current.module.css';
import Temperature from '../Temperature';
import Meta from './Components/Meta';

import getCurrentWeather from '../../apis/getCurrentWeather';

const Current = ({ coords }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrent = async () => {
      const lon = coords.lon;
      const lat = coords.lat;

      const { data } = await getCurrentWeather(lat, lon);

      console.log(lon);
      setData(data);
      setLoading(false);
    };
    getCurrent();
  }, [coords]);

  return (
    <div className={styles.current}>
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <Fragment>
          <div className={styles.left}>
            <div className={styles.weatherDisplay}>
              <div className={styles.temperature}>
                <Temperature>{data.main.temp}</Temperature>
                <div className={styles.weather}>{data.weather[0].main}</div>
              </div>
              <div className={styles.location}>
                {data.name}
                {', '}
                {data.sys.country}
              </div>
              <div className={styles.metas}>
                <div className={styles.humidity}>
                  <Meta
                    title='HUMIDITY'
                    value={`${data.main.humidity}%`}
                  ></Meta>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.wind}>
                  <Meta title='WIND' value={`${data.wind.speed}k/m`}></Meta>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Current;
