import React from 'react';
import Weather from './Weather';
import { render } from '@testing-library/react';

describe('<Weather />', () => {
  let renderResult;

  const props = {
    day: 'Mon',
    weather: {
      icon: '01d',
      description: 'Clouds',
    },
    temperature: 16,
  };

  beforeEach(() => {
    renderResult = render(<Weather {...props} />);
  });

  it('should render day', () => {
    const { getByText } = renderResult;

    expect(getByText(props.day)).toBeInTheDocument();
  });

  it('should render temperature', () => {
    const { getByText } = renderResult;
    expect(getByText(props.temperature.toString())).toBeInTheDocument();
  });

  it('should render weather image', () => {
    const { getByAltText } = renderResult;
    expect(getByAltText(props.weather.description)).toBeInTheDocument();
    expect(getByAltText(props.weather.description).getAttribute('src')).toBe(
      `http://openweathermap.org/img/wn/${props.weather.icon}@2x.png`
    );
  });
});
