import React, { Component } from 'react';
import styles from './App.module.css';
import Current from './components/Current';
import Forecast from './components/Forecast';
import Search from './components/Search';
import OtherCities from './components/OtherCities';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.weather}>
          <div className={styles.top}>
            <Current />
          </div>
          <div className={styles.bottom}>
            <Forecast />
            <div className={styles.divider}></div>
            <OtherCities />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
