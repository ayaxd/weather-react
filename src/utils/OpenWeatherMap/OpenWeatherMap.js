import axios from 'axios';

const baseURL = 'http://api.openweathermap.org/data/2.5';

const getWeather = (url, params) =>
  axios.get(`${baseURL}${url}`, {
    params: {
      ...params,
      appid: 'f8cc51f625874e614eec6716d2eebbd8',
      units: 'metric',
    },
  });

export default getWeather;
