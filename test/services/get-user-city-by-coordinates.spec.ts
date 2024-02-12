import { apiRoutesClient } from "@/infra/http/api-routes";
import { getUserCityByCoordinates } from "@/services/get-user-coordinates";

describe("getUserCityByCoordinates", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it("should be able to return city", async () => {
    const mockResponse = {
      city: "Fortaleza",
      lat: -3.332,
      lng: -3.303,
    };
    jest
      .spyOn(apiRoutesClient, "get")
      .mockResolvedValueOnce({ data: { city: mockResponse.city } });

    const response = await getUserCityByCoordinates(-3.332, -3.303);

    expect(response).toEqual(expect.objectContaining(mockResponse));
  });

  it("should be able to throw error if lat and lng is invalid", async () => {
    jest.spyOn(apiRoutesClient, "get").mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(getUserCityByCoordinates(-3.332, -3.303)).rejects.toThrow(
      new Error("Erro ao trazer o nome da cidade")
    );
  });
});
