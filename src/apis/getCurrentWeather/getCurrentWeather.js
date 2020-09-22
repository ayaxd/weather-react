import getWeather from '../../utils/OpenWeatherMap';

export default (lat, lon) =>
  getWeather('/weather', {
    lat,
    lon,
  });
