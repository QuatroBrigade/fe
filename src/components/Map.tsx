import { Button } from "@mantine/core";
import { LatLng, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

const pointSmall = "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon-2x.png";
const pointBig = "/Map_pin_icon.png"

// handle icon
const iconBig = icon({
  iconUrl: pointBig,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const iconSmall = icon({
  iconUrl: pointSmall,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

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
  const [showMarkers, setShowMarkers] = useState(true);
  const [poiData, setPoiData] = useState([])
  const [filterList, setFilterList] = useState([])
  const [currentFilter, setCurrentFilter] = useState("");
  const [currentFilteredData, setCurrentFilteredData] = useState([])

  // handle click
  const handleData = async (data: LatLng) => {
    console.log(data);
    setPosition(data);

    await fetch("https://api-1.townsy.tech/api/poi?x=" + data.lng + "&y=" + data.lat, { method: "POST" })
      .then((res) => res.json())
      .then((dataPoi) => setPoiData(dataPoi));

    await fetch("https://api-1.townsy.tech/api/poi/filterlist", { method: "GET" })
      .then((res) => res.json())
      .then((dataFilter) => {
        setFilterList(dataFilter);
        setCurrentFilter(dataFilter[Math.ceil(Math.random() * 3)].filter_type);
      });

  };

  useEffect(() => {
    setCurrentFilteredData(poiData.filter((data: any) => {
      return data.filter_type === currentFilter
    }));
  }, [currentFilter])

  return (
    <>
      <><Button.Group className="gap-2 flex-wrap mb-4 mt-4 justify-center">
        {filterList &&
          filterList.map((component: any, index) => {
            return (<Button key={index} variant={currentFilter === component.filter_type ? "filled" : "default"} onClick={() => setCurrentFilter(component.filter_type)}>{component.filter_type}</Button>)
          })}
      </Button.Group>
      </>
      <>
        <MapContainer center={geoData} zoom={14} style={{ height: "70vh" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyComponent handler={handleData} />
          {position && (
            <Marker position={position} icon={iconBig}>
              <Popup>You clicked here</Popup>
            </Marker>
          )}
          {showMarkers &&
            currentFilteredData.map((component: any, index) => {
              return (
                <Marker key={index} position={{ lat: component.lon, lng: component.lat }} icon={iconSmall}></Marker>
              )
            })}
        </MapContainer>
      </>
    </>
  );
}
