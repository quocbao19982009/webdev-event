import React, { useState, useEffect } from "react";
import Image from "next/image";
import Map, { Marker } from "react-map-gl";
import Geocode from "react-geocode";
import "mapbox-gl/dist/mapbox-gl.css";

interface EventMapProps {
  eventAddress: string;
}

const EventMap = ({ eventAddress }: EventMapProps) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewport, setViewport] = useState({
    latitude: 61.4978,
    longitude: 23.761,
    zoom: 12,
  });

  console.log(eventAddress);
  console.log(viewport);

  Geocode.setApiKey(process.env.GOOGLE_MAP_API_KEY!);

  useEffect(() => {
    Geocode.fromAddress(eventAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat),
          setLng(lng),
          setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  if (loading) return <h5>Loading Map...</h5>;

  return (
    <Map
      {...viewport}
      onMove={(e) => setViewport(e.viewState)}
      mapboxAccessToken={process.env.MAPBOX_API_TOKEN}
      initialViewState={viewport}
      style={{ width: "100%", height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker key={Math.random()} latitude={lat!} longitude={lng!}>
        <Image src="/images/pin.svg" width={30} height={30}></Image>
      </Marker>
    </Map>
  );
};

export default EventMap;
