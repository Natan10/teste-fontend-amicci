'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Navbar } from "@/app/components/navbar";
import { useWeatherInformationByCity } from "@/app/hooks/useWeatherInformationByCity";
import { WeatherCard } from "@/app/components/weather-card";
import { Load } from "@/app/components/load";
import { getUserCoordinates } from "@/services/get-user-coordinates";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [city, setCity] = useState<string | null>(null);
  const [load, setLoad] = useState(false);
  
  const searchCity = searchParams.get('city');
  
  const {data, isLoading, isError, error} = useWeatherInformationByCity({
    city: searchCity,
    setCity
  });
  
  async function handleUserCoordinates() {
    setLoad(true);
    try{
      const userCity = await getUserCoordinates();
      router.replace(`${pathname}?city=${userCity}`);
    }catch(err) {
      toast.error('Erro ao trazer localização do usuário');
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    (async() => {
      if(!searchCity) {
        await handleUserCoordinates();
      }
    })();
  }, [])

  useEffect(() => {
    if(isError){
      const dataError = error as any;
      toast.error(dataError.message);
    }
  }, [error, isError])

  return (
    <main className="bg-bgPrincipal h-screen">
      <header className="bg-transparent border-b shadow-md">
        <Navbar
          city={city}
          setCity={setCity}
          isLoading={isLoading}
          getUserLocation={handleUserCoordinates}
        />
      </header>
      <section>
        {(isLoading || load) && <Load />}
        {data && <WeatherCard data={data} />}
      </section>
    </main>
  );
}
