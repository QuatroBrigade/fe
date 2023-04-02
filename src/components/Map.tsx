import "leaflet/dist/leaflet.css";
import {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {LatLng} from "leaflet";

const latData = [
    {lat: 48.733832662193734, lng: 21.26137733459473},
    {lat: 48.71973471841844, lng: 21.24283790588379},
    {lat: 48.72749190745973, lng: 21.256828308105472},
    {lat: 48.72635954568596, lng: 21.26189231872559},
    {lat: 48.72868085987995, lng: 21.250047683715824}];

const pointSmall = 'https://unpkg.com/leaflet@1.0.3/dist/images/layers-2x.png'
const pointBig = 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon-2x.png'

export function ChangeView({coords}: { coords: any }) {
    const map = useMap();
    map.setView(coords, 14);
    return null;
}

export function MyComponent({handler}: {handler: (latlon: LatLng) => void}) {

    const map = useMapEvents({
        click: (event) => {
            //map.locate()
            handler(event.latlng)
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })


    //console.log(map.getBounds());
    return null;
}

export default function Map() {
    const [geoData, setGeoData] = useState({lat: 48.727035, lng: 21.254345});
    const [position, setPosition] = useState<LatLng | null>(null);
    const [showMarkers, setShowMarkers] = useState(true);


    // handle icon
    const iconBig = L.icon({
        iconUrl: pointBig,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const iconSmall = L.icon({
        iconUrl: pointSmall,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    // handle click
    const handleData = (data:LatLng) => {
        console.log(data)
        setPosition(data);
    }

    return (
        <MapContainer center={geoData} zoom={14} style={{height: '100vh'}}>
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent handler={handleData} />
            {position &&
                <Marker position={position}
                        icon={iconBig}
                >
                    <Popup>You clicked here</Popup>
                </Marker>
            }
            {showMarkers &&
                latData.map((component, index) => (
                    <Marker key={index} position={component}
                            icon={iconSmall}
                    ></Marker>))
            }

        </MapContainer>
    )
}
