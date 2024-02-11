import { getUserWeatherByCity } from "@/services/get-user-weather-by-city";
import { useQuery } from "react-query";

type Props = {
  city: string | null;
  setCity: (data: string | null) => void;
};

export function useWeatherInformationByCity({ city, setCity }: Props) {
  return useQuery({
    queryKey: ["user-weather-information", city],
    queryFn: async () => {
      if (!city) return;
      const response = await getUserWeatherByCity({
        city: city.toLocaleLowerCase(),
      });
      return {
        ...response,
        city,
      };
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 3,
    cacheTime: 60 * 5,
    enabled: !!city,
    onSuccess() {
      setCity(null);
    },
  });
}
