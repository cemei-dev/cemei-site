"use client";
import { useCallback, useState } from "react";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { CityEntity } from "@/common/entities/city";
import { useGetAllCities } from "@/hooks/queries/useGetAllCities";

const containerStyle = {
  width: "100%",
  height: "464px",
  borderRadius: "18px"
};

const center = {
  lat: -8.0476,
  lng: -34.877
};

export default function GoogleMaps() {
  const { data: cities } = useGetAllCities();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onLoad}
      >
        {cities?.map((city: CityEntity, index: number) => (
          <Marker
            key={`city-${index}`}
            position={{
              lat: Number(city.lat),
              lng: Number(city.lng)
            }}
            onClick={() =>
              window.open(
                `https://www.google.com/maps?q=${city.lat},${city.lng}`,
                "_blank"
              )
            }
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
