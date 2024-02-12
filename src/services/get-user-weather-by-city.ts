import { openWeatherClient } from "@/infra/http/open-weather";
import { WeatherResponseDto } from "./dtos/weather-response-dto";

type InputType = {
  city: string;
};

export async function getUserWeatherByCity({ city }: InputType) {
  const params = new URLSearchParams();
  params.append("q", city);
  params.append("appid", process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY!);
  const response = await openWeatherClient.get<WeatherResponseDto>(
    `/find?${params.toString()}`
  );

  const { data } = response;
  if (!data.list.length) {
    throw new Error(`Sem dados diponíveis para ${city}`);
  }

  return data.list[0];
}
