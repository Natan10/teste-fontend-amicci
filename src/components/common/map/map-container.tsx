import { ReactNode } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "next/navigation";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function LocationMarker() {
  const map = useMap();
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const city = searchParams.get("city");

  if (!lat && !lng && !city) return null;

  const position = { lat: Number(lat!), lng: Number(lng!) };
  map.flyTo(position, map.getZoom());
  return (
    <Marker position={position}>
      <Popup>{city}</Popup>
    </Marker>
  );
}

export default function Map({ children }: { children: ReactNode }) {
  return (
    <div>
      <MapContainer
        style={{
          width: "100%",
          height: "100vh",
        }}
        zoomControl={false}
        center={[-15.7797, -47.9297]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
