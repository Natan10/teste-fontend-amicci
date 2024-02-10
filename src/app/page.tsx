'use client';

import { useState } from "react";
import { toast } from "sonner";

import { AnimationCloud } from "@/app/components/animation-cloud";
import { Navbar } from "@/app/components/navbar";
import { getUserWeatherByCity } from "@/services/get-user-weather-by-city";
import { WeatherInfo } from "@/domain/weather";
import { WeatherCard } from "@/app/components/weather-card";

export default function Principal() {
  const [city, setCity] = useState<string | null>(null);
  const [info, setInfo] = useState<WeatherInfo & {city: string} | null>(null);


  async function handleWeather() {
    if(!city) return;
    try{
      const data = await getUserWeatherByCity({city});
      setInfo({
        ...data,
        city: city
      });
    }catch(err: any) {
      toast.error(err.message);
    }
  }

  return (
    <main className="bg-bgPrincipal h-screen">
      <header className="bg-transparent border-b shadow-md">
        <Navbar
          city={city}
          setCity={setCity}
          search={handleWeather}
        />
      </header>

      <section>
        {info && <WeatherCard data={info} />}
      </section>
    </main>
  );
}
