import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { getUserWeatherByCity } from "@/services/get-user-weather-by-city";

type Props = {
  city: string | null;
  setCity: (data: string | null) => void;
};

export function useWeatherInformationByCity({ city, setCity }: Props) {
  const router = useRouter();

  return useQuery({
    queryKey: ["user-weather-information", city],
    queryFn: async () => {
      if (!city) return;
      const response = await getUserWeatherByCity({
        city: city.toLocaleLowerCase(),
      });

      return {
        ...response,
      };
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 3,
    cacheTime: 60 * 5,
    enabled: !!city,
    onSuccess(data) {
      router.replace(
        `?city=${data?.name}&lat=${data?.coord.lat}&lng=${data?.coord.lon}`
      );
      setCity(null);
    },
  });
}
