import axios from "axios";

export const openWeatherClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OPEN_WEATHER_URL,
});
