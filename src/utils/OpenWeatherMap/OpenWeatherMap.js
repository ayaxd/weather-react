import axios from 'axios';

const baseURL = 'http://api.openweathermap.org/data/2.5';

const getWeather = (url, params) =>
  axios.get(`${baseURL}${url}`, {
    params: {
      ...params,
      appid: '185ba5dc428fd725af70265bbeed01d1',
      units: 'metric',
    },
  });

export default getWeather;
