import { apiRoutesClient } from "@/infra/http/api-routes";

async function getUserCoordinates() {
  if (!navigator.geolocation) {
    throw new Error("O Browser não possui suporte para geolocalização");
  } else {
    return new Promise((res, rej) => {
      return navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const data = await getUserCityByCoordinates(latitude, longitude);
          return res(data);
        },
        (err) => {
          rej();
          throw err;
        }
      );
    });
  }
}

type UserCityByCoordinatesData = {
  city: string;
  lat: number;
  lng: number;
};

async function getUserCityByCoordinates(
  lat: number,
  lng: number
): Promise<UserCityByCoordinatesData> {
  try {
    const { data } = await apiRoutesClient.get(
      `/user-location?lat=${lat}&lng=${lng}`
    );
    return {
      city: data.city,
      lat: lat,
      lng: lng,
    };
  } catch (err) {
    throw err;
  }
}

export { getUserCoordinates };
