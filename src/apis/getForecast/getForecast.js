import getWeather from '../../utils/OpenWeatherMap';

export default (lat, lon, exclude) =>
  getWeather('/onecall', {
    lat,
    lon,
    exclude,
  });
