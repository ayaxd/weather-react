import React, { Component } from 'react';
import styles from './App.module.css';
import Current from './components/Current';
import Forecast from './components/Forecast';
import Search from './components/Search';
import OtherCities from './components/OtherCities';

import getSearchWeather from './apis/getSearchWeather';

class App extends Component {
  state = {
    coords: {
      lon: 0,
      lat: 0,
    },
  };

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
      });
    } else {
      console.log('nah');
    }
  }

  changeCoords = async (q) => {
    console.log('change coords');
    try {
      const { data } = await getSearchWeather(q);
      const { coord } = data;
      console.log(coord);
      this.setState({ coords: coord });
      console.log(this.state.coords);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.weather}>
          <div className={styles.top}>
            <Current coords={this.state.coords} />
            <Search
              changeCoords={this.changeCoords}
              // changeForecast={this.changeForecast}
            />
          </div>
          <div className={styles.bottom}>
            <Forecast coords={this.state.coords} />
            <div className={styles.divider}></div>
            <div className={styles.parallel}></div>

            <OtherCities />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
