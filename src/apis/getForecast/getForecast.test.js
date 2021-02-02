import OpenWeatherMap from '../../utils/OpenWeatherMap';
import getForecast from './getForecast';

describe('getForecast', () => {
  beforeEach(() => {
    jest.spyOn(OpenWeatherMap, 'getWeather').mockResolvedValue();
  });

  afterEach(() => {
    OpenWeatherMap.getWeather.mockRestore();
  });

  it('should use OpenWeatherMap to get data', async () => {
    OpenWeatherMap.getWeather.mockResolvedValue();

    const lat = '-37';
    const lon = '145';
    const exclude = 'minutely,hourly';
    await getForecast(lat, lon, exclude);

    expect(OpenWeatherMap.getWeather).toBeCalled();
    expect(OpenWeatherMap.getWeather).toBeCalledWith('/onecall', {
      params: {
        lat,
        lon,
        exclude,
      },
    });
  });
  it('should resolve get data', async () => {
    const data = {
      lat: -37.81,
      lon: 144.96,
      timezone: 'Australia/Melbourne',
      timezone_offset: 39600,
      current: {
        dt: 1612266201,
        sunrise: 1612208090,
        sunset: 1612258365,
        temp: 289.28,
        feels_like: 285.31,
        pressure: 1018,
        humidity: 72,
        dew_point: 284.24,
        uvi: 0,
        clouds: 90,
        visibility: 10000,
        wind_speed: 6.17,
        wind_deg: 150,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n',
          },
        ],
      },
      daily: [
        {
          dt: 1612231200,
          sunrise: 1612208090,
          sunset: 1612258365,
          temp: {
            day: 289.98,
            min: 287.96,
            max: 290.81,
            night: 289.24,
            eve: 290.24,
            morn: 287.96,
          },
          feels_like: {
            day: 285.73,
            night: 285.91,
            eve: 286.49,
            morn: 284.79,
          },
          pressure: 1016,
          humidity: 58,
          dew_point: 281.71,
          wind_speed: 5.58,
          wind_deg: 195,
          weather: [
            {
              id: 500,
              main: 'Rain',
              description: 'light rain',
              icon: '10d',
            },
          ],
          clouds: 98,
          pop: 0.48,
          rain: 0.26,
          uvi: 10.49,
        },
      ],
    };

    OpenWeatherMap.getWeather.mockResolvedValue({ data });

    const response = await getForecast(-37, 145, 'minutely,hourly');
    expect(response.data).toBe(data);
  });
});
