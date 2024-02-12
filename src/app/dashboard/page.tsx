"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

import { Navbar } from "@/components/common/navbar";
import { useWeatherInformationByCity } from "@/app/hooks/useWeatherInformationByCity";
import { WeatherCard } from "@/components/common/weather-card";
import { Load } from "@/components/common/load";
import { getUserCoordinates } from "@/services/get-user-coordinates";

const Map = dynamic(() => import("@/components/common/map/map-container"), {
  ssr: false,
});

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [city, setCity] = useState<string | null>(null);
  const [load, setLoad] = useState(false);

  const searchCity = searchParams.get("city");

  const { data, isLoading, isError, error } = useWeatherInformationByCity({
    city: searchCity,
    setCity,
  });

  async function handleUserCoordinates() {
    setLoad(true);
    try {
      const data = (await getUserCoordinates()) as any;
      router.replace(
        `${pathname}?city=${data.city}&lat=${data.lat}&lng=${data.lng}`
      );
    } catch (err) {
      toast.error("Erro ao trazer localização do usuário");
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    if (isError) {
      const dataError = error as any;
      toast.error(dataError.message);
    }
  }, [error, isError]);

  useEffect(() => {
    (async () => {
      if (!searchCity) {
        await handleUserCoordinates();
      }
    })();
  }, []);

  return (
    <main className="bg-bgPrincipal">
      <header className="bg-transparent border-b shadow-md">
        <Navbar
          city={city}
          setCity={setCity}
          isLoading={false}
          getUserLocation={handleUserCoordinates}
        />
      </header>
      <section>
        {(isLoading || load) && <Load />}
        <Map>{data && <WeatherCard data={data} />}</Map>
      </section>
    </main>
  );
}
