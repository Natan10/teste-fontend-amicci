import { WeatherCard } from "@/components/common/weather-card";
import { render, screen } from "@testing-library/react";

const cardMock = {
  id: 6320062,
  name: "Fortaleza",
  coord: {
    lat: -3.7227,
    lon: -38.5247,
  },
  main: {
    temp: 303.2,
    feels_like: 310.2,
    temp_min: 303.19,
    temp_max: 303.27,
    pressure: 1011,
    humidity: 83,
  },
  dt: 1707743884,
  wind: {
    speed: 6.17,
    deg: 140,
  },
  sys: {
    country: "BR",
  },
  rain: null,
  snow: null,
  clouds: {
    all: 75,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d",
    },
  ],
  city: "Fortaleza",
};

const descriptionsMapper = {
  "broken clouds": "nuvens quebradas",
};

describe("Weather Card", () => {
  it("should be able to render card with valid data", () => {
    // arrange
    const { getByTestId } = render(<WeatherCard data={cardMock} />);

    // act
    const city = getByTestId("city");
    const humidity = getByTestId("humidity");
    const description = getByTestId("description");

    // assert
    expect(city.textContent).toEqual("Fortaleza");
    expect(humidity.textContent).toEqual("83");
    expect(description.textContent).toEqual("nuvens quebradas");
  });

  it("should be able to show other description if card description does not exist", () => {
    const mock = {
      ...cardMock,
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "mocked",
          icon: "04d",
        },
      ],
    };

    const { getByTestId } = render(<WeatherCard data={mock} />);

    const description = getByTestId("description");

    expect(description.textContent).toEqual("Descrição indisponível");
  });
});
