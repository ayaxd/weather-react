import axios from 'axios';

const baseURL = 'http://api.openweathermap.org/data/2.5';

// const appid = process.env.APP_ID;

const getWeather = (url, params) =>
  axios.get(`${baseURL}${url}`, {
    params: {
      ...params,
      appid: process.env.REACT_APP_API_KEY,
      units: 'metric',
    },
  });

export default getWeather;
