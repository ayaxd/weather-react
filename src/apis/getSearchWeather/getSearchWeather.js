import getWeather from '../../utils/OpenWeatherMap';

export default (q) =>
  getWeather('/weather', {
    q,
  });
