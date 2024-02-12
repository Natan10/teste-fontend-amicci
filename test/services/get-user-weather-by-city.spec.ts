import axios from "axios";
import { getUserWeatherByCity } from "@/services/get-user-weather-by-city";

jest.mock("axios", () => {
  return {
    ...jest.requireActual("axios"),
    get: jest.fn(),
  };
});
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getUserWeatherByCity", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be able to return data with valid city", async () => {
    mockedAxios.get.mockResolvedValueOnce(validResponseMock);
    const city = "Fortaleza";
    const response = await getUserWeatherByCity({ city });
    expect(response).toEqual(expect.objectContaining(validResponseMock));
  });

  it("should be able to throw error if city is not valid or doest not have data", async () => {
    mockedAxios.get.mockResolvedValueOnce([]);

    await expect(getUserWeatherByCity({ city: "mock-city" })).rejects.toThrow(
      new Error("Sem dados diponíveis para mock-city")
    );
  });
});

const validResponseMock = {
  id: 6320062,
  name: "Fortaleza",
  coord: {
    lat: -3.7227,
    lon: -38.5247,
  },
  main: {
    temp: 303.98,
    feels_like: 310.98,
    temp_min: 303.75,
    temp_max: 304.38,
    pressure: 1011,
    humidity: 83,
  },
  dt: 1707747495,
  wind: {
    speed: 9.26,
    deg: 110,
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
};
