import { client } from "@/infra/http/client";
import { WeatherResponseDto } from "./dtos/weather-response-dto";

// TODO: add zod
type InputType = {
  city: string;
};

export async function getUserWeatherByCity({ city }: InputType) {
  const params = new URLSearchParams();
  params.append("q", city);
  params.append("appid", process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY!);
  const { data } = await client.get<WeatherResponseDto>(
    `/find?${params.toString()}`
  );

  if (!data.list.length) {
    throw new Error(`Sem dados diponíveis para ${city}`);
  }

  return data.list[0];
}
