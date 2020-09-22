import React, { Component } from 'react';
import styles from './Forecast.module.css';
import Weather from '../Forecast/Weather';
import getForecast from '../../apis/getForecast';
import getSearchWeather from '../../apis/getSearchWeather';
import Search from '../Search';
import getCurrentWeather from '../../apis/getCurrentWeather';

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      coords: {
        lat: 45,
        lon: 60,
      },
    };
  }

  componentDidMount() {
    this.getPosition();
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let myCoords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        this.setState({ coords: myCoords });
        this.getCurrentForecast();
      });
    } else {
      console.log('nah');
    }
  }

  changeForecast = async (q) => {
    const { data } = await getSearchWeather(q);
    const { coord } = data;
    console.log(coord);
    this.setState({ coords: coord });
    console.log(this.state.coords);
    this.getCurrentForecast();
    console.log(this.state.coords);
  };

  async getCurrentForecast() {
    // const { data1 } = await getCurrentWeather(lat, lon);
    // console.log(data1);
    const lat = this.state.coords.lat;
    const lon = this.state.coords.lon;
    const exclude = 'minutely,hourly';

    const { data } = await getForecast(lat, lon, exclude);
    console.log(data);
    this.setState({ data: data, loading: false });
  }

  render() {
    const { data, loading } = this.state;

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
  }
}

export default Forecast;
