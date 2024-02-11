import { apiRoutesClient } from "@/infra/http/api-routes";

async function getUserCoordinates() {
  if (!navigator.geolocation) {
    throw new Error("O Browser não possui suporte para geolocalização");
  } else {
    return new Promise((res, _) => {
      return navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const city = await getUserCityByCoordinates(latitude, longitude);
          return res(city);
        },
        (err) => {
          throw err;
        }
      );
    });
  }
}

async function getUserCityByCoordinates(lat: number, lng: number) {
  try {
    const { data } = await apiRoutesClient.get(
      `/user-location?lat=${lat}&lng=${lng}`
    );
    return data.city;
  } catch (err) {
    throw err;
  }
}

export { getUserCoordinates };
