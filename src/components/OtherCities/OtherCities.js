import React, { Component } from 'react';
import styles from './OtherCities.module.css';
import City from './Components/City';
import axios from 'axios';
import getWeather from '../../utils/OpenWeatherMap';
import getWeathers from '../../apis/getWeathers';

const CITIES = [
  {
    name: 'Sydney',
    id: '2147714',
  },
  {
    name: 'Melbourne',
    id: '4163971',
  },
  {
    name: 'Brisbane',
    id: '2174003',
  },
  {
    name: 'Perth',
    id: '2063523',
  },
];

class OtherCities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.getWeathers();
  }

  async getWeathers() {
    const ids = CITIES.map((city) => city.id);
    const id = ids.join(',');

    const { data } = await getWeathers(id);
    this.setState({ data: data, loading: false });
  }

  render() {
    const { data, loading } = this.state;
    console.log(data);
    return (
      <div className={styles.otherCities}>
        <h3 className={styles.title}>Other Cities</h3>

        {loading ? (
          <div>loading...</div>
        ) : (
          <div>
            {data.list.map((item) => (
              <City
                key={item.id}
                name={item.name}
                temperature={parseInt(item.main.temp)}
                weather={{
                  icon: item.weather[0].icon,
                  description: item.weather[0].main,
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default OtherCities;
