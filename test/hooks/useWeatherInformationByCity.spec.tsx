import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/navigation";
import { getUserWeatherByCity } from "@/services/get-user-weather-by-city";
import { renderHook } from "@testing-library/react-hooks";
import { useWeatherInformationByCity } from "@/hooks/useWeatherInformationByCity";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: any }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(() => ({
      replace: jest.fn(),
    })),
  };
});

jest.mock("../../src/services/get-user-weather-by-city", () => {
  return {
    getUserWeatherByCity: jest.fn(),
  };
});

describe("useWeatherInformationByCity", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});

  it("should be able to get user weather information", async () => {
    (getUserWeatherByCity as jest.Mock).mockResolvedValueOnce(
      validResponseMock
    );

    const { result, waitFor } = renderHook(
      () =>
        useWeatherInformationByCity({
          city: "Fortaleza",
          setCity: jest.fn(),
        }),
      { wrapper }
    );
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(
      expect.objectContaining(validResponseMock)
    );
  });

  it("should be able to return error if search throw error", async () => {
    (getUserWeatherByCity as jest.Mock).mockImplementationOnce(() => {
      throw new Error(`Sem dados diponíveis para Fortaleza`);
    });

    const { result, waitFor } = renderHook(
      () =>
        useWeatherInformationByCity({
          city: "mock",
          setCity: jest.fn(),
        }),
      { wrapper }
    );
    await waitFor(() => !result.current.isLoading);
    const error = result.current.error as any;

    expect(result.current.isSuccess).toBeFalsy();
    expect(error.message).toEqual("Sem dados diponíveis para Fortaleza");
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
