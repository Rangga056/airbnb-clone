"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountry";
import { icon } from "leaflet";

const markerIcon = icon({
  iconUrl:
    "https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
  iconSize: [50, 50],
});

const Map = ({ locationValue }: { locationValue: string }) => {
  const { getCountryByValue } = useCountries();
  const latLang = getCountryByValue(locationValue)?.latlang;
  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={latLang ?? [-5, 120]}
      zoom={5}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latLang ?? [-6.2, 106.8]} icon={markerIcon} />
    </MapContainer>
  );
};

export default Map;
