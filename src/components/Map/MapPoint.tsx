import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

type PropsType = { location: { lat: number; lng: number } };

import { icon } from "leaflet";

let markerIcon = icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const _MapPoint = ({ location }: PropsType) => {
  return <Marker position={location} icon={markerIcon}></Marker>;
};

export default function MapPoint(props: PropsType) {
  return (
    <div className="overflow-hidden relative rounded pr-8">
      <MapContainer
        center={props.location}
        zoom={14}
        style={{ height: "25rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <_MapPoint {...props} />
      </MapContainer>
    </div>
  );
}
