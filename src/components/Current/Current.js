import React, { Component, Fragment } from 'react';
import styles from './Current.module.css';
import Temperature from '../Temperature';
import Meta from './Components/Meta';
import axios from 'axios';
import getWeather from '../../utils/OpenWeatherMap';
import getCurrentWeather from '../../apis/getCurrentWeather';
import Search from '../Search';
import getSearchWeather from '../../apis/getSearchWeather';
import getForecast from '../../apis/getForecast';

class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        lat: 45,
        lon: 60,
      },
      data: null,
      loading: true,
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
        console.log(this.state.coords);
        this.getCurrent();
      });
    } else {
      console.log('nah');
    }
  }

  async getCurrent() {
    const lat = this.state.coords.lat;
    const lon = this.state.coords.lon;

    const { data } = await getCurrentWeather(lat, lon);

    // const { data } = await axios.get(
    //   'http://api.openweathermap.org/data/2.5/weather',
    //   {
    //     params: {
    //       lat: this.state.coords.lat,
    //       lon: this.state.coords.lon,
    //       appid: 'f8cc51f625874e614eec6716d2eebbd8',
    //       units: 'metric',
    //     },
    //   }
    // );
    console.log(this.state.coords);

    this.setState({ data: data, loading: false });
  }

  changeWeather = async (q) => {
    console.log('change weather');
    try {
      const { data } = await getSearchWeather(q);
      const { coord } = data;
      console.log(coord);
      this.setState({ data: data, loading: false, coords: coord });
    } catch (error) {
      console.log(error);
    }
  };

  // changeForecast = async (lat, lon, exclude) => {
  //   const { data } = await getForecast(lat, lon, exclude);
  //   this.setState({ data: data, loading: false });
  // };

  render() {
    const { data, loading } = this.state;

    return (
      <div className={styles.current}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            <div className={styles.top}>
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
                      title="HUMIDITY"
                      value={`${data.main.humidity}%`}
                    ></Meta>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={styles.wind}>
                    <Meta title="WIND" value={`${data.wind.speed}k/m`}></Meta>
                  </div>
                </div>
              </div>
              <Search
                changeWeather={this.changeWeather}
                // changeForecast={this.changeForecast}
              />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Current;
