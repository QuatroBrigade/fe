import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

export function ChangeView({ coords }: { coords: any }) {
  const map = useMap();
  map.setView(coords, 14);
  return null;
}

export function MyComponent({
  handler,
}: {
  handler: (latlon: LatLng) => void;
}) {
  const map = useMapEvents({
    click: (event) => {
      //map.locate()
      handler(event.latlng);
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });

  //console.log(map.getBounds());
  return null;
}

export default function Map() {
  const [geoData, setGeoData] = useState({ lat: 48.727035, lng: 21.254345 });
  const [position, setPosition] = useState<LatLng | null>(null);

  const point = "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png";

  const icon = L.icon({
    iconUrl: point,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const handleData = (data: LatLng) => {
    console.log(data);
    setPosition(data);
  };

  return (
    <MapContainer center={geoData} zoom={14} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyComponent handler={handleData} />
      {position && (
        <Marker position={position} icon={icon}>
          <Popup>You clicked here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
