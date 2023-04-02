import { LatLng } from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

type PropsType = {};

const _MapPoint = ({}: PropsType) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    click: (event) => {
      setPosition(event.latlng);
    },
  });

  return (
    <>
      {position && (
        <Marker position={position}>
          <Popup>You clicked here</Popup>
        </Marker>
      )}
    </>
  );
};

export default function MapPoint() {
  return (
    <MapContainer
      center={{ lat: 48.720484, lng: 21.257623 }}
      zoom={14}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <_MapPoint /> */}
    </MapContainer>
  );
}
