import getWeather from '../../utils/OpenWeatherMap';

export default (id) =>
  getWeather('/group', {
    id,
  });
