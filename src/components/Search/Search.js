import React, { Component } from 'react';
import styles from './Search.module.css';
import getCurrentWeather from '../../apis/getCurrentWeather';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLocation: '',
    };
  }
  changeLocationHandler = (e) => {
    this.setState({ inputLocation: e.target.value });
  };

  changeWeatherHandler = (e) => {
    e.preventDefault();
    // this.props.changeForecast(this.state.inputLocation);
    this.props.changeWeather(this.state.inputLocation);

    this.setState({ inputLocation: '' });
  };

  render() {
    return (
      <div className={styles.search}>
        <form className={styles.location} onSubmit={this.changeWeatherHandler}>
          <i className="fas fa-search"></i>
          <input
            className={styles.locationInput}
            placeholder="Enter Location..."
            value={this.state.inputLocation}
            onChange={this.changeLocationHandler}
          />
        </form>
      </div>
    );
  }
}
export default Search;
