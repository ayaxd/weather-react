import axios from 'axios';

const baseURL = 'http://api.openweathermap.org/data/2.5';

// const appid = process.env.REACT_APP_API_KEY;

const getWeather = (url, params) =>
  axios.get(`${baseURL}${url}`, {
    params: {
      ...params,
      appid: '4d34fc9919f5210dab7fb0d1f9aa0f9a',
      units: 'metric',
    },
  });

export default getWeather;
