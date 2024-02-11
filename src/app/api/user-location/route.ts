import { NextRequest, NextResponse } from "next/server";

function getUrlGoogleMaps({
  lat,
  lng,
  apiKey,
}: {
  lat: string;
  lng: string;
  apiKey: string;
}) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  return url;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (!lat || !lng) {
      return new Response("Erro ao pesquisar localização", { status: 400 });
    }

    const url = getUrlGoogleMaps({
      lat,
      lng,
      apiKey: process.env.GOOGLE_MAPS_API_KEY!,
    });

    const city = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const city = data.results[1].address_components.find((component: any) =>
          component.types.includes("administrative_area_level_2")
        ).long_name;
        return city;
      });

    return NextResponse.json({ city });
  } catch (err) {
    console.error(err);
    return new Response("Erro ao pesquisar localização", { status: 400 });
  }
}
