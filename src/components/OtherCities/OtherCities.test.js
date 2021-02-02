import React from 'react';
import { render } from '@testing-library/react';
import City from './Components/City';
import getWeathers from '../../apis/getWeathers';
import OtherCities, { CITIES } from './OtherCities';

jest.mock('./Components/City', () => jest.fn(() => '<City /> '));
jest.mock('../../apis/getWeathers', () => jest.fn());

describe('<OtherCities />', () => {
  describe('On loading...', () => {
    let renderResult;

    beforeEach(() => {
      City.mockClear();
      getWeathers.mockClear();

      getWeathers.mockImplementation(() => new Promise(() => {}));
      renderResult = render(<OtherCities />);
    });

    it("should call getWeathers with city's id", () => {
      expect(getWeathers).toBeCalledWith(CITIES.map((c) => c.id).toString());
    });

    it('should render loading', () => {
      const { getByText } = renderResult;
      expect(getByText('loading...')).toBeInTheDocument();
    });
    it('should not call <City />', () => {
      expect(City).not.toBeCalled();
    });
  });

  describe('On Loaded!', () => {
    let renderResult;

    const weathers = {
      list: [
        {
          id: 'ID',
          name: 'Melbourne',
          main: { temp: 10 },
          weather: [
            {
              icon: '01d',
              main: 'Clouds',
            },
          ],
        },
      ],
    };

    beforeEach(() => {
      City.mockClear();
      getWeathers.mockClear();

      getWeathers.mockResolvedValue({
        data: weathers,
      });
      renderResult = render(<OtherCities />);
    });

    it('should call getWeathers with city ids', () => {
      expect(getWeathers).toBeCalledWith(CITIES.map((c) => c.id).toString());
    });
    it('should not render loading...', () => {
      const { queryByText } = renderResult;
      expect(queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('should render <City />', () => {
      weathers.list.forEach((item) => {
        expect(City).toBeCalledWith(
          {
            name: item.name,
            temperature: parseInt(item.main.temp),
            weather: {
              icon: item.weather[0].icon,
              description: item.weather[0].main,
            },
          },
          expect.anything()
        );
      });
    });
  });
});
